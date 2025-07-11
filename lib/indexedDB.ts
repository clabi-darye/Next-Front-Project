const DB_NAME = process.env.NEXT_PUBLIC_DATABASE_NAME || "Clabi";
const DB_VERSION = 1;
const CHAT_HISTORY_STORE = "ChatHistoryStore";
const SAVED_CHAT_STORE = "SavedChatStore";

interface IndexedDBItem {
  id: number;
  title: string;
  shareCode: string;
}

// ✅ IDBRequest -> Promise 래퍼
const wrapRequest = <T>(request: IDBRequest<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const openDatabase = async (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(CHAT_HISTORY_STORE)) {
        db.createObjectStore(CHAT_HISTORY_STORE, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(SAVED_CHAT_STORE)) {
        db.createObjectStore(SAVED_CHAT_STORE, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const getStore = async (
  storeName: string,
  mode: IDBTransactionMode
): Promise<IDBObjectStore> => {
  const db = await openDatabase();
  const tx = db.transaction(storeName, mode);
  return tx.objectStore(storeName);
};

export const getAllChatGroups = async (): Promise<IndexedDBItem[]> => {
  const store = await getStore(CHAT_HISTORY_STORE, "readonly");
  const request = store.getAll();
  return await wrapRequest(request);
};

export const saveChatGroup = async (item: IndexedDBItem): Promise<void> => {
  const store = await getStore(CHAT_HISTORY_STORE, "readwrite");
  await wrapRequest(store.put(item));
};

export const savedChatGroup = async (item: IndexedDBItem): Promise<void> => {
  const store = await getStore(SAVED_CHAT_STORE, "readwrite");
  await wrapRequest(store.put(item));
};

export const getShareCode = async (id: number): Promise<string | null> => {
  const store = await getStore(CHAT_HISTORY_STORE, "readonly");
  const item = await wrapRequest(store.get(id));
  return item?.shareCode ?? null;
};

export const updateChatGroup = async (item: IndexedDBItem): Promise<void> => {
  await saveChatGroup(item);
};

export const deleteChatGroup = async (id: number): Promise<void> => {
  const store = await getStore(CHAT_HISTORY_STORE, "readwrite");
  await wrapRequest(store.delete(id));
};
