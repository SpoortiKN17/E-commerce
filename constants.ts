
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Zenith Noise Cancelling Headphones',
    description: 'Ultra-clear audio with hybrid active noise cancellation and 40-hour battery life.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviews: 1240
  },
  {
    id: '2',
    name: 'Minimalist Titanium Watch',
    description: 'Sleek, lightweight titanium frame with a scratch-resistant sapphire crystal face.',
    price: 189.50,
    category: 'Lifestyle',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviews: 850
  },
  {
    id: '3',
    name: 'Organic Cotton Everyday Hoodie',
    description: 'Sustainably sourced, heavyweight organic cotton for maximum comfort and durability.',
    price: 75.00,
    category: 'Apparel',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 2100
  },
  {
    id: '4',
    name: 'Smart Home Hub Display',
    description: 'Control your entire ecosystem from a single 10-inch vibrant touchscreen.',
    price: 149.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviews: 560
  },
  {
    id: '5',
    name: 'Artisan Ceramic Coffee Set',
    description: 'Hand-thrown ceramic mugs and matching pour-over dripper with a speckled matte finish.',
    price: 65.00,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517256011271-10f5f0338f3f?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 320
  },
  {
    id: '6',
    name: 'Pro Wireless Mechanical Keyboard',
    description: 'Low-profile tactile switches with multi-device pairing and RGB backlighting.',
    price: 159.00,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviews: 940
  }
];

export const CATEGORIES: string[] = ['All', 'Electronics', 'Apparel', 'Home', 'Lifestyle'];
