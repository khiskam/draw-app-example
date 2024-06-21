import classNames from "classnames";

import styles from "./Brush.module.scss";
import { BrushProps } from "./types";

export const Brush = ({ type }: BrushProps) => {
  const className = classNames(styles.round, {
    [styles.round_min]: type === "Minimum",
    [styles.round_medium]: type === "Medium",
    [styles.round_max]: type === "Maximum",
  });

  return <div className={className}></div>;
};
