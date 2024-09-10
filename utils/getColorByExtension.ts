const extColor = {
  pdf: "purple",
  xls: "green",
  doc: "blue",
  txt: "red",
  png: "red",
  zip: "yellow",
  jpg: "green",
  jpeg: "orange",
} as const;

export type Extension = keyof typeof extColor;
export type Color = (typeof extColor)[Extension];

export const getColorByExtension = (ext: string): Color => {
  if (ext in extColor) {
    return extColor[ext as Extension];
  }
  return "purple";
};
