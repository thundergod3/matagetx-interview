const useLocalStorage = () => {
  const getFromLocal = (key) => JSON.parse(localStorage.getItem(key) || "null");

  const saveToLocal = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));

  const removeFromLocal = (key) => localStorage.removeItem(key);

  return { getFromLocal, saveToLocal, removeFromLocal };
};

export default useLocalStorage;
