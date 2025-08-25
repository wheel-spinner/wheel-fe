import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  customBackdrop?: string;
  customModalBg?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  closeOnOverlayClick = true,
  showCloseButton = true,
  customBackdrop,
  customModalBg,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm sm:max-w-md",
    md: "max-w-md sm:max-w-lg",
    lg: "max-w-lg sm:max-w-2xl",
    xl: "max-w-xl sm:max-w-4xl",
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none p-2 sm:p-4"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 ${
          customBackdrop || "bg-black bg-opacity-50"
        }`}
      ></div>

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizeClasses[size]} mx-[1.5rem] my-2 mt-[1.5rem] sm:my-6 sm:mt-[5.5rem]`}
        tabIndex={-1}
      >
        <div
          className={`relative flex flex-col w-full ${
            customModalBg || "bg-white"
          } border-0 rounded-lg shadow-lg outline-none focus:outline-none`}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-3 sm:p-5 border-b border-solid border-gray-200 rounded-t">
              {title && (
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-gray-400 hover:text-gray-600 float-right text-3xl leading-none font-semibold outline-none focus:outline-none transition-colors"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <span className="bg-transparent text-gray-400 hover:text-gray-600 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="relative p-3 sm:p-6 flex-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};
