import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { type Product } from '../../../../Types/ProductType';
import { axiosInstance } from '../Services/axiosInterceptor';
import RenderProducts from './RenderProducts';

export default function ProductList() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const { showBoundary } = useErrorBoundary();
  async function setProductsInState() {
    try {
      const data: Product[] = (await axiosInstance.get('/products')).data
        .products;
      setProducts(data);
    } catch (error) {
      console.log(error);
      showBoundary('Issue');
    }
  }

  useEffect(() => {
    setProductsInState();
  }, []);

  return (
    <>
      <RenderProducts products={products} />
    </>
  );
}
