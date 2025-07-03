import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../../Types/UserType';
import { getData, removeData, setData } from '../../../Utils/Store';

export default function Profile() {
  const navigate = useNavigate();
  const userId = getData('user-id');
  const userArray = getData('users-array');
  const userDataIndex = userArray.findIndex((user: User) => user.id === userId);
  const userData = userArray[userDataIndex];

  const handleClickOnDelete = () => {
    userArray.splice(userDataIndex, 1);
    setData('users-array', userArray);
    handleClickOnLogout();
  };

  const handleClickOnLogout = () => {
    removeData('user-id');
    navigate('/');
  };

  return (
    <Box
      sx={{
        maxWidth: '100%',
        minHeight: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: { xs: 'column', md: 'row' },
          padding: '100px',
          gap: '50px',
          maxWidth: 500,
          width: '100%',
          boxShadow: 3,
        }}
      >
        <AccountCircleIcon
          color="primary"
          sx={{ height: '100px', width: '100px' }}
        />

        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: 3,
            flex: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: { xs: 'center', md: 'left' } }}
          >
            {userData?.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 1,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Email: {userData?.email}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              mb: 1,
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Phone Number: +91 {userData?.phoneNumber}
          </Typography>

          <Stack direction={'row'} gap={'20px'} marginTop={'10px'} flex={1}>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickOnLogout}
            >
              LogOut <LogoutIcon />
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickOnDelete}
            >
              Delete <DeleteIcon />
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
