export interface Product {
  id: number;
  name: string;
  company: string;
  category: string;
  price: number;
  rating: number;
  discount: number;
  availability: boolean;
  imageUrl: string;
}

export interface FilterOptions {
  category?: string;
  company?: string;
  minRating?: number;
  maxPrice?: number;
  availability?: boolean;
}
