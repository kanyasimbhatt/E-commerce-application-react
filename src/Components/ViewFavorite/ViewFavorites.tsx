import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Stack } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useFavorite } from '../ViewProduct/FavoritesProvider';
import Navbar from '../Navbar/Navbar';

export default function ViewFavorites() {
  const { favorites } = useFavorite();

  const handleClickOnRemove = () => {
    console.log('sdfsd');
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
        {favorites.map((favorite) => (
          <Card
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              maxWidth: 1000,
              boxShadow: 3,
            }}
            key={favorite.id}
          >
            <CardMedia
              component="img"
              sx={{
                width: { xs: '100%', md: 400 },
                height: { xs: 250, md: 'auto' },
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
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 1 }}
              >
                Category: {favorite.category}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 1 }}
              >
                Brand: {favorite.brand}
              </Typography>
              <Button
                size="small"
                variant="contained"
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                onClick={handleClickOnRemove}
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
