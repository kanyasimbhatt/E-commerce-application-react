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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { getData, setData } from '../../../Utils/Store';
import type { User } from '../../../Types/UserType';
import { useUsers } from '../userProvider';
import useCheckAuth from '../../hooks/useCheckAuth';
import { Loading } from '../../Products/ProductList/ProductListUI';

const schema = z.object({
  id: z.string(),
  name: z
    .string()
    .refine(
      (value) => /^[a-zA-Z]+\s+[a-zA-Z]+$/.test(value ?? ''),
      'Please enter both First Name and Last Name'
    ),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .refine(
      (value) => /^(\d{10})$/.test(value ?? ''),
      'Please Enter a 10 digit number'
    ),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value ?? ''
        ),
      `Enter Proper password having minimum 8 length, at least 1 uppercase, 1 lowercase, 1 special character`
    ),
});

type UserFormField = z.infer<typeof schema>;

const SignUp = () => {
  const isLoading = useCheckAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUserId } = useUsers();

  const handleClickOnShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const defaultValue = {
    id: '',
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<UserFormField>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: defaultValue,
  });

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

  const slotPropsForPhoneNumber = {
    input: {
      startAdornment: <InputAdornment position="start">+91</InputAdornment>,
    },
  };

  const onSubmit: SubmitHandler<UserFormField> = (data) => {
    const userArray = getData('users-array') || [];
    const present = userArray.some((user: User) => user.email === data.email);
    if (present) {
      setError('root', {
        type: 'authentication',
        message: 'Email Id Already Exists',
      });
      return;
    }
    const id = crypto.randomUUID();
    setData<User>('users-array', { ...data, id, favorites: [] });
    setUserId(id);
    setData<string>('user-id', id);
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
              Sign Up
            </Typography>
            <Stack>
              <TextField
                {...register('name')}
                type="text"
                label="Full Name"
                variant="outlined"
                color="primary"
                size="medium"
                required
              ></TextField>
              {errors.name && (
                <Typography color="error">{errors.name.message}</Typography>
              )}
            </Stack>

            <Stack>
              <TextField
                {...register('email')}
                type="email"
                label="Email"
                variant="outlined"
                color="primary"
                size="medium"
                required
              ></TextField>
              {errors.email && (
                <Typography color="error">{errors.email.message}</Typography>
              )}
            </Stack>
            <Stack>
              <TextField
                {...register('phoneNumber')}
                type="text"
                label="Phone Number"
                variant="outlined"
                color="primary"
                slotProps={slotPropsForPhoneNumber}
                size="medium"
                required
              ></TextField>
              {errors.phoneNumber && (
                <Typography color="error">
                  {errors.phoneNumber.message}
                </Typography>
              )}
            </Stack>
            <Stack>
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
              {errors.password && (
                <Typography color="error">{errors.password.message}</Typography>
              )}
            </Stack>

            <Stack>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Sign Up'}
              </Button>
              {errors.root && (
                <Typography color="error">{errors.root.message}</Typography>
              )}
              <Typography variant="subtitle2" color="gray">
                Already a user: <a href="/login">Login</a>
              </Typography>
            </Stack>
          </Stack>
        </form>
      )}
    </>
  );
};

export default SignUp;
