import React from "react";

// eslint-disable-next-line
import type { Bounds } from "./types";

export const BoundsContext = React.createContext<Bounds>({
  x: 0,
  y: 0,
  width: 300,
  height: 150,
});
