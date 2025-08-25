import React from "react";
import backgroundImage from "../assets/background.png";
import Group1 from "../assets/Group 1.svg";
import Group2 from "../assets/Group 2.svg";
import Group3 from "../assets/Group 3.svg";
import Group4 from "../assets/Group 4.svg";

interface BackgroundLayoutProps {
  children: React.ReactNode;
}

export const BackgroundLayout: React.FC<BackgroundLayoutProps> = ({
  children,
}) => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          zIndex: -1,
        }}
      />

      {/* Animated Star Groups */}
      {/* Top Left - Group 1 */}
      <div
        className="fixed top-[-10%] left-[-5%] animate-pulse z-50"
        style={{
          animation:
            "float 6s ease-in-out infinite, twinkle 3s ease-in-out infinite alternate",
        }}
      >
        <img
          src={Group1}
          alt="Stars"
          className="w-full h-full object-contain opacity-80"
        />
      </div>

      {/* Top Right - Group 2 */}
      <div
        className="fixed top-[-5%] right-[0%] animate-pulse z-50"
        style={{
          animation:
            "float 8s ease-in-out infinite reverse, twinkle 4s ease-in-out infinite alternate",
        }}
      >
        <img
          src={Group2}
          alt="Stars"
          className="w-full h-full object-contain opacity-80"
        />
      </div>

      {/* Bottom Left - Group 3 */}
      <div
        className="fixed bottom-[-10%] left-[-5%] animate-pulse z-50"
        style={{
          animation:
            "float 7s ease-in-out infinite, twinkle 5s ease-in-out infinite alternate",
        }}
      >
        <img
          src={Group3}
          alt="Stars"
          className="w-full h-full object-contain opacity-80"
        />
      </div>

      {/* Bottom Right - Group 4 */}
      <div
        className="fixed bottom-[-5%] right-[0%] animate-pulse z-50"
        style={{
          animation:
            "float 9s ease-in-out infinite reverse, twinkle 2s ease-in-out infinite alternate",
        }}
      >
        <img
          src={Group4}
          alt="Stars"
          className="w-full h-full object-contain opacity-80"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
