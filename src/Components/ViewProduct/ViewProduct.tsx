import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
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
          maxWidth: "100%",
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            maxWidth: 900,
            width: "100%",
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", md: 400 },
              height: { xs: 250, md: "auto" },
              objectFit: "cover",
            }}
            image={productData?.images[0]}
            alt={productData?.title}
          />

          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 3,
              flex: 1,
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {productData?.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              {productData?.description}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              Price: ${productData?.price}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              Category: {productData?.category}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
              Brand: {productData?.brand}
            </Typography>
            <Rating name="read-only" value={productData?.rating ?? 0} precision={0.5} readOnly />
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
