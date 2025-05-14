export function getData(key: string) {
  return JSON.parse(localStorage.getItem(key) as string);
}

export function setData<T>(key: string, userData: T) {
  if (typeof userData === 'string') {
    localStorage.setItem(key, JSON.stringify(userData));
    return;
  }
  const userArray = getData(key) || [];
  userArray.push(userData);
  localStorage.setItem(key, JSON.stringify(userArray));
}
