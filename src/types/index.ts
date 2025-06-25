
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  category: string;
  featured: boolean;
}

export interface CartItem {
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  phone?: string;
  address?: string;
  city?: string;
}

export interface Order {
  id: string;
  userId: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
  };
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
  notes?: string;
}
