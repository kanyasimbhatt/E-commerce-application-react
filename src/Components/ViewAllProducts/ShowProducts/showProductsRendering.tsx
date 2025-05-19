import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Typography,
  Card,
  Button,
  Stack,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import type { Product } from '../ViewAllProducts';

type ChildrenType = {
  products: Product[];
  showShare: boolean;
  saveClipboard: boolean;
  handleClickOnShare: (productId: number) => void;
  handleClickOnProduct: (productId: string) => void;
  handleClickOnClose: () => void;
  handleSaveToClipboard: () => void;
};

const ShowProductsRendering = ({
  products,
  showShare,
  saveClipboard,
  handleClickOnShare,
  handleClickOnProduct,
  handleClickOnClose,
  handleSaveToClipboard,
}: ChildrenType) => {
  const matches1060 = useMediaQuery('(max-width:1060px)');
  const matches880 = useMediaQuery('(max-width:880px)');

  return (
    <div>
      <Stack
        display={'flex'}
        flexDirection={'row'}
        flexWrap={'wrap'}
        flexGrow={1}
        gap={'50px'}
        justifyContent={'center'}
        marginTop={'100px'}
        marginBottom={'50px'}
      >
        {products.map((product: Product) => (
          <Card
            sx={{ maxWidth: 300, boxShadow: '0 0 10px  #bfbfbf' }}
            key={product.id}
          >
            <CardMedia
              sx={{ height: 340 }}
              image={product.images[0]}
              title={product.title}
            />
            <CardContent sx={{ height: 160 }}>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => handleClickOnShare(product.id)}
              >
                Share
              </Button>
              <Button
                size="small"
                onClick={() => handleClickOnProduct(`${product.id}`)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {showShare && (
        <Stack
          position={'fixed'}
          width={'100%'}
          height={'100vh'}
          top={0}
          paddingLeft={matches1060 ? (matches880 ? '0' : '30vw') : '35vw'}
          paddingTop={matches880 ? '50%' : '20%'}
          zIndex={3}
          sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <Stack
            borderRadius={'7px'}
            gap={3}
            height={'150px'}
            width={matches880 ? '100%' : '400px'}
            padding={matches880 ? '0' : '40px'}
            sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            <IconButton
              onClick={handleClickOnClose}
              sx={{ display: 'flex', justifyContent: 'end', width: '40px' }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" gap={3} textAlign={'center'}>
              Copy Link to Clipboard{' '}
              <IconButton onClick={handleSaveToClipboard}>
                {saveClipboard ? (
                  <CheckCircleRoundedIcon color="success" />
                ) : (
                  <ContentCopyIcon />
                )}
              </IconButton>
            </Typography>
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default ShowProductsRendering;
