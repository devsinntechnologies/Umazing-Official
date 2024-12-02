export interface Product {
  id: string;
  name: string;
  description?: string;
  longDescription?: string;
  price: number;
  baseQuantity?: number;
  imageUrl: string;
  isFavorite: boolean;
  category: string;
  condition?: string;
  city?: string;
  rating?: number;
  claim?: boolean;
  isDelete?: boolean;
  createdAt: string;
  updatedAt: string;
  CategoryId?: string;
  UserId?: string | null;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNo?: string;
}

export interface ProductQueryParams {
  pageNo: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total?: number;
  message?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface FavoriteItem {
  productId: string;
  userId: string;
}

export interface ToastNotification {
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "info";
  duration?: number;
}

export interface OrderItem {
  id: string;
  price: number;
  quantity: number;
  createdAt: string;
  Product: Product;
  Variant?: null | string;
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