import React, { useState, useEffect } from "react";
import { Wheel } from "react-custom-roulette";
import { type WheelSegment } from "../../types";
import { WHEEL_COLORS, ANIMATION_CONFIG } from "../../utils/constants";

interface WheelComponentProps {
  segments: WheelSegment[];
  isSpinning: boolean;
  onSpinComplete: () => void;
  selectedSegmentIndex?: number;
  size?: number;
}

export const WheelComponent: React.FC<WheelComponentProps> = ({
  segments,
  isSpinning,
  onSpinComplete,
  selectedSegmentIndex,
  size = 300,
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [startingPosition, setStartingPosition] = useState(0);

  // Convert WheelSegment[] to react-custom-roulette data format
  const wheelData = segments.map((segment, index) => ({
    option: segment.label,
    style: {
      backgroundColor: WHEEL_COLORS[index % WHEEL_COLORS.length],
      textColor: "#ffffff",
    },
  }));

  useEffect(() => {
    if (isSpinning && !mustSpin) {
      const targetIndex =
        selectedSegmentIndex ?? Math.floor(Math.random() * segments.length);
      // Set a random starting position to make each spin feel different
      setStartingPosition(Math.floor(Math.random() * segments.length));
      setPrizeNumber(targetIndex);
      setMustSpin(true);
    }
  }, [isSpinning, selectedSegmentIndex, mustSpin, segments.length]);

  const handleStopSpinning = () => {
    setMustSpin(false);
    setTimeout(() => {
      onSpinComplete();
    }, ANIMATION_CONFIG.RESULT_FADE_IN_DURATION);
  };

  if (segments.length === 0) {
    return (
      <div className="flex items-center justify-center">Loading wheel...</div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={wheelData}
        outerBorderColor={"#ffffff"}
        outerBorderWidth={8}
        innerBorderColor={"#ffffff"}
        innerBorderWidth={2}
        radiusLineColor={"#ffffff"}
        radiusLineWidth={2}
        textColors={["#ffffff"]}
        textDistance={60}
        fontSize={Math.max(12, size / 25)}
        fontWeight={600}
        backgroundColors={WHEEL_COLORS.slice(0, segments.length)}
        onStopSpinning={handleStopSpinning}
        startingOptionIndex={startingPosition}
        disableInitialAnimation={false}
        perpendicularText={false}
      />
    </div>
  );
};
