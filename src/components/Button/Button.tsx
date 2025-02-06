import React, { ReactNode } from "react";
import styles from "./Button.module.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  colorSchema: "primary" | "secondary";
}

export const Button: React.FC<Props> = ({
  children,
  colorSchema = "secondary",
  ...props
}) => {
  return (
    <button className={`${styles.container} ${styles[colorSchema]}`} {...props}>
      {children}
    </button>
  );
};
