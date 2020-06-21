import React from "react";

// eslint-disable-next-line
import type { BasePoint, ProjectedPoint, ChildPointRenderer, PropPointRenderer } from "./types";
import { BoundsContext } from "./bounds.context";

type PointSequenceProps<T extends BasePoint> = { data: T[] } & (
  | ChildPointRenderer<ProjectedPoint<T>>
  | PropPointRenderer<ProjectedPoint<T>>
);

export const PointSequence = <DataType extends BasePoint>(
  props: PointSequenceProps<DataType>,
) => {
  const bounds = React.useContext(BoundsContext);

  const points: ProjectedPoint<DataType>[] = props.data.map(datum => ({
    x: bounds.x + datum.x * bounds.width,
    y: bounds.y + bounds.height - datum.y * bounds.height,
    input: datum,
  }));

  const render = "render" in props ? props.render : props.children;
  return <g>{points.map(point => render(point, bounds))}</g>;
};
