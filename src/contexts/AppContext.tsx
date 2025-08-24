import React, { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { AppState, User, WheelConfig, SpinResult } from "../types";

// Action types
type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_USER"; payload: User | null }
  | { type: "SET_WHEEL_CONFIG"; payload: WheelConfig | null }
  | { type: "RESET_STATE" };

// Initial state
const initialState: AppState = {
  user: null,
  wheelConfig: null,
  isLoading: false,
  error: null,
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_WHEEL_CONFIG":
      return { ...state, wheelConfig: action.payload };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
};

// Context type
interface AppContextType {
  state: AppState;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: User | null) => void;
  setWheelConfig: (config: WheelConfig | null) => void;
  resetState: () => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue: AppContextType = {
    state,
    setLoading: (loading: boolean) =>
      dispatch({ type: "SET_LOADING", payload: loading }),
    setError: (error: string | null) =>
      dispatch({ type: "SET_ERROR", payload: error }),
    setUser: (user: User | null) =>
      dispatch({ type: "SET_USER", payload: user }),
    setWheelConfig: (config: WheelConfig | null) =>
      dispatch({ type: "SET_WHEEL_CONFIG", payload: config }),
    resetState: () => dispatch({ type: "RESET_STATE" }),
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

// Hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
