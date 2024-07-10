import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@mui/material";
import { Product } from "../Types/Product";

interface Props {
  product: Product;
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
});

const ProductCard: React.FC<Props> = ({ product }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={product.imageUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Company: {product.company}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Category: {product.category}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: ${product.price}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Rating: {product.rating}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Discount: {product.discount}%
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Availability: {product.availability ? "Available" : "Out of stock"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
