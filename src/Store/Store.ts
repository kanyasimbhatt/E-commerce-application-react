import type { User } from '../Components/Types/UserType';

export function getData() {
  return JSON.parse(localStorage.getItem('users-array') as string);
}

export function setData(userData: User) {
  const userArray = getData() || [];
  userArray.push(userData);
  localStorage.setItem('users-array', userArray);
}
