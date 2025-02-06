import { Item } from "../../types";
import { ItemList } from "../ItemList/ItemList";
import styles from "./ListItem.module.scss";

interface Props {
  items: Item[];
  onDelete: (id: Item["id"]) => void;
}
export const ListItem: React.FC<Props> = ({ items, onDelete }) => {
  return (
    <ul className={styles.container}>
      {items.map((item) => (
        <ItemList
          key={item.id}
          name={item.text}
          onDelete={() => onDelete(item.id)}
          id={item.id}
        />
      ))}
    </ul>
  );
};
