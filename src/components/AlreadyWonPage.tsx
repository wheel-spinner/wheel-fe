import React from "react";
import { Button } from "./ui";
import { type User } from "../types";
import Logo from "../assets/logo.png";
import PrizeSvg from "../assets/prize.svg";
import Star2Svg from "../assets/star2.svg";
import HomeSvg from "../assets/home.svg";

interface AlreadyWonPageProps {
  user: User;
  onRestart: () => void;
}

export const AlreadyWonPage: React.FC<AlreadyWonPageProps> = ({
  user,
  onRestart,
}) => {
  return (
    <div className="min-h-screen overflow-y-auto relative">
      <div className="absolute inset-0 bg-white/50 z-0"></div>
      <div className="container mx-auto px-4 py-4 md:py-8 text-center max-w-4xl w-full relative z-10">
        {/* Logo */}
        <div className="mb-6 md:mb-8">
          <img
            src={Logo}
            alt="Logo"
            className="mx-auto h-20 md:h-24 lg:h-28 w-auto object-contain"
          />
        </div>

        {/* Main Title - copied from HomePage */}
        <div className="mb-6 md:mb-8">
          {/* Wheel Spinner Title with rotated background */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-[#00A1AF]/90 h-12 md:h-16 lg:h-20 w-full transform -rotate-3 rounded-sm filter bg-blend-multiply"></div>
            </div>
            <h1 className="relative text-5xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-sunday-shine text-white mb-4 drop-shadow-lg z-10">
              Wheel Spinner
            </h1>
          </div>

          {/* Welcome Back text */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={Star2Svg} alt="Star" className="w-6 h-6" />
            <p className="text-3xl md:text-4xl lg:text-5xl font-handcaps font-black text-[#543584]">
              Welcome Back, {user.firstName}!
            </p>
            <img src={Star2Svg} alt="Star" className="w-6 h-6" />
          </div>
        </div>

        {/* Status Card */}
        <div className="border-2 border-[#543584] rounded-xl p-6 md:p-8 mb-6 md:mb-8 max-w-2xl mx-auto">
          {user.isWinner ? (
            <>
              {/* Winner Status */}
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full border-2 border-[#00A4C2] mb-4">
                  <img src={PrizeSvg} alt="Prize" className="w-14 h-14" />
                </div>
                <h2 className="text-2xl md:text-3xl font-handcaps text-[#543584] mb-2 flex items-center justify-center gap-3">
                  <img src={Star2Svg} alt="Star" className="w-7 h-7" />
                  <span>You Already Won!</span>
                  <img src={Star2Svg} alt="Star" className="w-7 h-7" />
                </h2>
              </div>

              {/* Prize Display */}
              <div className="border-2 border-[#00A4C2] rounded-xl p-4 md:p-6 mb-6">
                <h3 className="text-lg md:text-xl font-handcaps font-bold text-[#543584] mb-2">
                  Your Amazing Prize:
                </h3>
                <div className="text-xl md:text-2xl font-poppins font-bold text-[#543584] p-3 md:p-4">
                  {user.result?.label === "Face Laser Carbon"
                    ? " 1 Session of Face Laser Carbon"
                    : user.result?.label}
                </div>
              </div>

              {/* Instructions */}
              <div className="border border-[#543584] rounded-xl p-4 md:p-6 mb-6">
                <h4 className="font-handcaps font-bold text-[#543584] mb-3 flex items-center justify-center gap-2">
                  <img src={Star2Svg} alt="Star" className="w-5 h-5" />
                  <span>What's Next?</span>
                </h4>
                <ul className="text-sm text-[#543584] font-poppins space-y-2 text-left">
                  <li className="flex items-start">
                    <span className="text-[#00A4C2] font-bold mr-2">1.</span>
                    <span>
                      Check your email at <strong>{user.email}</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00A4C2] font-bold mr-2">2.</span>
                    <span>
                      Look for prize claim instructions (check spam folder too!)
                    </span>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Non-Winner Status */}
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full border-2 border-[#543584] mb-4">
                  <svg
                    className="h-12 w-12 text-[#543584]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-handcaps text-[#543584] mb-2">
                  Thanks for Playing!
                </h2>
              </div>

              <div className="border border-[#543584] rounded-xl p-4 md:p-6 mb-6">
                <p className="text-[#543584] font-poppins font-semibold mb-2">
                  You've already used your spin!
                </p>
                <p className="text-sm text-[#543584] font-poppins">
                  Better luck next time. Keep an eye out for future
                  opportunities to win prizes!
                </p>
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={onRestart}
          size="lg"
          className="font-bold text-[#543584] border-2 border-[#543584] hover:bg-[#543584]/60 px-6 py-3 flex items-center gap-2 mx-auto font-handcaps"
          variant="ghost"
        >
          <img src={HomeSvg} alt="Home" className="w-5 h-5" />
          <span style={{ color: "#543584" }}>Back to Home</span>
        </Button>
      </div>
    </div>
  );
};
