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
  const [hasStartedSpinning, setHasStartedSpinning] = useState(false);

  // Convert WheelSegment[] to react-custom-roulette data format
  const wheelData = segments.map((segment, index) => ({
    option: segment.label,
    style: {
      backgroundColor: WHEEL_COLORS[index % WHEEL_COLORS.length],
      textColor: "#ffffff",
    },
  }));

  useEffect(() => {
    console.log('[WheelComponent] useEffect triggered:', {
      isSpinning,
      mustSpin,
      hasStartedSpinning,
      selectedSegmentIndex,
      segmentsLength: segments.length
    });
    
    // Only start spinning if isSpinning is true and we haven't started yet
    if (isSpinning && !hasStartedSpinning) {
      const targetIndex =
        selectedSegmentIndex ?? Math.floor(Math.random() * segments.length);
      // Set a random starting position to make each spin feel different
      const startPos = Math.floor(Math.random() * segments.length);
      
      console.log('[WheelComponent] Starting spin:', {
        targetIndex,
        startingPosition: startPos,
        prizeNumber: targetIndex
      });
      
      setStartingPosition(startPos);
      setPrizeNumber(targetIndex);
      setMustSpin(true);
      setHasStartedSpinning(true);
    }
    
    // Reset hasStartedSpinning when isSpinning becomes false
    if (!isSpinning && hasStartedSpinning) {
      console.log('[WheelComponent] Resetting hasStartedSpinning');
      setHasStartedSpinning(false);
    }
  }, [isSpinning, selectedSegmentIndex, hasStartedSpinning, segments.length]);

  const handleStopSpinning = () => {
    console.log('[WheelComponent] handleStopSpinning called, wheel animation complete');
    setMustSpin(false);
    // Call onSpinComplete immediately when wheel stops
    onSpinComplete();
  };

  if (segments.length === 0) {
    return (
      <div className="flex items-center justify-center">Loading wheel...</div>
    );
  }

  console.log('[WheelComponent] Rendering wheel with:', {
    mustSpin,
    prizeNumber,
    startingPosition,
    hasStartedSpinning,
    segmentsCount: segments.length
  });

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
