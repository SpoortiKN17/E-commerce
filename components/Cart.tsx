
import React from 'react';
import { CartItem } from '../types';
import { Button } from './Button';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-slate-500">Your cart is empty.</p>
              <Button variant="ghost" className="mt-4" onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900 truncate">{item.name}</h3>
                  <p className="text-sm text-slate-500 mb-2">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-slate-200 rounded-lg">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="px-2 py-1 hover:bg-slate-50 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <span className="px-3 py-1 text-sm font-medium w-8 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="px-2 py-1 hover:bg-slate-50"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-red-500 hover:text-red-600 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-2xl font-bold text-slate-900">${total.toFixed(2)}</span>
            </div>
            <Button fullWidth size="lg">Checkout</Button>
            <p className="text-center text-xs text-slate-400 mt-4 italic">Shipping & taxes calculated at checkout.</p>
          </div>
        )}
      </div>
    </div>
  );
};
