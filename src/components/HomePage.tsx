import React from "react";
import { Button } from "./ui";
import Logo from "../assets/logo.png";
import PrizeSvg from "../assets/prize.svg";
import Prize2Svg from "../assets/prize2.svg";
import StarsSvg from "../assets/stars.svg";
import SmileySvg from "../assets/smiley.svg";

interface HomePageProps {
  onStart: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-y-auto py-4 md:py-0 relative">
      <div className="absolute inset-0 bg-white/50 z-0"></div>
      <div className="container mx-auto px-4 py-4 md:py-8 text-center max-w-6xl relative z-10">
        {/* HAMC Logo */}
        <div className="mb-6 md:mb-8">
          <img
            src={Logo}
            alt="Logo"
            className="mx-auto h-20 md:h-24 lg:h-28 w-auto object-contain"
          />
        </div>

        {/* Main Title */}
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

          {/* Spin to Win */}
          <div className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sketch-chalk text-[#543584] mb-4">
            Spin to win
          </div>

          {/* Amazing Prizes with prize icons */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <img
              src={PrizeSvg}
              alt="Prize"
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
            />
            <span className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-handcaps font-black text-[#543584] text-opacity-80">
              amazing prizes
            </span>
            <img
              src={PrizeSvg}
              alt="Prize"
              className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
            />
          </div>

          {/* Description with stroke effect */}
          <div className="relative max-w-2xl mx-auto px-2">
            <p className="relative text-base md:text-lg lg:text-xl font-poppins text-[#543584] font-semibold">
              Get ready for an amazing adventure! Spin our magical wheel for a
              chance to win incredible prizes.
            </p>
          </div>
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
          <div className="bg-transparent rounded-2xl p-4 md:p-6 shadow-xl border-2 border-[#00A4C2]">
            <div className="mb-3 md:mb-4">
              <img
                src={Prize2Svg}
                alt="Prize"
                className="w-8 h-8 md:w-10 md:h-10 mx-auto"
              />
            </div>
            <h3 className="text-lg md:text-xl font-handcaps text-[#543584] font-bold mb-2">
              Amazing Prizes
            </h3>
            <p className="font-poppins text-[#00A4C2] text-sm font-semibold">
              Beauty treatments, discounts, and exclusive offers waiting for
              you!
            </p>
          </div>

          <div className="bg-transparent rounded-2xl p-4 md:p-6 shadow-xl border border-[#543584]">
            <div className="mb-3 md:mb-4">
              <img
                src={StarsSvg}
                alt="Stars"
                className="w-8 h-8 md:w-10 md:h-10 mx-auto"
              />
            </div>
            <h3 className="text-lg md:text-xl font-handcaps text-[#00A4C2] font-bold mb-2">
              Instant Results
            </h3>
            <p className="font-poppins text-[#543584] text-sm font-semibold">
              Find out immediately if you've won - no waiting around!
            </p>
          </div>

          <div className="bg-transparent rounded-2xl p-4 md:p-6 shadow-xl border-2 border-[#00A4C2] sm:col-span-2 md:col-span-1">
            <div className="mb-3 md:mb-4">
              <img
                src={SmileySvg}
                alt="Smiley"
                className="w-8 h-8 md:w-10 md:h-10 mx-auto"
              />
            </div>
            <h3 className="text-lg md:text-xl font-handcaps text-[#543584] font-bold mb-2">
              Fair & Fun
            </h3>
            <p className="font-poppins text-[#00A4C2] text-sm font-semibold">
              Everyone gets an equal chance to win something special!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
