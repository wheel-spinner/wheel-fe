import React from "react";
import { Button } from "./ui";
import { type User } from "../types";
import HAMCLogo from "../assets/HAMC.png";

interface AlreadyWonPageProps {
  user: User;
  onRestart: () => void;
}

export const AlreadyWonPage: React.FC<AlreadyWonPageProps> = ({
  user,
  onRestart,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-secondary-50 flex items-center justify-center overflow-y-auto py-4 md:py-0">
      <div className="container mx-auto px-4 py-4 md:py-8 text-center max-w-2xl w-full">
        {/* HAMC Logo */}
        <div className="mb-4 md:mb-6">
          <img
            src={HAMCLogo}
            alt="Houston American Medical Center"
            className="mx-auto h-16 md:h-20 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-sunday-shine text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500 mb-4">
            Welcome Back!
          </h1>
          <p className="text-lg md:text-xl font-sketch-chalk text-gray-700 mb-2">
            Hey {user.firstName}! 👋
          </p>
        </div>

        {/* Status Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-2xl border border-primary-100 mb-6 md:mb-8">
          {user.isWinner ? (
            <>
              {/* Winner Status */}
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-12 w-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-handcaps text-green-700 mb-2">
                  🎉 You Already Won! 🎉
                </h2>
              </div>

              {/* Prize Display */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-4 md:p-6 mb-6">
                <h3 className="text-lg md:text-xl font-bold text-green-800 mb-2 font-handcaps">
                  Your Amazing Prize:
                </h3>
                <div className="text-xl md:text-2xl font-sunday-shine text-green-700 bg-white/50 rounded-xl p-3 md:p-4 border border-green-200">
                  {user.result?.label === "Face Laser Carbon"
                    ? " 1 Session of Face Laser Carbon"
                    : user.result?.label}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-r from-blue-50 to-primary-50 border border-blue-200 rounded-2xl p-4 md:p-6 mb-6">
                <h4 className="font-bold text-blue-800 mb-3 flex items-center justify-center">
                  <span className="text-xl mr-2">📧</span>
                  What's Next?
                </h4>
                <ul className="text-sm text-blue-700 space-y-2 text-left">
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">1.</span>
                    <span>
                      Check your email at <strong>{user.email}</strong>
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 font-bold mr-2">2.</span>
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
                <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-amber-100 mb-4">
                  <svg
                    className="h-12 w-12 text-amber-600"
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
                <h2 className="text-2xl md:text-3xl font-handcaps text-amber-700 mb-2">
                  Thanks for Playing!
                </h2>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 md:p-6 mb-6">
                <p className="text-amber-800 font-medium mb-2">
                  You've already used your spin!
                </p>
                <p className="text-sm text-amber-700">
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
          className="px-8 py-3 text-lg font-handcaps"
          variant="outline"
        >
          🏠 Back to Home
        </Button>
      </div>
    </div>
  );
};
