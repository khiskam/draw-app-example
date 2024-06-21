export type ToolProps = {
  active?: boolean;
  icon: JSX.Element;
  disabled?: boolean;
  title: string;
  type?: "button" | "submit";
  onClick?: (e?: React.MouseEvent) => void;
};
