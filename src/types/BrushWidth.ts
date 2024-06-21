import { BrushWidth } from "@/constants";

export type BrushWidthTypes = keyof typeof BrushWidth;
export type BrushWidthSizes = (typeof BrushWidth)[BrushWidthTypes];
