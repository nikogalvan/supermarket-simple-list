import { FormEvent, useEffect, useState } from "react";
import { Item } from "./types";
import api from "./api";
import { Button, ListItem, Modal, ModalFooter } from "./components";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, toggleModal] = useState<boolean>(false);

  //CARGA LOS ITEMS, una sola vez

  const fetchItems = async () => {
    setLoading(true);

    try {
      const items = await api.list();
      setItems(items);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRemoveItem = async (id: Item["id"]) => {
    setLoading(true);

    try {
      const newItems = await api.remove(id);
      setItems(newItems);
    } catch (err) {
      console.error(`Error removing the item with id: ${id}, error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const inputElement = form.elements.namedItem(
      "text"
    ) as HTMLInputElement | null;

    if (!inputElement) return;

    const text = inputElement.value.trim();
    if (!text) {
      setLoading(false);
      return;
    }

    try {
      const newItem = await api.create(text);
      setItems((prevState) => [...prevState, newItem]);
      inputElement.value = "";
      toggleModal(false);
    } catch (err) {
      console.error("Error adding new item, description:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <main>
        <header>
          <h1>Supermarket list</h1>
          <h3>{items.length} item(s)</h3>
        </header>

        <Button colorSchema="primary" onClick={() => toggleModal(true)}>
          Add Item
        </Button>

        <ListItem items={items} onDelete={handleRemoveItem} />

        {isModalVisible && (
          <Modal onClose={() => toggleModal(false)}>
            <form onSubmit={addItem}>
              <h3>Add Item</h3>
              {/* Aquí irían los campos para agregar un item */}
              <input type="text" name="text" />
              <ModalFooter>
                <Button
                  colorSchema="secondary"
                  type="button"
                  onClick={() => toggleModal(false)}
                >
                  Cancel
                </Button>
                <Button colorSchema="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          </Modal>
        )}
      </main>
    </>
  );
}

export default App;
