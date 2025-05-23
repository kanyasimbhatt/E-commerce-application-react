import { useEffect, useState } from 'react';
import { getData } from '../../Utils/Store';
import type { User } from '../../Types/UserType';
import { useNavigate } from 'react-router-dom';

const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getData('user-id');
    const userArray = JSON.parse(localStorage.getItem('users-array') as string);

    const userData = userArray.find((user: User) => user.id === userId);
    setIsLoading(false);
    if (userData) {
      navigate('/');
    }
  }, []);

  return [isLoading];
};

export default useCheckAuth;
