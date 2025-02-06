import React, { ReactNode } from "react";
import styles from "./Modal.module.scss";

export interface Props {
  children: ReactNode;
  onClose: VoidFunction;
}

export const Modal: React.FC<Props> = ({ children, onClose }) => {
  return (
    <section className={styles.container}>
      <b onClick={onClose}></b>
      <article>{children}</article>
    </section>
  );
};
