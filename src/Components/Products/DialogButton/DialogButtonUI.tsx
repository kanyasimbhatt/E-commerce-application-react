import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

type DialogButtonProps = {
  share: boolean;
  saveClipboard: boolean;
  handleSaveToClipboard: () => void;
};

const DialogButton = ({
  share,
  saveClipboard,
  handleSaveToClipboard,
}: DialogButtonProps) => {
  return (
    <IconButton onClick={handleSaveToClipboard} disabled={!share}>
      {saveClipboard ? (
        <CheckCircleRoundedIcon color="success" />
      ) : (
        <ContentCopyIcon />
      )}
    </IconButton>
  );
};

export default DialogButton;
