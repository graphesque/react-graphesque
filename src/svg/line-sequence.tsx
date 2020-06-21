import React from "react";

// eslint-disable-next-line
import type { BasePoint, ProjectedPoint, ChildPointRenderer, PropPointRenderer, } from "./types";
import { BoundsContext } from "./bounds.context";
type LineSequenceProps<T extends BasePoint> = { data: T[] } & (
  | ChildPointRenderer<ProjectedPoint<T>>
  | PropPointRenderer<ProjectedPoint<T>>
);

export const LineSequence = <DataType extends BasePoint>(
  props: LineSequenceProps<DataType>,
) => {
  const bounds = React.useContext(BoundsContext);

  const points: ProjectedPoint<DataType>[] = props.data.map(datum => ({
    x: datum.x,
    y: datum.y,
    input: datum,
  }));

  const render = "render" in props ? props.render : props.children;

  return <>{points.map(point => render(point, bounds))}</>;
};
