import type { User } from '../Components/Types/UserType';

export function getData() {
  return JSON.parse(localStorage.getItem('users-array') as string) || [];
}

export function setData(userData: User | User[]) {
  let userArray: User[];
  if ('id' in userData) {
    userArray = getData();
    userArray.push(userData);
  } else {
    userArray = [...userData];
  }

  localStorage.setItem('users-array', JSON.stringify(userArray));
}
