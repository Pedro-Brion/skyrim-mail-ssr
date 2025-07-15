import type { Request, Response, NextFunction, RequestHandler } from "express";

const TextColors = {
  Black: 30,
  Red: 31,
  Green: 32,
  Yellow: 33,
  Blue: 34,
  Magenta: 35,
  Cyan: 36,
  White: 37,
} as const;

const BackgroundColors = {
  Black: 40,
  Red: 41,
  Green: 42,
  Yellow: 43,
  Blue: 44,
  Magenta: 45,
  Cyan: 46,
  White: 47,
} as const;

type TextColor = (typeof TextColors)[keyof typeof TextColors];
type BackgroundColor = (typeof BackgroundColors)[keyof typeof BackgroundColors];

export const logger: RequestHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const bg = setBgColorStyle(BackgroundColors.White);
  const tx = setTextColorStyle(TextColors.Magenta);
  console.log(`${bg}${tx}${req.method.toUpperCase()}: ${req.url}`);
  resetConsoleStyles();

  next();
};

function setBgColorStyle(color: BackgroundColor): string {
  return `\x1b[${color}m`;
}
function setTextColorStyle(color: TextColor): string {
  return `\x1b[${color}m`;
}
function resetConsoleStyles() {
  console.log("\x1b[0m");
}
