import type { User } from '../Components/Types/UserType';

export function getData() {
  return JSON.parse(localStorage.getItem('users-array') as string) || [];
}

export function setData(userData: User) {
  console.log(userData);
  const userArray = getData();
  userArray.push(userData);
  localStorage.setItem('users-array', JSON.stringify(userArray));
}
