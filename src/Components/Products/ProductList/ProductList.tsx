import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { type Product } from '../../../Types/ProductType';
import { axiosInstance } from '../../../Services/axiosInterceptor';
import ProductListUI from './ProductListUI';
import ApplicationLayout from '../../../Layout/Layout';

export default function ProductList() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const { showBoundary } = useErrorBoundary();
  async function setProductsInState() {
    try {
      const response = await axiosInstance.get('/products');
      const data = response.data.products;
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
    <ApplicationLayout>
      <ProductListUI products={products} />
    </ApplicationLayout>
  );
}
