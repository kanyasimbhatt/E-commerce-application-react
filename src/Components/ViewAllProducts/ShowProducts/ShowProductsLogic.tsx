import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FilterType, InputObject, Product } from '../ViewAllProducts';
import useAddParameter from '../../hooks/useAddParameter';
import ShowProductsRendering from './showProductsRendering';
import { LinearProgress } from '@mui/material';

type ChildrenType = {
  filter: FilterType;
};

const ShowProductsLogic = ({ filter }: ChildrenType) => {
  const [showShare, setShowShare] = useState(false);
  const [saveClipboard, setSaveClipboard] = useState(false);
  const [productIdSelected, setProductIdSelected] = useState(0);
  const navigate = useNavigate();
  const render = useRef<number>(0);
  const [url] = useAddParameter<FilterType>(window.location.href, filter);
  const [products, setProducts] = useState<Array<Product>>([]);
  const [isProducts, setIsProducts] = useState<boolean>(false);

  const getProducts = useCallback(async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('error while fetching data');
      }
      const data: InputObject = await response.json();
      setIsProducts(true);

      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  }, []);

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
      return products.sort(
        (a: Product, b: Product) =>
          (a[filter.sortBy as keyof Product] as number) -
          (b[filter.sortBy as keyof Product] as number)
      );

    return products.sort((a: Product, b: Product) =>
      (a['title'] as string).localeCompare(b['title'] as string)
    );
  };

  const handleSortDescending = (products: Product[]) => {
    if (filter.sortBy === 'price' || filter.sortBy === 'rating')
      return products.sort(
        (a: Product, b: Product) =>
          (b[filter.sortBy as keyof Product] as number) -
          (a[filter.sortBy as keyof Product] as number)
      );

    return products.sort((a: Product, b: Product) =>
      (b['title'] as string).localeCompare(a['title'] as string)
    );
  };

  const getFilteredProducts = () => {
    let filteredProducts = products;

    filteredProducts = products.filter((product: Product) => {
      const searchedTitle = filter.search
        ? product.title.toLowerCase().includes(filter.search)
        : true;

      const filterByCategory =
        filter.categories.length !== 0
          ? filter.categories.includes(product.category)
          : true;
      const conditionForPrice = filter.range.low <= filter.range.high;

      const filterByPrice = conditionForPrice
        ? product.price >= filter.range.low &&
          product.price <= filter.range.high
        : true;

      const filterByRating = filter.rating
        ? +product.rating.toFixed(1) === filter.rating
        : true;

      return (
        searchedTitle && filterByCategory && filterByPrice && filterByRating
      );
    });

    if (filter.sortBy === '') return filteredProducts;

    if (filter.sortOrder === 'LowToHigh') {
      filteredProducts = handleSortAscending(filteredProducts);
    } else {
      filteredProducts = handleSortDescending(filteredProducts);
    }

    return filteredProducts;
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (render.current > 4) {
      window.history.replaceState(
        {},
        '',
        `${url.pathname}?${url.searchParams.toString()}`
      );

      return;
    }
    render.current += 1;
  }, [filter]);

  return (
    <>
      {!isProducts ? (
        <LinearProgress />
      ) : (
        <ShowProductsRendering
          products={getFilteredProducts()}
          showShare={showShare}
          saveClipboard={saveClipboard}
          handleClickOnShare={handleClickOnShare}
          handleClickOnProduct={handleClickOnProduct}
          handleClickOnClose={handleClickOnClose}
          handleSaveToClipboard={handleSaveToClipboard}
        />
      )}
    </>
  );
};

export default ShowProductsLogic;
