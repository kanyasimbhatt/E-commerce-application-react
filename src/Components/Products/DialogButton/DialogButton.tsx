import { useCallback, useState } from 'react';
import DialogButtonUI from './DialogButtonUI';

type DialogButtonLogicProps = {
  share: boolean;
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
  productIdSelected: number;
};

const DialogButtonLogic = ({
  share,
  productIdSelected,
  setShowShare,
}: DialogButtonLogicProps) => {
  const [saveClipboard, setSaveClipboard] = useState(false);

  const handleSaveToClipboard = useCallback(async () => {
    await window.navigator.clipboard.writeText(
      `http://localhost:5175/product/${productIdSelected}`
    );
    setSaveClipboard((save) => !save);
    setTimeout(() => {
      setShowShare(false);
      setSaveClipboard((save) => !save);
    }, 1000);
  }, [productIdSelected]);

  return (
    <DialogButtonUI
      share={share}
      saveClipboard={saveClipboard}
      handleSaveToClipboard={handleSaveToClipboard}
    />
  );
};

export default DialogButtonLogic;
