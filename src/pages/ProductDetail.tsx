
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sampleProducts } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Minus, Plus, ArrowLeft } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const product = sampleProducts.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Produit non trouvé</h1>
        <Button onClick={() => navigate('/products')}>
          Retour aux produits
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "Sélection incomplète",
        description: "Veuillez sélectionner une taille et une couleur",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter au panier",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    addToCart(product, selectedSize, selectedColor, quantity);
    toast({
      title: "Produit ajouté",
      description: `${product.title} ajouté au panier`
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate('/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour aux produits
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-2xl font-bold text-blue-600">
              {product.price.toFixed(2)} DH
            </p>
          </div>

          <div className="border-t border-b py-6">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taille *
            </label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une taille" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map(size => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur *
            </label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir une couleur" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map(color => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantité
            </label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-12 text-center">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Stock Info */}
          <div className="text-sm text-gray-600">
            {product.stock > 10 ? (
              <span className="text-green-600">En stock ({product.stock} disponibles)</span>
            ) : product.stock > 0 ? (
              <span className="text-orange-600">Stock limité ({product.stock} restants)</span>
            ) : (
              <span className="text-red-600">Rupture de stock</span>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-full"
            size="lg"
          >
            {product.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
          </Button>

          {/* Product Details */}
          <div className="border-t pt-6 text-sm text-gray-600 space-y-2">
            <div><strong>Catégorie:</strong> {product.category}</div>
            <div><strong>Matière:</strong> 100% Coton bio</div>
            <div><strong>Entretien:</strong> Lavage machine 30°C</div>
            <div><strong>Livraison:</strong> 2-5 jours ouvrés</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
