import { useEffect, useState } from 'react';
import { type Product } from '../../../../Types/ProductType';
import { axiosInstance } from '../Services/axiosInterceptor';
import RenderProducts from './RenderProducts';

export default function ProductList() {
  const [products, setProducts] = useState<Array<Product>>([]);

  async function setProductsInState() {
    const data: Product[] =
      (await axiosInstance.get('/products')).data.products || [];
    setProducts(data);
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
