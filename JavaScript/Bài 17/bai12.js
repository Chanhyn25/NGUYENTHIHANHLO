function saveToLocalStorage(key, value = "") {
  if (!key) {
    alert("Vui lòng đưa đủ thông tin về key của localStorage");
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key, defaultValue = null) {
  if (!key) {
    alert("Vui lòng đưa đủ thông tin về key của localStorage");
    return defaultValue;
  }
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
}

function removeFromLocalStorage(key) {
  if (!key) {
    alert("Vui lòng đưa đủ thông tin về key của localStorage");
    return;
  }
  localStorage.removeItem(key);
  return;
}
