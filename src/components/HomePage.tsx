import React from "react";
import { Button } from "./ui";
import HAMCLogo from "../assets/HAMC.png";

interface HomePageProps {
  onStart: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-secondary-50 flex items-center justify-center overflow-y-auto py-4 md:py-0">
      <div className="container mx-auto px-4 py-4 md:py-8 text-center max-w-6xl">
        {/* HAMC Logo */}
        <div className="mb-6 md:mb-8">
          <img 
            src={HAMCLogo} 
            alt="Houston American Medical Center" 
            className="mx-auto h-20 md:h-24 lg:h-28 w-auto object-contain"
          />
        </div>

        {/* Main Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-sunday-shine text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 mb-4 drop-shadow-lg">
            Wheel Spinner
          </h1>

          <div className="text-xl sm:text-2xl md:text-3xl font-sketch-chalk text-gray-700 mb-2">
            🎪 Spin to Win Amazing Prizes! 🎪
          </div>

          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto font-medium px-2">
            Get ready for an exciting adventure! Spin our magical wheel for a
            chance to win incredible prizes.
          </p>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="px-8 md:px-12 py-3 md:py-4 text-xl md:text-2xl mb-6 md:mb-4 font-handcaps shadow-2xl w-full sm:w-auto"
          variant="primary"
        >
          Start Your Adventure!
        </Button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-8 md:mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-primary-100">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">🎁</div>
            <h3 className="text-lg md:text-xl font-handcaps text-primary-700 mb-2">
              Amazing Prizes
            </h3>
            <p className="text-gray-600 text-sm">
              Beauty treatments, discounts, and exclusive offers waiting for
              you!
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-secondary-100">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">⚡</div>
            <h3 className="text-lg md:text-xl font-handcaps text-secondary-700 mb-2">
              Instant Results
            </h3>
            <p className="text-gray-600 text-sm">
              Find out immediately if you've won - no waiting around!
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-xl border border-amber-100 sm:col-span-2 md:col-span-1">
            <div className="text-3xl md:text-4xl mb-3 md:mb-4">🎯</div>
            <h3 className="text-lg md:text-xl font-handcaps text-amber-700 mb-2">
              Fair & Fun
            </h3>
            <p className="text-gray-600 text-sm">
              Everyone gets an equal chance to win something special!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
