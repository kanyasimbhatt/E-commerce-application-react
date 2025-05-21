import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {
  Typography,
  Card,
  Button,
  Stack,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import { type Product } from '../../../../Types/ProductType';

type ChildrenType = {
  products: Product[];
  handleShare: (productId: number) => void;
  showShare: boolean;
  saveClipboard: boolean;
  handleClose: () => void;
  handleClipboard: () => void;
};

const RenderProducts = ({
  products,
  handleShare,
  showShare,
  saveClipboard,
  handleClose,
  handleClipboard,
}: ChildrenType) => {
  const matches1060 = useMediaQuery('(max-width:1060px)');
  const matches880 = useMediaQuery('(max-width:880px)');
  return (
    <>
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
              <Button size="small" onClick={() => handleShare(product.id)}>
                Share
              </Button>
              <Button size="small">Learn More</Button>
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
              onClick={handleClose}
              sx={{ display: 'flex', justifyContent: 'end', width: '40px' }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" gap={3} textAlign={'center'}>
              Copy Link to Clipboard{' '}
              <IconButton onClick={handleClipboard}>
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
    </>
  );
};

export default RenderProducts;
