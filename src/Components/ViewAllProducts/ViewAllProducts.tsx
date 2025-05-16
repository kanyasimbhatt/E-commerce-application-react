import { useEffect, useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Typography, Card, Button, Stack, IconButton } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from './SidebarProvider';
import { SidebarDrawer } from './SidebarDrawer';

export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  brand: string;
  rating: number;
};

export type RangeType = {
  low: number;
  high: number;
};

type InputObject = {
  products: Array<Product>;
};

export const ViewAllProductsWrapper = () => {
  return (
    <SidebarProvider>
      <ViewAllProducts />
    </SidebarProvider>
  );
};

const rangeInitialValue = {
  low: 0,
  high: 100,
};

export type FilterType = {
  search: string;
  range: RangeType;
  categories: Array<string>;
  sortBy: string;
  sortOrder: string;
};

const ViewAllProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [filter, setFilter] = useState<FilterType>({
    search: '',
    range: rangeInitialValue,
    categories: [],
    sortBy: '',
    sortOrder: 'LowToHigh',
  });
  const [showShare, setShowShare] = useState(false);
  const [saveClipboard, setSaveClipboard] = useState(false);
  const [productIdSelected, setProductIdSelected] = useState(0);
  const navigate = useNavigate();
  const matches1060 = useMediaQuery('(max-width:1060px)');
  const matches880 = useMediaQuery('(max-width:880px)');

  async function getProducts() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('error while fetching data');
      }
      const data: InputObject = await response.json();
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  }

  const handleClickOnProduct = (productId: string) =>
    navigate(`/product/${productId}`);

  const handleClickOnShare = (productId: number) => {
    setProductIdSelected(productId);
    setShowShare((share) => !share);
  };

  const handleClickOnClose = () => {
    setShowShare((share) => !share);
  };

  const handleSaveToClipboard = async () => {
    await window.navigator.clipboard.writeText(
      `http://localhost:5175/product/${productIdSelected}`
    );
    setSaveClipboard((save) => !save);
    setTimeout(() => setSaveClipboard((save) => !save), 3000);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('search', filter.search);
    url.searchParams.set(
      'range',
      JSON.stringify([filter.range.low, filter.range.high])
    );
    url.searchParams.set('category', JSON.stringify(filter.categories));
    url.searchParams.set('sortBy', filter.sortBy);
    url.searchParams.set('sortOrder', filter.sortOrder);
  }, [filter]);

  return (
    <>
      <Navbar />
      <SidebarDrawer filter={filter} setFilter={setFilter} />
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
    </>
  );
};
