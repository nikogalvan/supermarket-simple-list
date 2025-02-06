import React, { ReactNode } from "react";
import styles from "./ModalFooter.module.scss";

interface Props {
  children: ReactNode;
}
export const ModalFooter: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
