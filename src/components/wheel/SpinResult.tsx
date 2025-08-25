import React, { useEffect, useState } from "react";
import { type SpinResult as SpinResultType } from "../../types";
import { Button, Modal } from "../ui";
import { isWinningPrize, ANIMATION_CONFIG } from "../../utils";
import Star2Svg from "../../assets/star2.svg";
import PrizeSvg from "../../assets/prize.svg";

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
        title=""
        size="md"
        closeOnOverlayClick={false}
        showCloseButton={false}
        customModalBg="bg-[white] bg-opacity-80 border-2 border-[#543584] rounded-xl backdrop-blur-sm"
      >
        <div className="text-center py-6">
          {isWinner ? (
            <>
              <div className="flex items-center justify-center gap-3 mb-6">
                <img src={Star2Svg} alt="Star" className="w-8 h-8" />
                <h3 className="text-3xl font-handcaps text-[#543584]">
                  Congratulations!
                </h3>
                <img src={Star2Svg} alt="Star" className="w-8 h-8" />
              </div>

              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full border-2 border-[#00A4C2] mb-6">
                <img src={PrizeSvg} alt="Prize" className="w-12 h-12" />
              </div>

              <h3 className="text-2xl font-handcaps font-bold text-[#543584] mb-4">
                You Won!
              </h3>

              <div className="border-2 border-[#00A4C2] rounded-lg p-4 mb-6">
                <p className="text-lg font-poppins font-bold text-[#543584]">
                  {result.label}
                </p>
              </div>

              <p className="text-[#543584] font-poppins font-semibold mb-6">
                Congratulations! You've won an amazing prize. We'll be in touch
                with you shortly via email with instructions on how to claim
                your prize.
              </p>

              <div className="border border-[#543584] rounded-lg p-4 mb-6">
                <p className="text-sm text-[#543584] font-poppins">
                  <strong>Important:</strong> Please check your email (including
                  spam folder) for claim instructions.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-3 mb-6">
                <img src={PrizeSvg} alt="Prize" className="w-6 h-6" />
                <h3 className="text-3xl font-handcaps text-[#543584]">
                  Hard Luck!
                </h3>
                <img src={PrizeSvg} alt="Prize" className="w-6 h-6" />
              </div>

              <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full border-2 border-[#543584] mb-6">
                <svg
                  className="h-10 w-10 text-[#543584]"
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

              <h3 className="text-2xl font-handcaps font-bold text-[#543584] mb-4">
                {result.label}
              </h3>

              <p className="text-[#543584] font-poppins font-semibold mb-6">
                Better luck next time! Thank you for participating in our wheel
                spin.
              </p>

              <div className="border border-[#543584] rounded-lg p-4 mb-6">
                <p className="text-sm text-[#543584] font-poppins">
                  Keep an eye out for future opportunities to spin the wheel and
                  win prizes!
                </p>
              </div>
            </>
          )}

          <Button
            onClick={onClose}
            size="lg"
            className="w-full bg-[#00A4C2] hover:bg-[#00A4C2]/90 border-none font-handcaps font-bold"
          >
            {isWinner ? "Awesome!" : "Close"}
          </Button>
        </div>
      </Modal>
    </>
  );
};
