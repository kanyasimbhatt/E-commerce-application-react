import { useCallback, useEffect, useRef, useState } from 'react';
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
import useAddParameter from '../hooks/useAddParameter';
import { useForm } from 'react-hook-form';
import Layout from '../Layout/Layout';
import ShowProducts from './showProducts';

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

export type FilterType = {
  search: string;
  range: RangeType;
  categories: Array<string>;
  sortBy: string;
  sortOrder: string;
  rating: number
};


const filterInitalValue = {
  search: '',
  range: {
    low: 0,
    high: 150,
  },
  categories: [],
  sortBy: '',
  sortOrder: 'LowToHigh',
  rating: 0
}

const filterValueFromUrl = () => {
  let filterValue: FilterType = { ...filterInitalValue };
  let url = new URL(window.location.href);
  for (let [key, value] of url.searchParams.entries()) {
    switch (key) {
      case "search":
        filterValue.search = JSON.parse(value);
        break;
      case "range":
        filterValue.range = JSON.parse(value);
        break;
      case "categories":
        filterValue.categories = JSON.parse(value); 
        break;
      case "sortBy":
        filterValue.sortBy = JSON.parse(value);
        break;
      case "sortOrder":
        filterValue.sortOrder = JSON.parse(value);
        break;
      case "rating":
        filterValue.rating = JSON.parse(value);
        break;
    }
  }

  return filterValue;
}

export const ViewAllProductsWrapper = () => {
  return (
    <SidebarProvider>
      <ViewAllProducts />
    </SidebarProvider>
  );
};

const ViewAllProducts = () => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const { register, watch, setValue } = useForm<FilterType>({
    defaultValues: filterValueFromUrl()
  });
  let filter = watch();
  const render = useRef<number>(0);
  const [showShare, setShowShare] = useState(false);
  const [saveClipboard, setSaveClipboard] = useState(false);
  const [productIdSelected, setProductIdSelected] = useState(0);
  const [url] = useAddParameter<FilterType>(window.location.href, filter);
  const navigate = useNavigate();
  const matches1060 = useMediaQuery('(max-width:1060px)');
  const matches880 = useMediaQuery('(max-width:880px)');

  const getProducts = useCallback(async ()=>{
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
  }, [])
  

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

  const handleSortAscending = (products: Product[]) => {
    if (filter.sortBy === 'price' || filter.sortBy === 'rating')
      return products.sort((a: Product, b: Product) => (a[filter.sortBy as keyof Product] as number) - (b[filter.sortBy as keyof Product] as number));

    return products.sort((a: Product, b: Product) => (a['title'] as string).localeCompare(b['title'] as string))
  }

  const handleSortDescending = (products: Product[]) => {
    if (filter.sortBy === 'price' || filter.sortBy === 'rating')
      return products.sort((a: Product, b: Product) => (b[filter.sortBy as keyof Product] as number) - (a[filter.sortBy as keyof Product] as number));

    return products.sort((a: Product, b: Product) => (b['title'] as string).localeCompare(a['title'] as string))

  }

  const getFilteredProducts = () => {
    let filteredProducts = products;

    filteredProducts = products.filter((product: Product) => {
      const searchedTitle = filter.search
        ? product.title.toLowerCase().includes(filter.search)
        : true;

      const filterByCategory = filter.categories.length !== 0
        ? filter.categories.includes(product.category)
        : true;
      const conditionForPrice = filter.range.low <= filter.range.high && filter.range.low !== 0 && filter.range.high !== 150;
      const filterByPrice = conditionForPrice ? product.price >= filter.range.low && product.price <= filter.range.high : true;
      const filterByRating = filter.rating ? +product.rating.toFixed(1) === filter.rating : true;
      return (
        searchedTitle && filterByCategory && filterByPrice && filterByRating
      );
    });

    if (filter.sortBy === '') return filteredProducts;

    if (filter.sortOrder === 'LowToHigh') {
      filteredProducts = handleSortAscending(filteredProducts);
    }
    else {
      filteredProducts = handleSortDescending(filteredProducts);
    }

    return filteredProducts;
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (render.current > 4) {
      window.history.replaceState({}, "", `${url.pathname}?${url.searchParams.toString()}`);

      return;
    }
    render.current += 1;

  }, [filter]);

  return (
    <Layout showHamburger = {true}>
      <SidebarDrawer register={register} filter={filter} setValue={setValue} />
      <ShowProducts filteredProducts = {getFilteredProducts()}  shareFunction = {handleClickOnShare} productFunction = {handleClickOnProduct}/>

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
    </Layout>
  );
};
