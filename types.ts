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

// User type with properly typed metadata
export interface User extends CosmicObject {
  type: 'users';
  metadata: {
    email: string;
    password_hash: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    shipping_address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
  };
}

// Order item interface
export interface OrderItem {
  product_id: string;
  product_title: string;
  quantity: number;
  price: number;
  selected_size?: string;
  selected_color?: string;
}

// Order type with properly typed metadata
export interface Order extends CosmicObject {
  type: 'orders';
  metadata: {
    user: User | string;
    order_items: OrderItem[];
    total_amount: number;
    order_status: {
      key: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
      value: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    };
    stripe_session_id?: string;
    shipping_address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };
    tracking_number?: string;
    order_date: string;
  };
}

// Auth context types
export interface AuthUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<void>;
  logout: () => void;
updateProfile: (data: Partial<User['metadata']>) => Promise<void>;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}