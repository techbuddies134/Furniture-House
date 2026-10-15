
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  rating: string;
  image: string;
  tag: string;
};

export const STORAGE_KEY = "furnilux-admin-products";

export const categoryImages: Record<string, string> = {
  Sofas:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=85",
  Beds:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=85",
  Tables:
    "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=85",
  Office:
    "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=700&q=85",
  Storage:
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=700&q=85",
};
