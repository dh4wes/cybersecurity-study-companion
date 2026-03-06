const DB_NAME = 'cyber-study-db';
const DB_VERSION = 1;
const STORE_NAME = 'kv';

let dbPromise;

export const canUseIdb = () => typeof indexedDB !== 'undefined';

export const openDb = () => {
  if (!canUseIdb()) return Promise.resolve(null);
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }).catch((error) => {
      console.warn('IndexedDB unavailable, falling back to localStorage.', error);
      dbPromise = Promise.resolve(null);
      return null;
    });
  }
  return dbPromise;
};

const withStore = async (mode, run) => {
  const db = await openDb();
  if (!db) return null;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = run(store);
    transaction.oncomplete = () => resolve(request?.result ?? null);
    transaction.onerror = () => reject(transaction.error || request?.error);
    transaction.onabort = () => reject(transaction.error || request?.error);
  });
};

export const getKV = async (key) => withStore('readonly', (store) => store.get(key));

export const setKV = async (key, value) => {
  await withStore('readwrite', (store) => store.put(value, key));
  return value;
};

export const delKV = async (key) => {
  await withStore('readwrite', (store) => store.delete(key));
};
