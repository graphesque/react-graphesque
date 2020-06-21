import React from "react";

import { BoundsContext } from "./bounds.context";

export const Plot: React.FC<Partial<{
  x: number;
  y: number;
  width: number;
  height: number;
}>> = ({ children, x = 0, y = 0, width = 0, height = 0 }) => {
  const outerBounds = React.useContext(BoundsContext);

  const bounds = {
    x: outerBounds.x + x,
    y: outerBounds.y + y,
    width: width || outerBounds.width - x,
    height: height || outerBounds.height - y,
  };

  return (
    <BoundsContext.Provider value={bounds}>
      <g>{children}</g>
    </BoundsContext.Provider>
  );
};
