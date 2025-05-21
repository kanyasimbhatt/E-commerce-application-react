import { useState } from 'react';
import type { Product } from '../../../../../Types/ProductType';
import ProductCard from './ProductCard';

type ChildrenType = {
  product: Product;
};

const ProductCardLogic = ({ product }: ChildrenType) => {
  const [share, setShowShare] = useState(false);
  const [productIdSelected, setProductIdSelected] = useState(0);

  const handleShare = (productId: number) => {
    setProductIdSelected(productId);
    setShowShare((share) => !share);
  };

  return (
    <ProductCard
      product={product}
      share={share}
      setShowShare={setShowShare}
      handleShare={handleShare}
      productIdSelected={productIdSelected}
    />
  );
};

export default ProductCardLogic;
