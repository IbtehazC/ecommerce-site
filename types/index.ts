export interface Size {
  label: string;
  measurement: string;
}

export interface Color {
  name: string;
  hexCode: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  sizes: Size[];
  colors: Color[];
  createdAt: string | null;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CartItem extends Product {
  quantity: number;
}
