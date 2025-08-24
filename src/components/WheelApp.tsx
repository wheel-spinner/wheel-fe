import React, { useState, useEffect } from "react";
import { WheelComponent, RegistrationForm, SpinResult } from "./wheel";
import { Button, LoadingSpinner, Alert } from "./ui";
import { DisclaimerModal } from "./DisclaimerModal";
import { HomePage } from "./HomePage";
import { AlreadyWonPage } from "./AlreadyWonPage";
import { useWheelConfig, useWheelSpin } from "../hooks";
import { useWheelContext } from "../contexts";
import { type UserRegistration } from "../types";
import { APP_CONFIG, ERROR_MESSAGES } from "../utils/constants";
import { isWinningPrize } from "../utils/helpers";
import HAMCLogo from "../assets/HAMC.png";

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
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [currentPage, setCurrentPage] = useState<
    "home" | "register" | "wheel" | "already-won"
  >("home");
  const [hasSpunInCurrentSession, setHasSpunInCurrentSession] = useState(false);

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
    if (!currentUser || !wheelConfig) return;

    try {
      setIsSpinning(true);
      startSpin();
      clearError();

      const result = await performSpin(currentUser.userId);

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

      finishSpin(result.result);

      // Show result after wheel animation completes
      setTimeout(() => {
        showResult();
        setIsSpinning(false);
      }, APP_CONFIG.SPIN_DURATION);
    } catch (error) {
      console.error("Spin error:", error);
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
    // After seeing result, redirect to already won page
    if (currentUser?.hasSpun) {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (configError || !wheelConfig) {
    return (
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
    );
  }

  // Show disclaimer modal first
  if (showDisclaimer) {
    return (
      <DisclaimerModal
        isOpen={showDisclaimer}
        onAccept={handleDisclaimerAccept}
      />
    );
  }

  // Show home page
  if (currentPage === "home") {
    return <HomePage onStart={handleStartFromHome} />;
  }

  // Show already won page
  if (currentPage === "already-won" && currentUser) {
    return <AlreadyWonPage user={currentUser} onRestart={handleBackToHome} />;
  }

  // Show registration page
  if (currentPage === "register" || showRegistration) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-secondary-50 overflow-y-auto">
        <div className="container mx-auto px-4 py-4 md:py-8">
          {/* HAMC Logo */}
          <div className="text-center mb-4 md:mb-6">
            <img
              src={HAMCLogo}
              alt="Houston American Medical Center"
              className="mx-auto h-16 md:h-20 w-auto object-contain"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-sunday-shine text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 mb-4">
              {APP_CONFIG.APP_NAME}
            </h1>
            <p className="text-lg md:text-xl font-sketch-chalk text-gray-700">
              🎪 Almost there! Just fill out the form below 🎪
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-8 border border-primary-100">
              <h2 className="text-2xl md:text-3xl font-handcaps text-primary-700 mb-6 text-center">
                Fill to Spin! 🎯
              </h2>
              <p className="text-gray-600 mb-6 text-center">
                Fill out the form below to register for your chance to spin the
                wheel and win amazing prizes!
              </p>
              <RegistrationForm
                onSuccess={handleRegistrationSuccess}
                disabled={isSpinning}
              />
            </div>

            <div className="text-center mt-6">
              <Button
                onClick={handleBackToHome}
                variant="outline"
                size="sm"
                className="font-handcaps"
              >
                ← Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show wheel page (currentPage === 'wheel')
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-secondary-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* HAMC Logo */}
        <div className="text-center mb-4 md:mb-6">
          <img
            src={HAMCLogo}
            alt="Houston American Medical Center"
            className="mx-auto h-16 md:h-20 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sunday-shine text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 mb-4">
            {APP_CONFIG.APP_NAME}
          </h1>
          <p className="text-lg md:text-xl font-sketch-chalk text-gray-700 mb-2">
            🎪 Ready to Spin, {currentUser?.firstName}? 🎪
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {/* Wheel Section */}
            <div className="flex flex-col items-center order-1 lg:order-none">
              <div className="mb-4 md:mb-6">
                <div className="w-full max-w-[280px] sm:max-w-[350px] aspect-square">
                  <WheelComponent
                    segments={wheelConfig.segments}
                    isSpinning={isSpinning}
                    onSpinComplete={() => {}}
                    size={350}
                  />
                </div>
              </div>

              {/* Spin Button */}
              {currentUser && !currentUser.hasSpun && (
                <Button
                  onClick={handleSpin}
                  size="lg"
                  disabled={isSpinning}
                  loading={isSpinning}
                  className="px-8 py-4 text-2xl font-handcaps transform hover:scale-105 transition-transform duration-200 shadow-2xl"
                >
                  {isSpinning ? "Spinning..." : "SPIN THE WHEEL!"}
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
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-4 md:p-6 border border-primary-100">
                <h2 className="text-2xl md:text-3xl font-handcaps text-primary-700 mb-4">
                  You're All Set! 🌟
                </h2>

                <div className="space-y-4">
                  <p className="text-gray-700 font-medium">
                    Click the "SPIN THE WHEEL!" button to try your luck and see
                    what amazing prize awaits you!
                  </p>

                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-2xl p-3 md:p-4">
                    <h3 className="font-handcaps text-primary-800 mb-3 text-base md:text-lg">
                      🎯 Quick Reminders:
                    </h3>
                    <ul className="text-sm text-primary-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-primary-500 font-bold mr-2">
                          •
                        </span>
                        <span>This is your one and only spin</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 font-bold mr-2">
                          •
                        </span>
                        <span>Winners get contacted via email</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-500 font-bold mr-2">
                          •
                        </span>
                        <span>Prizes must be claimed within 90 days</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 font-bold mr-2">
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
  );
};
