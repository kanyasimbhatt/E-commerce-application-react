import { useState } from 'react';
import { type Product } from '../../../Types/ProductType';
import ProductCardUI from './ProductCardUI';
import { useNavigate } from 'react-router-dom';

type ProductCardLogicProps = {
  product: Product;
};

const ProductCardLogic = ({ product }: ProductCardLogicProps) => {
  const [share, setShowShare] = useState(false);
  const [productIdSelected, setProductIdSelected] = useState(0);
  const navigate = useNavigate();

  const handleShare = (productId: number) => {
    setProductIdSelected(productId);
    setShowShare((share) => !share);
  };
  const handleClickOnProduct = (productId: string) =>
    navigate(`/product/${productId}`);

  return (
    <ProductCardUI
      product={product}
      share={share}
      setShowShare={setShowShare}
      handleShare={handleShare}
      productIdSelected={productIdSelected}
      handleClickOnProduct={handleClickOnProduct}
    />
  );
};

export default ProductCardLogic;
