import { useCallback, useState } from 'react';
import DialogButton from './DialogButton';

type ChildrenType = {
  share: boolean;
  productIdSelected: number;
  setShowShare: React.Dispatch<React.SetStateAction<boolean>>;
};

const DialogButtonLogic = ({
  share,
  productIdSelected,
  setShowShare,
}: ChildrenType) => {
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
    <DialogButton
      share={share}
      saveClipboard={saveClipboard}
      handleSaveToClipboard={handleSaveToClipboard}
    />
  );
};

export default DialogButtonLogic;
