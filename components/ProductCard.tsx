
import React from 'react';
import { Product } from '../types';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg text-slate-700 hover:text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-slate-600">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4 h-10">{product.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <Button size="sm" onClick={() => onAddToCart(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};
