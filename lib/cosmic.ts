import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Helper functions for fetching data
// Helper functions for fetching data
import { Product, Collection, Review, CosmicResponse } from '@/types'

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'products',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.object as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'collections' })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(0);
    
    return response.objects as Collection[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch collections');
  }
}

export async function getCollection(slug: string): Promise<Collection | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'collections',
        slug
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(0);
    
    return response.object as Collection;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch collection');
  }
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'products',
        'metadata.collection': collectionId
      })
      .props(['id', 'title', 'slug', 'metadata', 'thumbnail'])
      .depth(1);
    
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products by collection');
  }
}

export async function getReviewsForProduct(productId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'reviews',
        'metadata.product': productId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

export async function getAllReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Review[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

// Write client for authenticated operations
export const cosmicWrite = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// User management functions
import { User, Order } from '@/types'

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'users',
        'metadata.email': email
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    if (response.objects && response.objects.length > 0) {
      return response.objects[0] as User;
    }
    return null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'users',
        id: userId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(0);
    
    return response.object as User;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch user');
  }
}

export async function createUser(email: string, passwordHash: string, firstName?: string, lastName?: string): Promise<User> {
  try {
    const response = await cosmicWrite.objects.insertOne({
      title: email,
      type: 'users',
      metadata: {
        email,
        password_hash: passwordHash,
        ...(firstName && { first_name: firstName }),
        ...(lastName && { last_name: lastName })
      }
    });
    
    return response.object as User;
  } catch (error) {
    throw new Error('Failed to create user');
  }
}

export async function updateUser(userId: string, metadata: Partial<User['metadata']>): Promise<User> {
  try {
    const response = await cosmicWrite.objects.updateOne(userId, {
      metadata
    });
    
    return response.object as User;
  } catch (error) {
    throw new Error('Failed to update user');
  }
}

// Order management functions
export async function createOrder(orderData: {
  userId: string;
  items: Order['metadata']['order_items'];
  totalAmount: number;
  stripeSessionId: string;
  shippingAddress?: Order['metadata']['shipping_address'];
}): Promise<Order> {
  try {
    const response = await cosmicWrite.objects.insertOne({
      title: `Order ${Date.now()}`,
      type: 'orders',
      metadata: {
        user: orderData.userId,
        order_items: orderData.items,
        total_amount: orderData.totalAmount,
        order_status: {
          key: 'pending',
          value: 'Pending'
        },
        stripe_session_id: orderData.stripeSessionId,
        shipping_address: orderData.shippingAddress,
        order_date: new Date().toISOString().split('T')[0]
      }
    });
    
    return response.object as Order;
  } catch (error) {
    throw new Error('Failed to create order');
  }
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  try {
    const response = await cosmic.objects
      .find({
        type: 'orders',
        'metadata.user': userId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(0);
    
    const orders = response.objects as Order[];
    
    // Manual sorting by created_at (newest first)
    return orders.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch orders');
  }
}

export async function getOrder(orderId: string): Promise<Order | null> {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'orders',
        id: orderId
      })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1);
    
    return response.object as Order;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch order');
  }
}