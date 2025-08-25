import React from "react";
import { Button, Modal } from "./ui";
import attentionIcon from "../assets/attention.svg";
import playIcon from "../assets/play.svg";
import logo from "../assets/logo.png";

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onAccept,
}) => {
  return (
    <div className="relative">
      {/* Logo - Outside the modal at the top, above dark overlay */}
      {isOpen && (
        <div
          className="fixed top-8 sm:top-6 md:top-8 left-1/2 transform -translate-x-1/2"
          style={{ zIndex: 9999 }}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-24 sm:h-28 md:h-32 w-auto object-contain"
          />
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => {}} // Prevent closing without accepting
        title=""
        size="sm"
        closeOnOverlayClick={false}
        showCloseButton={false}
        customModalBg="bg-[#543584] bg-opacity-50"
      >
        {/* Important Information Header with padding */}
        <div className="py-2 sm:py-3 border-b border-white border-opacity-20 mx-3 sm:mx-6">
          <h2 className="text-white text-lg sm:text-xl md:text-2xl font-semibold text-left">
            Important Information
          </h2>
        </div>

        <div className="text-center py-3 px-3 sm:py-4 sm:px-4">
          {/* Attention Icon - No circular background */}
          <div className="mx-auto flex items-center justify-center mb-3 sm:mb-4">
            <img
              src={attentionIcon}
              alt="Attention"
              className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
            />
          </div>

          {/* Title with backdrop effect */}
          <div className="relative mb-3 sm:mb-4">
            <h3 className="absolute inset-0 text-xl sm:text-2xl md:text-3xl font-bold text-black opacity-30 font-sunday-shine px-1 sm:px-2 transform translate-x-1 translate-y-1">
              Wheel Spinner Rules
            </h3>
            <h3 className="relative text-xl sm:text-2xl md:text-3xl font-bold text-white font-sunday-shine px-1 sm:px-2">
              Wheel Spinner Rules
            </h3>
          </div>

          <div className="text-left bg-white bg-opacity-60 border-2 border-[#00A4C2] rounded-xl p-2 sm:p-3 mb-3 sm:mb-4">
            <h4 className="text-base sm:text-lg font-bold text-[#00A4C2] mb-2 sm:mb-3 font-handcaps">
              Important Rules:
            </h4>
            <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-black">
              <li className="flex items-start">
                <span className="text-[#00A4C2] font-bold mr-2">•</span>
                <span className="font-medium">
                  Each person gets only <strong>ONE SPIN</strong> on the wheel
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00A4C2] font-bold mr-2">•</span>
                <span className="font-medium">
                  You can win a maximum of <strong>ONE PRIZE</strong> per person
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00A4C2] font-bold mr-2">•</span>
                <span className="font-medium">
                  Winners will be contacted via email with prize claim
                  instructions
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#00A4C2] font-bold mr-2">•</span>
                <span className="font-medium">
                  Registration is required to participate
                </span>
              </li>
            </ul>
          </div>

          <Button
            onClick={onAccept}
            size="md"
            className="w-full font-handcaps text-sm sm:text-base md:text-lg py-2 sm:py-3 flex items-center justify-center gap-1 sm:gap-2"
            variant="primary"
          >
            I Understand — Let's Play!
            <img src={playIcon} alt="Play" className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </Modal>
    </div>
  );
};
