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

export type InputObject = {
  products: Array<Product>;
};
