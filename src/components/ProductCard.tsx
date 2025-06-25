
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {product.price.toFixed(2)} DH
          </span>
          
          <div className="flex items-center space-x-2">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Stock: {product.stock}
          </span>
          
          <Link to={`/product/${product.id}`}>
            <Button size="sm">
              Voir détails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
