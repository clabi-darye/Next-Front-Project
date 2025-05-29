const DB_NAME = process.env.NEXT_PUBLIC_DATABASE_NAME || "Clabi";
const STORE_NAME = "Chat";

export const saveChatGroupToIndexedDB = async ({
  id,
  title,
}: {
  id: number;
  title: string;
}) => {
  const openRequest = indexedDB.open(DB_NAME, 1);

  return new Promise<void>((resolve, reject) => {
    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    openRequest.onerror = () => {
      reject(openRequest.error);
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);

      store.put({ id, title });

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
  });
};
export const getChatGroupByTitle = async (title: string): Promise<boolean> => {
  const dbs = await indexedDB.databases?.();
  const exists = dbs?.some((db) => db.name === DB_NAME);

  if (!exists) return false;

  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(DB_NAME, 1);

    openRequest.onerror = () => reject(openRequest.error);

    openRequest.onsuccess = () => {
      const db = openRequest.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        resolve(false);
        return;
      }

      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const allRequest = store.getAll();

      allRequest.onsuccess = () => {
        const exists = allRequest.result.some((item) => item.title === title);
        resolve(exists);
      };

      allRequest.onerror = () => reject(allRequest.error);
    };
  });
};
