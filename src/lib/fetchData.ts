import { type InputObject } from '../../Types/ProductType';

export async function getProducts() {
  try {
    const response = await fetch('https://dummyjson.com/products');
    if (!response.ok) {
      throw new Error('error while fetching data');
    }
    const data: InputObject = await response.json();
    return data.products;
  } catch (err) {
    console.log(err);
  }
}
