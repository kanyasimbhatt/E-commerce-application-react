import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Navbar from '../Navbar/Navbar';
import { useUsers } from '../Auth/userProvider';
import { getData, setData } from '../../Store/Store';
import type { User } from '../Types/UserType';
import { useFavorite } from '../ViewProduct/FavoritesProvider';
import type { Product } from '../ViewAllProducts/ViewAllProducts';

export default function ViewFavorites() {
  const { userId } = useUsers();
  const { favorites, setFavorites } = useFavorite();

  const handleClickOnRemove = (favoriteId: number) => {
    const userArray = getData();
    const userIndex = userArray.findIndex((user: User) => user.id === userId);
    const userData = userArray[userIndex];
    if (!userData) return;
    userData.favorites = userData.favorites.filter(
      (product: Product) => +product.id !== favoriteId
    );
    userArray[userIndex] = { ...userData };
    setData(userArray);
    setFavorites([...userData.favorites]);
  };
  return (
    <div>
      <Navbar />
      <Stack
        spacing={3}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        marginTop={'100px'}
      >
        {favorites.length === 0 && (
          <Typography variant="h5">No Records Found</Typography>
        )}
        {favorites.map((favorite) => (
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              maxWidth: 1200,
              boxShadow: 3,
            }}
            key={favorite.id}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: 150, md: 200 },
                height: { xs: 150, md: 'auto' },
                objectFit: 'cover',
              }}
              image={favorite.images[0]}
              alt={favorite.title}
            />

            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 3,
                flex: 1,
              }}
            >
              <Typography gutterBottom variant="h5" component="div">
                {favorite.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 1 }}
              >
                {favorite.description}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 1 }}
              >
                Price: ${favorite.price}
              </Typography>

              <Button
                size="small"
                variant="contained"
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                onClick={() => handleClickOnRemove(favorite.id)}
              >
                Remove <RemoveCircleIcon fontSize="small" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </div>
  );
}
