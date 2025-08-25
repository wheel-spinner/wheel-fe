import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { type WheelSegment } from "../../types";
import WheelIcon from "../../assets/wheel-icon.svg";
import SpinnerIcon from "../../assets/spinner.svg";

interface WheelComponentProps {
  segments: WheelSegment[];
  isSpinning: boolean;
  onSpinComplete: () => void;
  selectedSegmentIndex?: number;
  onClick?: () => void;
}

export const WheelComponent: React.FC<WheelComponentProps> = ({
  segments,
  isSpinning,
  onSpinComplete,
  selectedSegmentIndex,
  onClick,
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [startingPosition, setStartingPosition] = useState(0);
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);

  const purpleColors = [
    "#543584",
    "#6B46A3",
    "#8B5CF6",
    "#A855F7",
    "#C084FC",
    "#ffffff",
  ];

  const wheelData = segments.map((segment, index) => {
    const bgColor = purpleColors[index % purpleColors.length];
    const textColor = bgColor === "#ffffff" ? "#543584" : "#ffffff";
    if (segment.label === "2mL Fillers For Cheeks") {
      return {
        option: segment.label,
        style: {
          backgroundColor: bgColor,
          textColor: textColor,
          fontFamily: "Sketch Chalk",
          fontSize: 12,
          fontWeight: "500",
        },
      };
    }

    return {
      option: segment.label,
      style: {
        backgroundColor: bgColor,
        textColor: textColor,
        fontFamily: "Sketch Chalk",
        fontWeight: "500",
      },
    };
  });

  useEffect(() => {
    if (isSpinning && !hasStartedSpinning) {
      const targetIndex =
        selectedSegmentIndex ?? Math.floor(Math.random() * segments.length);
      const startPos = Math.floor(Math.random() * segments.length);

      setStartingPosition(startPos);
      setPrizeNumber(targetIndex);
      setMustSpin(true);
      setHasStartedSpinning(true);
    }

    if (!isSpinning && hasStartedSpinning) {
      setHasStartedSpinning(false);
    }
  }, [isSpinning, selectedSegmentIndex, hasStartedSpinning, segments.length]);

  const handleStopSpinning = () => {
    setMustSpin(false);
    onSpinComplete();
  };

  if (segments.length === 0) {
    return (
      <div className="flex items-center justify-center">Loading wheel...</div>
    );
  }

  return (
    <div className="flex items-center justify-center relative">
      <div className="relative">
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={wheelData}
          outerBorderColor={"#543584"}
          outerBorderWidth={8}
          innerBorderColor={"#ffffff"}
          innerBorderWidth={4}
          innerRadius={0}
          radiusLineColor={"#ffffff"}
          radiusLineWidth={3}
          textColors={wheelData.map((item) => item.style.textColor)}
          fontSize={16}
          spinDuration={1}
          onStopSpinning={handleStopSpinning}
          startingOptionIndex={startingPosition}
          disableInitialAnimation={true}
          perpendicularText={false}
          pointerProps={{
            src: SpinnerIcon,
            style: {
              transform: "rotate(60deg)",
              width: "60px",
              height: "60px",
              right: "5px",
              top: "20px",
            },
          }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 top-[-30px] left-[10px]"
          onClick={onClick}
        >
          <img src={WheelIcon} alt="Wheel" className="w-20 h-20" />
        </div>
      </div>
    </div>
  );
};
