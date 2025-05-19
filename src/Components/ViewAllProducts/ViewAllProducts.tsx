import { lazy, Suspense } from 'react';
import { Typography } from '@mui/material';
import Navbar from '../Navbar/Navbar';
import { useForm } from 'react-hook-form';
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

export type InputObject = {
  products: Array<Product>;
};

export type FilterType = {
  search: string;
  range: RangeType;
  categories: Array<string>;
  sortBy: string;
  sortOrder: string;
  rating: number;
};

const filterInitalValue = {
  search: '',
  range: {
    low: 0,
    high: 3000,
  },
  categories: [],
  sortBy: '',
  sortOrder: 'LowToHigh',
  rating: 0,
};

const filterValueFromUrl = () => {
  const filterValue: FilterType = { ...filterInitalValue };
  const url = new URL(window.location.href);
  for (const [key, value] of url.searchParams.entries()) {
    switch (key) {
      case 'search':
        filterValue.search = JSON.parse(value);
        break;
      case 'range':
        filterValue.range = JSON.parse(value);
        break;
      case 'categories':
        filterValue.categories = JSON.parse(value);
        break;
      case 'sortBy':
        filterValue.sortBy = JSON.parse(value);
        break;
      case 'sortOrder':
        filterValue.sortOrder = JSON.parse(value);
        break;
      case 'rating':
        filterValue.rating = JSON.parse(value);
        break;
    }
  }

  return filterValue;
};

export const ViewAllProductsWrapper = () => {
  return (
    <SidebarProvider>
      <ViewAllProducts />
    </SidebarProvider>
  );
};

const ViewAllProducts = () => {
  const { register, watch, setValue } = useForm<FilterType>({
    defaultValues: filterValueFromUrl(),
  });
  const filter = watch();

  const ShowProducts = lazy(() => import('./ShowProducts/ShowProductsLogic'));

  return (
    <>
      <Navbar />
      <SidebarDrawer register={register} filter={filter} setValue={setValue} />
      <Suspense fallback={<Loading />}>
        <ShowProducts filter={filter} />
      </Suspense>
    </>
  );
};

const Loading = () => {
  return <Typography variant="h3">Loading...</Typography>;
};
