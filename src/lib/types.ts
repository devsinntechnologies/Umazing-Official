// types.ts

// Basic structure of Product, based on usage in ProductsCard and ProductSection
export interface Product {
  id: string;
  name: string;
  basePrice: number;
  isFavorite: boolean;
  Product_Images: ProductImage[];
  onDelete?: (product: Product) => void;
}

// Product Image structure
export interface ProductImage {
  id: string;
  imageUrl: string;
}

// User type
export interface User {
  id: string;
  name: string;
  email: string;
}

// Type for query parameters used in hooks, like `useGetAllProductsQuery`
export interface ProductQueryParams {
  pageNo: number;
  pageSize: number;
}

// Type for API responses
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number; // Total items for pagination
  message?: string;
}

// Cart Item structure for managing products in the cart
export interface CartItem {
  productId: string;
  quantity: number;
}

// Favourites structure for user favorites
export interface FavoriteItem {
  productId: string;
  userId: string;
}

// Toast Notification type
export interface ToastNotification {
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "info";
  duration?: number;
}
