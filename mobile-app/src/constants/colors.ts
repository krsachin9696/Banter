const __hexToRgba = (hex: string, opacity: number) => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const WHITE = "#ffffff";
const BLACK = "#000000";
const PURPLE = "#a64dff";
const GREEN = "#00cc00";
const ORANGE = "#ff9933";
// const GREY = "#D3D3D3";
const GREY = "#c0c0c0";
const DARK_GREY = "#71797E";
const DOGER_BLUE = "#005A9C"
const SERENITY = "#b3cee9"
const BLUE_GREEN = "#0D98BA"

const PRIMARY = "#37a0ea";
const SECONDARY = "#ffffff";
const DANGER = "#ef4444";
const OPAQUE_PRIMARY = "#e8f4fd";
const OPAQUE_DANGER = "#fde8e8";

const TEXT = {
  primary: "#000000",
  secondary: "#808080",
  danger: DANGER,
};

const BORDER = {
  hairline: __hexToRgba(BLACK, 0.4),
};

const INPUT = {
  text: {
    focus: TEXT.primary,
    blur: TEXT.primary,
    invalid: TEXT.primary,
  },
  border: {
    focus: PRIMARY,
    blur: SECONDARY,
    invalid: DANGER,
  },
  background: {
    focus: OPAQUE_PRIMARY,
    blur: SECONDARY,
    invalid: OPAQUE_DANGER,
  },
};

export default {
  GREY,
  WHITE,
  BLACK,
  PURPLE,
  GREEN,
  ORANGE,
  PRIMARY,
  SECONDARY,
  DANGER,
  TEXT,
  BORDER,
  INPUT,
  DOGER_BLUE,
  SERENITY,
  BLUE_GREEN,
  DARK_GREY,
} as const;