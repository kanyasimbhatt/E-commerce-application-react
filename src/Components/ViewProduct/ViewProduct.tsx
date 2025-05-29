import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Rating, Stack } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import type { Product } from '../ViewAllProducts/ViewAllProducts';
import { Box } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { useFavorite } from './FavoritesProvider';
import { useUsers } from '../Auth/userProvider';
import { getData, setData } from '../../Store/Store';
import type { User } from '../Types/UserType';

export const ViewProduct = () => {
  const { productId } = useParams();
  const { userId } = useUsers();
  const [productData, setProductData] = useState<Product>();
  const navigate = useNavigate();
  const [addFavorite, setAddFavorite] = useState(false);
  const { setFavorites } = useFavorite();
  const getProductDetails = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      if (!response.ok) {
        throw new Error('data was not fetched');
      }

      const data = await response.json();
      setProductData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickOnBack = () => {
    navigate('/');
  };

  const handleClickOnFavorite = () => {
    const userArray = getData();
    const userIndex = userArray.findIndex((user: User) => user.id === userId);
    if (userIndex === -1) return;
    let favoritesArray: Product[] = userArray[userIndex].favorites;
    let present: boolean = false;
    userArray[userIndex].favorites.forEach((favorite: Product) => {
      if (favorite.id === productData!.id) {
        present = true;
        return;
      }
    });
    if (!present) {
      favoritesArray = [...favoritesArray, productData!];
      userArray[userIndex].favorites = [...favoritesArray];
    }

    setData(userArray);
    setFavorites([...favoritesArray]);
    setAddFavorite((fav) => !fav);
    setTimeout(() => {
      setAddFavorite((fav) => !fav);
    }, 3000);
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <Navbar />
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
            flexDirection: { xs: 'column', md: 'row' },
            maxWidth: 900,
            width: '100%',
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: '100%', md: 400 },
              height: { xs: 250, md: 'auto' },
              objectFit: 'cover',
            }}
            image={productData?.images[0]}
            alt={productData?.title}
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
              {productData?.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              {productData?.description}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Price: ${productData?.price}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Category: {productData?.category}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
              Brand: {productData?.brand}
            </Typography>
            <Rating
              name="read-only"
              value={productData?.rating ?? 0}
              precision={0.1}
              readOnly
            />

            <Stack direction={'row'} gap={2} mt={2}>
              <Button
                size="small"
                variant="contained"
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                onClick={handleClickOnBack}
              >
                Go Back <ExitToAppIcon fontSize="small" />
              </Button>
              <Button
                size="small"
                variant="contained"
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                onClick={handleClickOnFavorite}
              >
                Add to Wishlist{' '}
                {addFavorite ? (
                  <CheckCircleRoundedIcon sx={{ color: '#57d446' }} />
                ) : (
                  <FavoriteIcon fontSize="small" />
                )}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
