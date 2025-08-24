import React, { useEffect, useState } from "react";
import { type SpinResult as SpinResultType } from "../../types";
import { Button, Modal } from "../ui";
import { isWinningPrize, ANIMATION_CONFIG } from "../../utils";

interface SpinResultProps {
  result: SpinResultType;
  isVisible: boolean;
  onClose: () => void;
}

export const SpinResult: React.FC<SpinResultProps> = ({
  result,
  isVisible,
  onClose,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const isWinner = isWinningPrize(result.key);

  useEffect(() => {
    if (isVisible && isWinner) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, ANIMATION_CONFIG.CONFETTI_DURATION);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isWinner]);

  if (!isVisible) return null;

  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
                }}
              />
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isVisible}
        onClose={onClose}
        title={isWinner ? "Congratulations!" : "Try Again"}
        size="md"
        closeOnOverlayClick={false}
        showCloseButton={false}
      >
        <div className="text-center py-6">
          {isWinner ? (
            <>
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                <svg
                  className="h-10 w-10 text-green-600"
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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                You Won!
              </h3>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-lg font-semibold text-yellow-800">
                  {result.label}
                </p>
              </div>
              <p className="text-gray-600 mb-6">
                Congratulations! You've won an amazing prize. We'll be in touch
                with you shortly via email with instructions on how to claim
                your prize.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>Important:</strong> Please check your email (including
                  spam folder) for claim instructions. Your prize expires in 90
                  days.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-6">
                <svg
                  className="h-10 w-10 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {result.label}
              </h3>
              <p className="text-gray-600 mb-6">
                Better luck next time! Thank you for participating in our wheel spin.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  Keep an eye out for future opportunities to spin the wheel and win prizes!
                </p>
              </div>
            </>
          )}

          <Button
            onClick={onClose}
            size="lg"
            className="w-full"
            variant={isWinner ? "primary" : "secondary"}
          >
            {isWinner ? "Awesome!" : "Close"}
          </Button>
        </div>
      </Modal>
    </>
  );
};
