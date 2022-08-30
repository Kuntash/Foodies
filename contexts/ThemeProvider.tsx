import { View, Text } from 'react-native';
import React, { createContext, useState } from 'react';

export interface ThemeContextInterface {
  colorMode: 'dark' | 'light';
  setColorMode?: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}
export const ThemeContext = createContext<ThemeContextInterface>({
  colorMode: 'dark',
});
const ThemeProvider = ({ children }) => {
  const [colorMode, setColorMode] =
    useState<ThemeContextInterface['colorMode']>('light');

  return (
    <ThemeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
