import React from "react";
import styles from "./ItemList.module.scss";

interface Props {
  name: string;
  id: string;
  onDelete: (id: string) => void; // Asegúrate de recibir la función con el id
}

export const ItemList: React.FC<Props> = ({ name, id, onDelete }) => {
  return (
    <li className={styles.container}>
      {name}
      <button onClick={() => onDelete(id)}>Delete</button>{" "}
    </li>
  );
};
