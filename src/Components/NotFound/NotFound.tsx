import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Stack
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100vh'}
    >
      <Stack
        sx={{ backgroundColor: 'beige', padding: '40px', borderRadius: '10px' }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant="h1" sx={{ fontWeight: 'bold', color: 'gray' }}>
          404 Not Found
        </Typography>
        <Typography variant="h4" sx={{ color: 'gray' }}>
          Go Home: <Link to="/">Home</Link>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NotFound;
