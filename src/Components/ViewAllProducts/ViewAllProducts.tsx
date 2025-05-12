import { useEffect, useState } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Typography, Card, Button, Stack } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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

  const handleClickOnProduct = (productId: string) =>
    navigate(`/product/${productId}`);

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
              <Button size="small">Share</Button>
              <Button
                size="small"
                onClick={() => handleClickOnProduct(`${product.id}`)}
              >
                Learn More
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  );
}
