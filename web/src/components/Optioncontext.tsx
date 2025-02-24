import React, { createContext, useState, ReactNode } from "react";

interface OptionsContextType {
  isPressed: boolean;
  isPressed2: boolean;
  isPressed3: boolean;
  setIsPressed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPressed2: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPressed3: React.Dispatch<React.SetStateAction<boolean>>;
}

export const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export const OptionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isPressed2, setIsPressed2] = useState(false);
  const [isPressed3, setIsPressed3] = useState(false);

  return (
    <OptionsContext.Provider
      value={{ isPressed, isPressed2, isPressed3, setIsPressed, setIsPressed2, setIsPressed3 }}
    >
      {children}
    </OptionsContext.Provider>
  );
};