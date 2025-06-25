
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, ExternalLink, Package, Users } from 'lucide-react';
import { sampleProducts } from '@/data/products';
import { Product, Order } from '@/types';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Noir', 'Blanc', 'Gris'],
    stock: '',
    category: '',
    featured: false
  });

  if (!isAdmin) {
    return <div>Chargement...</div>;
  }

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingProduct?.id || Date.now().toString(),
      title: productForm.title,
      description: productForm.description,
      price: parseFloat(productForm.price),
      images: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop'], // Placeholder
      sizes: productForm.sizes,
      colors: productForm.colors,
      stock: parseInt(productForm.stock),
      category: productForm.category,
      featured: productForm.featured
    };

    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? newProduct : p));
      toast({ title: "Produit modifié", description: "Le produit a été mis à jour avec succès" });
    } else {
      setProducts(prev => [...prev, newProduct]);
      toast({ title: "Produit créé", description: "Le nouveau produit a été ajouté" });
    }

    // Reset form
    setProductForm({
      title: '', description: '', price: '', sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Noir', 'Blanc', 'Gris'], stock: '', category: '', featured: false
    });
    setShowProductForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      sizes: product.sizes,
      colors: product.colors,
      stock: product.stock.toString(),
      category: product.category,
      featured: product.featured
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast({ title: "Produit supprimé", description: "Le produit a été supprimé avec succès" });
    }
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    toast({ title: "Statut mis à jour", description: "Le statut de la commande a été modifié" });
  };

  const openWhatsApp = (phone: string, customerName: string, orderId: string) => {
    const message = `Bonjour ${customerName}, concernant votre commande #${orderId} sur HoodieStore. Comment puis-je vous aider ?`;
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getStatusBadge = (status: Order['status']) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800'
    };

    const labels = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      shipped: 'Expédiée',
      delivered: 'Livrée'
    };

    return (
      <Badge className={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
        <div className="text-sm text-gray-600">
          Connecté en tant que: <strong>{user?.name}</strong>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chiffre d'affaires</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)} DH
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="products" className="space-y-6">
        <TabsList>
          <TabsTrigger value="products">Gestion Produits</TabsTrigger>
          <TabsTrigger value="orders">Gestion Commandes</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Produits</h2>
            <Button onClick={() => setShowProductForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un produit
            </Button>
          </div>

          {/* Product Form */}
          {showProductForm && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Titre *</Label>
                      <Input
                        id="title"
                        value={productForm.title}
                        onChange={(e) => setProductForm(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Catégorie *</Label>
                      <Input
                        id="category"
                        value={productForm.category}
                        onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Prix (DH) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={productForm.price}
                        onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">Stock *</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={productForm.featured}
                      onChange={(e) => setProductForm(prev => ({ ...prev, featured: e.target.checked }))}
                    />
                    <Label htmlFor="featured">Produit en vedette</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">
                      {editingProduct ? 'Modifier' : 'Créer'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowProductForm(false);
                        setEditingProduct(null);
                        setProductForm({
                          title: '', description: '', price: '', sizes: ['S', 'M', 'L', 'XL'],
                          colors: ['Noir', 'Blanc', 'Gris'], stock: '', category: '', featured: false
                        });
                      }}
                    >
                      Annuler
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Products List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                  <h3 className="font-semibold mb-2">{product.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">{product.price.toFixed(2)} DH</span>
                    <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-6">
          <h2 className="text-2xl font-semibold">Commandes</h2>
          
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">Commande #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Informations client</h4>
                      <p><strong>Nom:</strong> {order.customerInfo.name}</p>
                      <p><strong>Email:</strong> {order.customerInfo.email}</p>
                      <p><strong>Téléphone:</strong> {order.customerInfo.phone}</p>
                      <p><strong>Ville:</strong> {order.customerInfo.city}</p>
                      <p><strong>Adresse:</strong> {order.customerInfo.address}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Articles commandés</h4>
                      {order.items.map((item, index) => (
                        <p key={index} className="text-sm">
                          {item.product.title} - {item.size} - {item.color} x{item.quantity}
                        </p>
                      ))}
                      <p className="font-bold mt-2">Total: {order.total.toFixed(2)} DH</p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-wrap">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openWhatsApp(order.customerInfo.phone, order.customerInfo.name, order.id)}
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      WhatsApp
                    </Button>
                    
                    <Select
                      value={order.status}
                      onValueChange={(value: Order['status']) => updateOrderStatus(order.id, value)}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="confirmed">Confirmée</SelectItem>
                        <SelectItem value="shipped">Expédiée</SelectItem>
                        <SelectItem value="delivered">Livrée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {orders.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-600">Aucune commande pour le moment</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
