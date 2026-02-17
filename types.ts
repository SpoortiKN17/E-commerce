
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category = 'All' | 'Electronics' | 'Apparel' | 'Home' | 'Lifestyle';

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
