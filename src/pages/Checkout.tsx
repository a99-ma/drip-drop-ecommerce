
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive"
      });
      setLoading(false);
      return;
    }

    try {
      // Simulation de création de commande
      const order = {
        id: Date.now().toString(),
        userId: user?.id,
        customerInfo: formData,
        items,
        total: totalPrice,
        status: 'pending',
        createdAt: new Date()
      };

      // En réalité, vous enverriez ceci à votre API
      console.log('Nouvelle commande:', order);

      // Sauvegarder dans localStorage pour simulation
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(order);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      clearCart();
      
      toast({
        title: "Commande confirmée !",
        description: "Votre commande a été enregistrée. Nous vous contacterons bientôt."
      });

      navigate('/');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la commande",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Finaliser la commande</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">Informations de livraison</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Numéro WhatsApp *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+212 6XX XXX XXX"
                required
              />
              <p className="text-sm text-gray-600 mt-1">
                Nous utiliserons ce numéro pour confirmer votre commande via WhatsApp
              </p>
            </div>

            <div>
              <Label htmlFor="address">Adresse complète *</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Rue, quartier, numéro..."
                required
              />
            </div>

            <div>
              <Label htmlFor="city">Ville *</Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Instructions spéciales, code d'entrée, etc."
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Mode de paiement</h3>
              <div className="flex items-center">
                <input type="radio" id="cod" name="payment" value="cod" defaultChecked />
                <label htmlFor="cod" className="ml-2 text-sm text-yellow-700">
                  Paiement à la livraison (COD) - Payez uniquement à la réception
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Traitement...' : 'Confirmer la commande'}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
            <h2 className="text-xl font-semibold mb-4">Récapitulatif</h2>
            
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.title}</h4>
                    <p className="text-sm text-gray-600">
                      {item.size} • {item.color} • Qté: {item.quantity}
                    </p>
                    <p className="font-semibold">{(item.product.price * item.quantity).toFixed(2)} DH</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total à payer à la livraison</span>
                <span>{totalPrice.toFixed(2)} DH</span>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">Avantages COD</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Payez uniquement à la réception</li>
              <li>• Vérifiez votre commande avant de payer</li>
              <li>• Aucun risque en ligne</li>
              <li>• Livraison gratuite</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
