export const getStorageData = (key) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const setStorageData = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

export const removeStorageKey = (key) => {
  try {
    sessionStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};
