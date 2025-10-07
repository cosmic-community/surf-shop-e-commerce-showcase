// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Product type with properly typed metadata
export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description: string;
    price: number;
    product_images?: Array<{
      url: string;
      imgix_url: string;
    }>;
    sizes_available?: string[];
    colors_available?: string[];
    in_stock: boolean;
    collection?: Collection | string;
  };
}

// Collection type with properly typed metadata
export interface Collection extends CosmicObject {
  type: 'collections';
  metadata: {
    description?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Review type with properly typed metadata
export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    rating: {
      key: '1' | '2' | '3' | '4' | '5';
      value: '1 Star' | '2 Stars' | '3 Stars' | '4 Stars' | '5 Stars';
    };
    review_text: string;
    customer_name: string;
    product: Product | string;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards for runtime validation
export function isProduct(obj: CosmicObject): obj is Product {
  return obj.type === 'products';
}

export function isCollection(obj: CosmicObject): obj is Collection {
  return obj.type === 'collections';
}

export function isReview(obj: CosmicObject): obj is Review {
  return obj.type === 'reviews';
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size?: string, color?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}