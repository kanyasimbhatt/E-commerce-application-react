import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  Stack,
  IconButton,
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { type User } from '../../../Types/UserType';
import { getData, setData } from '../../../Utils/Store';
import { useUsers } from '../userProvider';
import useCheckAuth from '../../hooks/useCheckAuth';
import { Loading } from '../../Products/ProductList/ProductListUI';

type UserFormField = {
  email: string;
  password: string;
};

const Login = () => {
  const { isLoading } = useCheckAuth();
  const [showPassword, setShowPassword] = useState(false);
  const { setUserId } = useUsers();
  const navigate = useNavigate();

  const handleClickOnShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<UserFormField>();

  const slotPropsForPassword = {
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            aria-label={
              showPassword ? 'hide the password' : 'display the password'
            }
            onClick={handleClickOnShowPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };

  const onSubmit: SubmitHandler<UserFormField> = (data) => {
    const users = getData('users-array') || [];
    const userData = users.find(
      (user: User) =>
        user.email === data.email && user.password === data.password
    );
    if (!userData) {
      setError('root', {
        type: 'authentication',
        message: 'Invalid email or password',
      });
      return;
    }
    setUserId(userData.id);
    setData<string>('user-id', userData.id);
    navigate('/');
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={'column'}
            spacing={3}
            maxWidth={'600px'}
            margin={'auto'}
            marginTop={'80px'}
            padding={'80px'}
            boxShadow={'0px 0px 20px gray'}
            borderRadius={'7px'}
          >
            <Typography variant="h4" textAlign={'center'}>
              Login
            </Typography>

            <TextField
              {...register('email')}
              type="email"
              label="Email"
              variant="outlined"
              color="primary"
              size="medium"
              required
            ></TextField>

            <TextField
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              label="Password"
              slotProps={slotPropsForPassword}
              variant="outlined"
              color="primary"
              size="medium"
              helperText="Do not share your password with anyone"
              required
            ></TextField>
            <Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Login'}
              </Button>
              {errors.root && (
                <Typography color="red">{errors.root.message}</Typography>
              )}
              <Typography variant="subtitle2" color="gray">
                A new User: <a href="/signup">Sign Up</a>
              </Typography>
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
};

export default Login;
