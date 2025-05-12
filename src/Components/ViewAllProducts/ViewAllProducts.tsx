import { useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Typography, Card, Button, Stack, IconButton } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Navbar from "../Navbar/Navbar";

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  images: string[];
};

type InputObject = {
  products: Array<Product>;
};

export default function ViewAllProducts() {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [showShare, setShowShare] = useState(false);
  const [saveClipboard, setSaveClipboard] = useState(false);
  const [productIdSelected, setProductIdSelected] = useState(0);
  async function getProducts() {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("error while fetching data");
      }
      const data: InputObject = await response.json();
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    }
  }

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <Navbar />
      <Stack
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        flexGrow={1}
        gap={"50px"}
        justifyContent={"center"}
        marginTop={"100px"}
        marginBottom={"50px"}
      >
        {products.map((product: Product) => (
          <Card
            sx={{ maxWidth: 300, boxShadow: "0 0 10px  #bfbfbf" }}
            key={product.id}
          >
            <CardMedia
              sx={{ height: 340 }}
              image={product.images[0]}
              title={product.title}
            />
            <CardContent sx={{ height: 160 }}>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                onClick={() => handleClickOnShare(product.id)}
              >
                Share
              </Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {showShare && (
        <Stack
          position={"fixed"}
          width={"100%"}
          height={"100vh"}
          top={0}
          paddingLeft={"35%"}
          paddingTop={"20%"}
          zIndex={3}
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <Stack
            borderRadius={"7px"}
            gap={3}
            height={"150px"}
            width={"400px"}
            padding={"40px"}
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          >
            <IconButton
              onClick={handleClickOnClose}
              sx={{ display: "flex", justifyContent: "end", width: "40px" }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h6" gap={3} textAlign={"center"}>
              Copy Link to Clipboard{" "}
              <IconButton onClick={handleSaveToClipboard}>
                {saveClipboard ? (
                  <CheckCircleRoundedIcon color="success" />
                ) : (
                  <ContentCopyIcon />
                )}
              </IconButton>
            </Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
}
