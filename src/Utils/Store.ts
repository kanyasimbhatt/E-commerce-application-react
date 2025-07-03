import type { User } from '../Types/UserType';

export function getData(key: string) {
  try {
    return JSON.parse(localStorage.getItem(key) as string);
  } catch (err) {
    console.log(err);
    return localStorage.getItem(key);
  }
}

export function addData<T extends User>(key: string, userData: T) {
  const userArray = getData(key) || [];
  userArray.push(userData);
  localStorage.setItem(key, JSON.stringify(userArray));
}

export function setData<T extends User[] | string>(key: string, userData: T) {
  if (typeof userData === 'string') {
    localStorage.setItem(key, JSON.stringify(userData));
    return;
  }
  localStorage.setItem(key, JSON.stringify(userData));
}

export function removeData(key: string) {
  localStorage.removeItem(key);
}
