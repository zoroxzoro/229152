import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ProductCard from "./Pages/ProductCard";
import { Product } from "./Types/Product";

const app: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      company: "Company A",
      category: "Electronics",
      price: 299,
      rating: 4.5,
      discount: 10,
      availability: true,
      imageUrl: "https://example.com/product1.jpg",
    },
    // Add more product objects
  ];

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default app;
