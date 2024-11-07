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
// types/order.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  city: string;
  condition: string;
  baseQuantity: number;
  basePrice: number;
  claim: boolean;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  CategoryId: string;
  UserId: string | null;
}

export interface OrderItem {
  id: string;
  price: number;
  quantity: number;
  createdAt: string;
  Product: Product;
  Variant: null; // You can expand this later if needed
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
}

export interface Order {
  id: string;
  orderDate: string;
  status: string;
  receiverPhoneNo: string;
  receiverAddress: string;
  totalAmount: number;
  isDelete: boolean;
  createdAt: string;
  updatedAt: string;
  UserId: string;
  Order_Items: OrderItem[];
  User: User;
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: Order;
}
