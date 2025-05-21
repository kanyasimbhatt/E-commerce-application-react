import { useEffect, useState } from 'react';
import { type Product } from '../../../../Types/ProductType';
import { getProducts } from '../../../lib/fetchData';
import RenderProducts from './RenderProducts';

export default function ProductList() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [showShare, setShowShare] = useState(false);
  const [saveClipboard, setSaveClipboard] = useState(false);
  const [productIdSelected, setProductIdSelected] = useState(0);

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

  async function setProductsInState() {
    const data = (await getProducts()) || [];
    setProducts(data);
  }

  useEffect(() => {
    setProductsInState();
  }, []);

  return (
    <>
      <RenderProducts
        products={products}
        handleShare={handleClickOnShare}
        showShare={showShare}
        saveClipboard={saveClipboard}
        handleClose={handleClickOnClose}
        handleClipboard={handleSaveToClipboard}
      />
    </>
  );
}
