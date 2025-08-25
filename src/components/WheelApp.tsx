import React, { useState, useEffect } from "react";
import { WheelComponent, RegistrationForm, SpinResult } from "./wheel";
import { Button, LoadingSpinner, Alert } from "./ui";
import { DisclaimerModal } from "./DisclaimerModal";
import { HomePage } from "./HomePage";
import { AlreadyWonPage } from "./AlreadyWonPage";
import { BackgroundLayout } from "./BackgroundLayout";
import { useWheelConfig, useWheelSpin } from "../hooks";
import { useWheelContext } from "../contexts";
import { type UserRegistration } from "../types";
import { ERROR_MESSAGES } from "../utils/constants";
import { isWinningPrize, isIPhone } from "../utils/helpers";
import Logo from "../assets/logo.png";
import PrizeSvg from "../assets/prize.svg";
import HomeSvg from "../assets/home.svg";
import Star2Svg from "../assets/star2.svg";

export const WheelApp: React.FC = () => {
  const {
    wheelConfig,
    loading: configLoading,
    error: configError,
  } = useWheelConfig();
  const {
    wheelState,
    currentUser,
    setCurrentUser,
    startSpin,
    finishSpin,
    showResult,
  } = useWheelContext();
  const { performSpin, error: spinError, clearError } = useWheelSpin();

  const [showRegistration, setShowRegistration] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isFetchingResult, setIsFetchingResult] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [currentPage, setCurrentPage] = useState<
    "home" | "register" | "wheel" | "already-won"
  >("home");
  const [hasSpunInCurrentSession, setHasSpunInCurrentSession] = useState(false);
  const [selectedSegmentIndex, setSelectedSegmentIndex] = useState<
    number | undefined
  >(undefined);
  const [isIPhoneDevice, setIsIPhoneDevice] = useState(false);

  // Detect iPhone device on mount
  useEffect(() => {
    setIsIPhoneDevice(isIPhone());
  }, []);

  // Initialize state based on user data
  useEffect(() => {
    if (!currentUser) {
      setCurrentPage("home");
      setShowRegistration(false);
      setHasSpunInCurrentSession(false);
    } else if (currentUser.hasSpun && !hasSpunInCurrentSession) {
      // User has already spun and this is not their current session - show already won page
      setCurrentPage("already-won");
      setShowRegistration(false);
    } else {
      // User is registered but hasn't spun yet, or just spun in current session - show wheel
      setCurrentPage("wheel");
      setShowRegistration(false);
    }
  }, [currentUser, hasSpunInCurrentSession]);

  const handleRegistrationSuccess = (
    userData: UserRegistration,
    userId: string
  ) => {
    const newUser = {
      userId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      phone: userData.phone,
      hasSpun: false,
      isWinner: false,
    };

    setCurrentUser(newUser);
    setShowRegistration(false);
    setCurrentPage("wheel");
  };

  const handleSpin = async () => {
    console.log("[WheelApp] handleSpin called");
    if (!currentUser || !wheelConfig) {
      console.log("[WheelApp] Missing user or config:", {
        currentUser,
        wheelConfig,
      });
      return;
    }

    try {
      console.log("[WheelApp] Fetching result for user:", currentUser.userId);
      setIsFetchingResult(true);
      clearError();

      // First, get the result from the API
      const result = await performSpin(currentUser.userId);
      console.log("[WheelApp] Spin result received:", result);

      // Find the index of the result in the wheel segments
      const resultIndex = wheelConfig.segments.findIndex(
        (segment) => segment.key === result.result.key
      );
      console.log("[WheelApp] Result segment index:", resultIndex);
      setSelectedSegmentIndex(resultIndex >= 0 ? resultIndex : undefined);

      // Update user data with spin result
      const isWinner = isWinningPrize(result.result.key);
      const updatedUser = {
        ...currentUser,
        hasSpun: true, // Always mark as spun - one spin per person
        isWinner: isWinner,
        result: result.result,
      };
      setCurrentUser(updatedUser);
      setHasSpunInCurrentSession(true); // Mark as spun in current session

      console.log("[WheelApp] Calling finishSpin with result:", result.result);
      finishSpin(result.result);

      // Now that we have the result, start the wheel animation
      setIsFetchingResult(false);
      console.log("[WheelApp] Starting wheel animation");
      setIsSpinning(true);
      startSpin();
      // Result will be shown when wheel animation completes via onSpinComplete callback
    } catch (error) {
      console.error("[WheelApp] Spin error:", error);
      setIsFetchingResult(false);
      setIsSpinning(false);

      // Check if this is the ALREADY_SPUN error and update local storage
      if (
        (error as any)?.errorCode === "ALREADY_SPUN" &&
        (error as any)?.hasSpun === true
      ) {
        const updatedUser = {
          ...currentUser,
          hasSpun: true,
        };
        setCurrentUser(updatedUser);
        setHasSpunInCurrentSession(true); // Mark as spun in current session
      }

      // Error is handled by useWheelSpin hook
    }
  };

  const handleResultClose = () => {
    console.log("[WheelApp] handleResultClose called");
    // After seeing result, redirect to already won page
    if (currentUser?.hasSpun) {
      console.log("[WheelApp] User has spun, redirecting to already-won page");
      setCurrentPage("already-won");
    }
  };

  const handleDisclaimerAccept = () => {
    setShowDisclaimer(false);
  };

  const handleStartFromHome = () => {
    // If user has already spun, go to already won page
    if (currentUser?.hasSpun) {
      setCurrentPage("already-won");
    } else {
      // Otherwise, go to registration
      setCurrentPage("register");
      setShowRegistration(true);
    }
  };

  const handleBackToHome = () => {
    // Don't clear user data - just navigate back to home
    setCurrentPage("home");
    setShowRegistration(false);
  };

  if (configLoading) {
    return (
      <BackgroundLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </div>
      </BackgroundLayout>
    );
  }

  if (configError || !wheelConfig) {
    return (
      <BackgroundLayout>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            <Alert
              type="error"
              title="Configuration Error"
              message={configError || ERROR_MESSAGES.WHEEL_CONFIG_ERROR}
            />
            <Button
              onClick={() => window.location.reload()}
              className="w-full mt-4"
              variant="outline"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </BackgroundLayout>
    );
  }

  // Show disclaimer modal first
  if (showDisclaimer) {
    return (
      <BackgroundLayout>
        <DisclaimerModal
          isOpen={showDisclaimer}
          onAccept={handleDisclaimerAccept}
        />
      </BackgroundLayout>
    );
  }

  // Show home page
  if (currentPage === "home") {
    return (
      <BackgroundLayout>
        <HomePage onStart={handleStartFromHome} />
      </BackgroundLayout>
    );
  }

  // Show already won page
  if (currentPage === "already-won" && currentUser) {
    return (
      <BackgroundLayout>
        <AlreadyWonPage user={currentUser} onRestart={handleBackToHome} />
      </BackgroundLayout>
    );
  }

  // Show registration page
  if (currentPage === "register" || showRegistration) {
    return (
      <BackgroundLayout>
        <div className="min-h-screen overflow-y-auto relative">
          <div className="absolute inset-0 bg-white/50 z-0"></div>
          <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
            {/* Logo */}
            <div className="text-center mb-6 md:mb-8">
              <img
                src={Logo}
                alt="Logo"
                className="mx-auto h-20 md:h-24 lg:h-28 w-auto object-contain"
              />
            </div>

            {/* Main Title - copied from HomePage */}
            <div className="text-center mb-6 md:mb-8">
              {/* Wheel Spinner Title with rotated background */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-[#00A1AF]/90 h-12 md:h-16 lg:h-20 w-full transform -rotate-3 rounded-sm filter bg-blend-multiply"></div>
                </div>
                <h1 className="relative text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-sunday-shine text-white mb-4 drop-shadow-lg z-10">
                  Wheel Spinner
                </h1>
              </div>

              {/* Spin to Win */}
              <div className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sketch-chalk text-[#543584] mb-4">
                Spin to win
              </div>

              {/* Amazing Prizes with prize icons */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <img
                  src={PrizeSvg}
                  alt="Prize"
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                />
                <span className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-handcaps font-black text-[#543584] text-opacity-80">
                  amazing prizes
                </span>
                <img
                  src={PrizeSvg}
                  alt="Prize"
                  className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
                />
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="border-2 border-[#00A4C2] rounded-xl p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-handcaps text-[#543584] mb-6 text-center flex items-center justify-center gap-3">
                  <span>Fill to Spin!</span>
                  <img src={Star2Svg} alt="Star" className="w-6 h-6" />
                </h2>
                <p className="text-[#543584] font-poppins font-bold mb-6 text-center">
                  Fill out the form below to register for your chance to spin
                  the wheel and win amazing prizes!
                </p>
                <RegistrationForm
                  onSuccess={handleRegistrationSuccess}
                  disabled={isSpinning}
                />
              </div>

              <div className="text-center mt-6">
                <Button
                  onClick={handleBackToHome}
                  variant="ghost"
                  size="md"
                  className="font-bold text-[#543584] border-2 border-[#543584] hover:bg-[#543584]/10 px-6 py-3 flex items-center gap-2 mx-auto"
                >
                  <img src={HomeSvg} alt="Home" className="w-5 h-5" />
                  <span className="font-handcaps text-lg">Back to Home</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BackgroundLayout>
    );
  }

  // Show wheel page (currentPage === 'wheel')
  return (
    <BackgroundLayout>
      <div className="min-h-screen overflow-y-auto relative">
        <div className="absolute inset-0 bg-white/50 z-0"></div>
        <div className="container mx-auto px-4 py-4 md:py-8 relative z-10">
          {/* Logo */}
          <div className="text-center mb-6 md:mb-8">
            <img
              src={Logo}
              alt="Logo"
              className="mx-auto h-20 md:h-24 lg:h-28 w-auto object-contain"
            />
          </div>

          {/* Main Title - copied from HomePage */}
          <div className="text-center mb-6 md:mb-8">
            {/* Wheel Spinner Title with rotated background */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#00A1AF]/90 h-12 md:h-16 lg:h-20 w-full transform -rotate-3 rounded-sm filter bg-blend-multiply"></div>
              </div>
              <h1 className="relative text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-sunday-shine text-white mb-4 drop-shadow-lg z-10">
                Wheel Spinner
              </h1>
            </div>

            {/* Spin to Win */}
            <div className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sketch-chalk text-[#543584] mb-4">
              Spin to win
            </div>

            {/* Ready to Spin text */}
            <div className="flex items-center justify-center gap-3">
              <img src={PrizeSvg} alt="Prize" className="w-6 h-6" />
              <p className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-handcaps font-black text-[#543584] text-opacity-80">
                Ready to Spin, {currentUser?.firstName}?
              </p>
              <img src={PrizeSvg} alt="Prize" className="w-6 h-6" />
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
              {/* Wheel Section */}
              <div className="flex flex-col items-center order-1 lg:order-none">
                <div className="mb-4 md:mb-6">
                  <div className="w-full max-w-[450px] sm:max-w-[500px] aspect-square">
                    <WheelComponent
                      segments={wheelConfig.segments}
                      isSpinning={isSpinning}
                      selectedSegmentIndex={selectedSegmentIndex}
                      onSpinComplete={() => {
                        console.log(
                          "[WheelApp] onSpinComplete callback triggered"
                        );
                        console.log("[WheelApp] Current state:", {
                          isSpinning,
                          hasResult: !!wheelState.result,
                          result: wheelState.result,
                          selectedSegmentIndex,
                        });
                        // Wheel animation has completed, show the result
                        if (wheelState.result) {
                          console.log("[WheelApp] Showing result modal");
                          showResult();
                          setIsSpinning(false);
                          setSelectedSegmentIndex(undefined); // Reset for next spin
                        } else {
                          console.log(
                            "[WheelApp] No result available yet, not showing modal"
                          );
                        }
                      }}
                      size={350}
                    />
                  </div>
                </div>

                {/* Spin Button */}
                {currentUser && !currentUser.hasSpun && (
                  <Button
                    onClick={handleSpin}
                    size="lg"
                    disabled={isFetchingResult || isSpinning}
                    loading={isFetchingResult || isSpinning}
                    className={`px-8 py-4 text-2xl font-handcaps transform hover:scale-105 transition-transform duration-200 shadow-2xl ${
                      isIPhoneDevice ? "mt-[50px]" : ""
                    }`}
                  >
                    {isFetchingResult
                      ? "Spinning..."
                      : isSpinning
                      ? "Spinning..."
                      : "SPIN THE WHEEL!"}
                  </Button>
                )}

                {/* Spin Error */}
                {spinError && (
                  <div className="mt-4 w-full max-w-md">
                    <Alert
                      type="error"
                      message={spinError}
                      onClose={clearError}
                    />
                  </div>
                )}
              </div>

              {/* Info Section */}
              <div className="lg:pl-8 order-2 lg:order-none">
                <div className="border-2 border-[#543584] rounded-xl p-4 md:p-6">
                  <h2 className="text-2xl md:text-3xl font-handcaps text-[#543584] mb-4 flex items-center gap-2">
                    <span>You're All Set!</span>
                    <img src={Star2Svg} alt="Star" className="w-6 h-6" />
                  </h2>

                  <div className="space-y-4">
                    <p className="text-[#543584] font-poppins font-semibold">
                      Click the "SPIN THE WHEEL!" button to try your luck and
                      see what amazing prize awaits you!
                    </p>

                    <div className="border border-[#543584] rounded-xl p-3 md:p-4">
                      <h3 className="font-handcaps text-[#543584] mb-3 text-base md:text-lg flex items-center gap-2">
                        <img src={PrizeSvg} alt="Prize" className="w-5 h-5" />
                        <span>Quick Reminders:</span>
                      </h3>
                      <ul className="text-sm text-[#543584] font-poppins space-y-2">
                        <li className="flex items-start">
                          <span className="text-[#00A4C2] font-bold mr-2">
                            •
                          </span>
                          <span>This is your one and only spin</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#00A4C2] font-bold mr-2">
                            •
                          </span>
                          <span>Winners get contacted via email</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#00A4C2] font-bold mr-2">
                            •
                          </span>
                          <span>Prizes must be claimed within 90 days</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-[#00A4C2] font-bold mr-2">
                            ✨
                          </span>
                          <span className="font-medium">Good luck! 🍀</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result Modal */}
          {wheelState.result && (
            <SpinResult
              result={wheelState.result}
              isVisible={wheelState.showResult}
              onClose={handleResultClose}
            />
          )}
        </div>
      </div>
    </BackgroundLayout>
  );
};
