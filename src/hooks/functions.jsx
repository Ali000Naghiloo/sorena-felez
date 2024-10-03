export const getLocal = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  }

  return null;
};

export const setLocal = (key, value) => {
  if (typeof window !== "undefined") {
    return localStorage.setItem(key, value);
  }

  return null;
};

export const removeLocal = (key) => {
  if (typeof window !== "undefined") {
    return localStorage.removeItem(key);
  }

  return null;
};
