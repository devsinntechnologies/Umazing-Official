import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const decodeToken = (token) => {
  try {
    // Decode the token
    
    const decoded = jwtDecode(token);

    // Check token expiration
    // if (isTokenExpired(decoded)) {
    //   return null;
    // }

    return decoded;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};