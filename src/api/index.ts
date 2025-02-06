import { Item } from "../types";

const STORAGE_KEY = "items";
const DELAY = 300; // Simular la latencia de una API real.

/**
 * Devuelve un array de tipo Item, almacenado en LocalStorage.
 */
const getStoredItems = (): Item[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : []; //Si stored es truthy entonces se retornara el array guardado en stored, sino retorna un array vacio.
};

/**
 * Guarda en localStorage un array de tipo Item
 * @param items
 */
const saveItems = (items: Item[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export default {
  list: (): Promise<Item[]> =>
    new Promise((resolve) =>
      setTimeout(() => resolve(getStoredItems()), DELAY)
    ),

  create: (text: string): Promise<Item> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const newItem: Item = { id: crypto.randomUUID(), text };
        const items = [...getStoredItems(), newItem];
        saveItems(items);
        resolve(newItem);
      }, DELAY);
    }),

  remove: (id: string): Promise<Item[]> =>
    new Promise((resolve) => {
      setTimeout(() => {
        const items = getStoredItems().filter((item) => item.id !== id);
        saveItems(items);
        resolve(items);
      }, DELAY);
    }),
};
