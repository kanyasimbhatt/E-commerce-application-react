import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import type { Product } from "../ViewAllProducts/ViewAllProducts";
import { Box } from "@mui/material";
import Navbar from "../Navbar/Navbar";

export default function ViewProduct() {
  const { productId } = useParams();
  const [productData, setProductData] = useState<Product>();
  const getProductDetails = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productId}`
      );
      if (!response.ok) {
        throw new Error("data was not fetched");
      }

      const data = await response.json();
      setProductData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="540"
            width="950"
            image={productData?.images[0]}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {productData?.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {productData?.description}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Price: ${productData?.price}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Category: {productData?.category}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
