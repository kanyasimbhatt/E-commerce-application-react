export function getData(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) as string);
  } catch (err) {
    console.log(err);
    return localStorage.getItem(key);
  }
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
