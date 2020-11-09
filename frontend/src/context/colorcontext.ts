import { createContext } from "react";

// Create context function used in state management.
export const ColorContext = createContext({
  didRedirect: false,
  playerDidRedirect: () => {},
  playerDidNotRedirect: () => {},
});
