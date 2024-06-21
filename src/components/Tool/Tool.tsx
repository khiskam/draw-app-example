import classNames from "classnames";

import styles from "./Tool.module.scss";
import { ToolProps } from "./types";

export const Tool = ({
  icon,
  active,
  disabled,
  title,
  type = "button",
  onClick,
  ...props
}: ToolProps) => {
  const className = classNames(styles.tool, {
    [styles.tool_active]: active,
  });

  return (
    <button
      {...props}
      className={className}
      disabled={disabled}
      title={title}
      onClick={onClick}
      type={type}
    >
      {icon}
    </button>
  );
};
