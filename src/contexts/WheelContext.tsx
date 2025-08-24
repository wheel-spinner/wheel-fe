import React, { createContext, useContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type { WheelSpinState, SpinResult, User } from "../types";
import { useLocalStorage } from "../hooks";
import { STORAGE_KEYS } from "../utils";

// Action types
type WheelAction =
  | { type: "START_SPIN" }
  | { type: "FINISH_SPIN"; payload: SpinResult }
  | { type: "SHOW_RESULT" }
  | { type: "HIDE_RESULT" }
  | { type: "SET_HAS_SPUN"; payload: boolean }
  | { type: "RESET_WHEEL" };

// Initial state
const initialWheelState: WheelSpinState = {
  isSpinning: false,
  hasSpun: false,
  result: null,
  showResult: false,
};

// Reducer
const wheelReducer = (
  state: WheelSpinState,
  action: WheelAction
): WheelSpinState => {
  switch (action.type) {
    case "START_SPIN":
      return {
        ...state,
        isSpinning: true,
        showResult: false,
      };
    case "FINISH_SPIN":
      return {
        ...state,
        isSpinning: false,
        hasSpun: true,
        result: action.payload,
      };
    case "SHOW_RESULT":
      return {
        ...state,
        showResult: true,
      };
    case "HIDE_RESULT":
      return {
        ...state,
        showResult: false,
      };
    case "SET_HAS_SPUN":
      return {
        ...state,
        hasSpun: action.payload,
      };
    case "RESET_WHEEL":
      return initialWheelState;
    default:
      return state;
  }
};

// Context type
interface WheelContextType {
  wheelState: WheelSpinState;
  currentUser: User | null;
  startSpin: () => void;
  finishSpin: (result: SpinResult) => void;
  showResult: () => void;
  hideResult: () => void;
  setHasSpun: (hasSpun: boolean) => void;
  setCurrentUser: (user: User | null) => void;
  resetWheel: () => void;
}

// Create context
const WheelContext = createContext<WheelContextType | undefined>(undefined);

// Provider component
interface WheelProviderProps {
  children: ReactNode;
}

export const WheelProvider: React.FC<WheelProviderProps> = ({ children }) => {
  const [wheelState, dispatch] = useReducer(wheelReducer, initialWheelState);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(
    STORAGE_KEYS.USER_DATA,
    null
  );

  // Initialize wheel state based on user data
  useEffect(() => {
    if (currentUser?.hasSpun) {
      dispatch({ type: "SET_HAS_SPUN", payload: true });
      if (currentUser.result) {
        dispatch({ type: "FINISH_SPIN", payload: currentUser.result });
      }
    }
  }, [currentUser]);

  const contextValue: WheelContextType = {
    wheelState,
    currentUser,
    startSpin: () => dispatch({ type: "START_SPIN" }),
    finishSpin: (result: SpinResult) =>
      dispatch({ type: "FINISH_SPIN", payload: result }),
    showResult: () => dispatch({ type: "SHOW_RESULT" }),
    hideResult: () => dispatch({ type: "HIDE_RESULT" }),
    setHasSpun: (hasSpun: boolean) =>
      dispatch({ type: "SET_HAS_SPUN", payload: hasSpun }),
    setCurrentUser,
    resetWheel: () => dispatch({ type: "RESET_WHEEL" }),
  };

  return (
    <WheelContext.Provider value={contextValue}>
      {children}
    </WheelContext.Provider>
  );
};

// Hook to use the context
export const useWheelContext = (): WheelContextType => {
  const context = useContext(WheelContext);
  if (context === undefined) {
    throw new Error("useWheelContext must be used within a WheelProvider");
  }
  return context;
};
