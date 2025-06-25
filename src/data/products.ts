
import { Product } from '@/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    title: 'Hoodie Premium Noir',
    description: 'Hoodie de qualité supérieure en coton biologique. Confortable et stylé pour un look décontracté.',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Noir', 'Gris', 'Blanc'],
    stock: 50,
    category: 'Premium',
    featured: true
  },
  {
    id: '2',
    title: 'Hoodie Sport Gris',
    description: 'Hoodie sportif avec technologie anti-transpiration. Parfait pour les activités physiques.',
    price: 74.99,
    images: [
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gris', 'Bleu', 'Rouge'],
    stock: 30,
    category: 'Sport',
    featured: true
  },
  {
    id: '3',
    title: 'Hoodie Vintage Marron',
    description: 'Hoodie au style vintage avec finitions soignées. Un classique intemporel.',
    price: 94.99,
    images: [
      'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Marron', 'Beige', 'Vert'],
    stock: 25,
    category: 'Vintage',
    featured: false
  },
  {
    id: '4',
    title: 'Hoodie Streetwear Blanc',
    description: 'Hoodie tendance streetwear avec impression moderne. Pour un style urbain affirmé.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1578662015058-4ba7c73f2c85?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1618354691321-b8b6c3b8c5cc?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Blanc', 'Noir', 'Gris'],
    stock: 40,
    category: 'Streetwear',
    featured: true
  },
  {
    id: '5',
    title: 'Hoodie Oversize Bleu',
    description: 'Hoodie coupe oversize pour un confort maximum. Parfait pour un look décontracté.',
    price: 84.99,
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=600&h=800&fit=crop'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Bleu', 'Marine', 'Noir'],
    stock: 35,
    category: 'Oversize',
    featured: false
  },
  {
    id: '6',
    title: 'Hoodie Tech Rouge',
    description: 'Hoodie technique avec tissu respirant et coupe moderne. Innovation et style.',
    price: 99.99,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&h=800&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Rouge', 'Noir', 'Gris'],
    stock: 20,
    category: 'Tech',
    featured: true
  }
];
