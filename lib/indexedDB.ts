const DB_NAME = process.env.NEXT_PUBLIC_DATABASE_NAME || "Clabi";
const STORE_NAME = "Chat";

export const getAllChatGroups = (): Promise<
  Array<{ id: number; title: string; shareCode: string }>
> => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(DB_NAME, 1);

    openRequest.onupgradeneeded = () => {
      const db = openRequest.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    openRequest.onerror = () => reject(openRequest.error);

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);

      const getAllRequest = store.getAll();

      getAllRequest.onerror = () => reject(getAllRequest.error);
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };
    };
  });
};

export const saveChatGroup = async ({
  id,
  title,
  shareCode,
}: {
  id: number;
  title: string;
  shareCode: string;
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

      store.put({ id, title, shareCode });

      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    };
  });
};

export const getShareCode = async (id: number): Promise<string | null> => {
  const dbs = await indexedDB.databases?.();
  const exists = dbs?.some((db) => db.name === DB_NAME);

  if (!exists) return null;

  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(DB_NAME, 1);

    openRequest.onerror = () => reject(openRequest.error);

    openRequest.onsuccess = () => {
      const db = openRequest.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        resolve(null);
        return;
      }

      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const allRequest = store.getAll();

      allRequest.onsuccess = () => {
        const foundItem = allRequest.result.find((item) => item.id === id);

        resolve(foundItem?.shareCode ?? null);
      };

      allRequest.onerror = () => reject(allRequest.error);
    };
  });
};
