import React from "react";
import { Button, Modal } from "./ui";

interface DisclaimerModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onAccept,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}} // Prevent closing without accepting
      title="Important Information"
      size="lg"
      closeOnOverlayClick={false}
      showCloseButton={false}
    >
      <div className="text-center py-4 px-2 sm:py-6 sm:px-4">
        {/* Warning Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-amber-100 mb-4 sm:mb-6">
          <svg
            className="h-8 w-8 sm:h-10 sm:w-10 text-amber-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 font-sunday-shine px-2">
          Wheel Spinner Rules
        </h3>

        <div className="text-left bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6">
          <h4 className="text-lg sm:text-xl font-bold text-primary-700 mb-3 sm:mb-4 font-handcaps">
            📋 Important Rules:
          </h4>
          <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
            <li className="flex items-start">
              <span className="text-primary-500 font-bold mr-2">•</span>
              <span className="font-medium">
                Each person gets only <strong>ONE SPIN</strong> on the wheel
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-500 font-bold mr-2">•</span>
              <span className="font-medium">
                You can win a maximum of <strong>ONE PRIZE</strong> per person
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary-500 font-bold mr-2">•</span>
              <span className="font-medium">
                Winners will be contacted via email with prize claim
                instructions
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-500 font-bold mr-2">•</span>
              <span className="font-medium">
                Registration is required to participate
              </span>
            </li>
          </ul>
        </div>

        <Button
          onClick={onAccept}
          size="lg"
          className="w-full font-handcaps text-lg sm:text-xl py-3 sm:py-4"
          variant="primary"
        >
          I Understand - Let's Play! 🎪
        </Button>
      </div>
    </Modal>
  );
};
