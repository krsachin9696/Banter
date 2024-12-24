import { Dimensions } from "react-native";

const SCREEN_WIDTH: number = Dimensions.get("screen").width;
const SCREEN_HEIGHT: number = Dimensions.get("screen").height;

const TEXT = {
  input: 16,
  heading: 20,
  mainHeading: 28,
  miniHeading: 18,
  basic: 15,
  mini: 12,
};

const SCREEN_CONTAINER_PADDING = 18;
const BORDER_RADIUS = 10;
const CARD_INTERNAL_PADDING = 12;
const SECTION_GAP_VERTICAL = 14;
const SECTION_GAP_HORIZONTAL = 12;
const MESSAGE_CONTAINER_PADDING = 8;


export default {
  TEXT,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  SCREEN_CONTAINER_PADDING,
  BORDER_RADIUS,
  CARD_INTERNAL_PADDING,
  SECTION_GAP_VERTICAL,
  SECTION_GAP_HORIZONTAL,
  MESSAGE_CONTAINER_PADDING
} as const;