import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../Utils/Store';
import type { User } from '../../Types/UserType';

const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const userId = getData('user-id');
    const userArray = getData('users-array') || [];

    const userData = userArray.find((user: User) => user.id === userId);
    if (userData) {
      navigate('/');
    } else {
      setIsLoading(false);
    }
  }, []);

  return { isLoading };
};

export default useCheckAuth;
