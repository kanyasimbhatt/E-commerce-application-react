import { lazy, Suspense } from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { type Product } from '../../../Types/ProductType';

type RenderProductsProps = {
  products: Product[];
};

const ProductCardLogic = lazy(() => import('../productCard/ProductCard'));

const RenderProducts = ({ products }: RenderProductsProps) => {
  return (
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
        <Suspense fallback={<Loading />} key={product.id}>
          <ProductCardLogic product={product} />
        </Suspense>
      ))}
    </Stack>
  );
};

export const Loading = () => {
  return <LinearProgress />;
};

export default RenderProducts;
