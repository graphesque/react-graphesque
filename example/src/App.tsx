import React from "react";

import { Graph, Plot, PointSet } from "react-graphesque";
import { BasePoint, Bounds } from "../../dist/svg/types";

const data = [
  { x: 0.0, y: 0.0 },
  { x: 0.25, y: 0.25 },
  { x: 0.4, y: 1.0 },
  { x: 0.5, y: 0.5 },
  { x: 0.75, y: 0.75 },
  { x: 1.0, y: 0.5 },
];

const bezierFromCatmullRomSpline = (points: { x: number; y: number }[]) => {
  const output = {
    length: points.length - 1,
    control1X: new Float32Array(points.length),
    control1Y: new Float32Array(points.length),
    control2X: new Float32Array(points.length),
    control2Y: new Float32Array(points.length),
    pointX: new Float32Array(points.length),
    pointY: new Float32Array(points.length),
  };
  // shamelessly borrowed from https://advancedweb.hu/plotting-charts-with-svg/
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[Math.max(i - 1, 0)];
    const b = points[i];
    const c = points[i + 1];
    const d = points[Math.min(i + 2, points.length - 1)];

    output.control1X[i] = (-a.x + 6 * b.x + c.x) / 6;
    output.control1Y[i] = (-a.y + 6 * b.y + c.y) / 6;

    output.control2X[i] = (b.x + 6 * c.x - d.x) / 6;
    output.control2Y[i] = (b.y + 6 * c.y - d.y) / 6;

    output.pointX[i] = c.x;
    output.pointY[i] = c.y;
  }
  return output;
};

const generatePath = (input: ReturnType<typeof bezierFromCatmullRomSpline>) => {
  let path = ``;
  for (let i = 0; i < input.length; i += 1) {
    const cx1 = input.control1X[i];
    const cy1 = input.control1Y[i];
    const cx2 = input.control2X[i];
    const cy2 = input.control2Y[i];
    const px = input.pointX[i];
    const py = input.pointY[i];

    path += `C ${cx1}, ${cy1}, ${cx2}, ${cy2}, ${px}, ${py}`;
  }
  return path;
};

const App = () => (
  <Graph>
    <Plot x={50} y={25} width={200} height={100}>
      <PointSet
        data={data}>{(points: BasePoint[], bounds: Bounds) => {
          const data = bezierFromCatmullRomSpline(points);
          const path = `M ${points[0].x} ${points[0].y} ${generatePath(data)}`;
          const closedPath = `${path} L ${points[points.length - 1].x}, ${
            bounds.y + bounds.height
          } L ${points[0].x}, ${bounds.y + bounds.height} Z`;

          return (
            <>
              <path d={closedPath} fill={`hsla(140deg, 40%, 60%, 0.50)`} />
              <path
                d={path}
                stroke={"green"}
                fill={"transparent"}
                strokeWidth={2}
              />
              {Array.from(points).map((_, i) => (
                <circle
                  key={`${i}:${data.pointX[i]}`}
                  cx={data.pointX[i] || bounds.x}
                  cy={data.pointY[i] || bounds.y + bounds.height}
                  r={5}
                  fill="red"
                />
              ))}
            </>
          );
        }}
      </PointSet>
    </Plot>
  </Graph>
);

export default App;
