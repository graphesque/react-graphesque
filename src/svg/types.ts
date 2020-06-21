export type BasePoint = {
  x: number;
  y: number;
  [key: string]: any;
};

export type ProjectedPoint<T extends BasePoint> = {
  x: number;
  y: number;
  input: T;
};

export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ChildPointRenderer<T> = {
  children: (point: T, bounds: Bounds) => React.ReactNode;
};
export type PropPointRenderer<T> = {
  render: (point: T, bounds: Bounds) => React.ReactNode;
};

export type ChildSetRenderer<T> = {
  children: (point: T[], bounds: Bounds) => React.ReactNode;
};
export type PropSetRenderer<T> = {
  render: (point: T[], bounds: Bounds) => React.ReactNode;
};
