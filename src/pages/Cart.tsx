
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Votre panier est vide
        </h2>
        <p className="text-gray-600 mb-8">
          Découvrez nos produits et ajoutez-les à votre panier
        </p>
        <Link to="/products">
          <Button size="lg">
            Voir nos produits
          </Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Mon panier ({items.length} article{items.length > 1 ? 's' : ''})
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="font-medium text-gray-900 hover:text-blue-600">
                      {item.product.title}
                    </h3>
                  </Link>
                  
                  <div className="text-sm text-gray-600 mt-1">
                    Taille: {item.size} • Couleur: {item.color}
                  </div>
                  
                  <div className="text-lg font-bold text-gray-900 mt-2">
                    {item.product.price.toFixed(2)} DH
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.productId, item.size, item.color)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Résumé de la commande
          </h3>
          
          <div className="space-y-3 border-t pt-4">
            <div className="flex justify-between">
              <span>Sous-total</span>
              <span>{totalPrice.toFixed(2)} DH</span>
            </div>
            <div className="flex justify-between">
              <span>Livraison</span>
              <span className="text-green-600">Gratuite</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-3">
              <span>Total</span>
              <span>{totalPrice.toFixed(2)} DH</span>
            </div>
          </div>

          <Button
            onClick={handleCheckout}
            className="w-full mt-6"
            size="lg"
          >
            {user ? 'Passer la commande' : 'Se connecter pour commander'}
          </Button>

          <div className="mt-4 text-sm text-gray-600 text-center">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-4 h-4 text-green-600 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Paiement sécurisé
            </div>
            <p>Paiement à la livraison disponible</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
