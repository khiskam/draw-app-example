import styles from "./Toolbar.module.scss";
import { ToolbarProps } from "./types";

export const Toolbar = ({ children }: ToolbarProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>{children}</div>
    </div>
  );
};
