import { Dimensions } from "@/types";

export type FabricProps = {
  parentRef: React.RefObject<HTMLDivElement>;
  onResize: (dimensions: Dimensions) => void;
};
