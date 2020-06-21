import React from "react";

// eslint-disable-next-line
import type { BasePoint, ProjectedPoint, ChildSetRenderer, PropSetRenderer } from "./types";
import { BoundsContext } from "./bounds.context";

type PointSetProps<T extends BasePoint> = { data: T[] } & (
  | ChildSetRenderer<ProjectedPoint<T>>
  | PropSetRenderer<ProjectedPoint<T>>
);

export const PointSet = <DataType extends BasePoint>(
  props: PointSetProps<DataType>,
) => {
  const bounds = React.useContext(BoundsContext);

  const points: ProjectedPoint<DataType>[] = props.data.map(datum => ({
    x: bounds.x + datum.x * bounds.width,
    y: bounds.y + bounds.height - datum.y * bounds.height,
    input: datum,
  }));

  const render = "render" in props ? props.render : props.children;
  return <g>{render(points, bounds)}</g>;
};
