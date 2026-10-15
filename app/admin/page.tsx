
"use client";

import { useEffect, useState } from "react";
import {
  STORAGE_KEY,
  categoryImages,
  type Product,
} from "../../lib/products";

export default function AdminPage() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("Sofas");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [image, setImage] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = saved ? JSON.parse(saved) : [];
      setProducts(Array.isArray(parsed) ? (parsed as Product[]) : []);
    } catch {
      setProducts([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  function saveProducts(updated: Product[]) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setProducts(updated);
      window.dispatchEvent(new Event("furnilux-products-updated"));
    } catch {
      alert("Products save nahi ho sake. Browser storage check karo.");
    }
  }

  function addProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const numericPrice = Number(price);
    const numericOldPrice = oldPrice.trim()
      ? Number(oldPrice)
      : numericPrice;

    if (
      !productName.trim() ||
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0 ||
      !Number.isFinite(numericOldPrice) ||
      numericOldPrice < numericPrice
    ) {
      alert("Product name aur valid prices enter karo. Old price current price se kam nahi honi chahiye.");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name: productName.trim(),
      category,
      price: numericPrice,
      oldPrice: numericOldPrice,
      rating: "New",
      image: image.trim() || categoryImages[category],
      tag: "NEW",
    };

    saveProducts([...products, newProduct]);
    setProductName("");
    setPrice("");
    setOldPrice("");
    setImage("");
    alert("Product save ho gaya!");
  }

  function deleteProduct(id: number) {
    if (!confirm("Kya tum is product ko delete karna chahte ho?")) {
      return;
    }

    saveProducts(products.filter((product) => product.id !== id));
  }

  if (!loaded) {
    return <main className="p-8">Products load ho rahe hain...</main>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 text-gray-900 md:p-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold">FurniLux Admin</h1>
        <p className="mt-2 text-gray-600">
          Manage your furniture catalog
        </p>

        <a
          href="/"
          className="mt-4 inline-block font-semibold text-blue-700 underline"
        >
          ← View Main Website
        </a>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">Add New Product</h2>

          <form onSubmit={addProduct} className="grid gap-4 sm:grid-cols-2">
            <input
              className="rounded-lg border p-3"
              placeholder="Product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />

            <input
              className="rounded-lg border p-3"
              type="number"
              min="1"
              step="1"
              placeholder="Selling price (Rs.)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <input
              className="rounded-lg border p-3"
              type="number"
              min={price || "1"}
              step="1"
              placeholder="Old price (optional)"
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
            />

            <select
              className="rounded-lg border p-3"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Sofas">Sofas</option>
              <option value="Beds">Beds</option>
              <option value="Tables">Tables</option>
              <option value="Office">Office</option>
              <option value="Storage">Storage</option>
            </select>

            <input
              className="rounded-lg border p-3 sm:col-span-2"
              placeholder="Product image URL (optional)"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-lg bg-gray-900 p-3 font-semibold text-white hover:bg-gray-700 sm:col-span-2"
            >
              + Save Product
            </button>
          </form>

          <p className="mt-3 text-xs text-gray-500">
            Image URL khali chhorne par category ki default image use hogi.
          </p>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">Added Products</h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
              {products.length} products
            </span>
          </div>

          {products.length === 0 ? (
            <p className="text-gray-500">
              Abhi koi product add nahi hua.
            </p>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex flex-wrap items-center gap-4 rounded-lg border p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {product.category} · Rs.{" "}
                      {product.price.toLocaleString("en-PK")}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteProduct(product.id)}
                    className="rounded-lg bg-red-50 px-4 py-2 text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="mt-6 text-sm text-gray-500">
          Note: Products abhi isi browser ke local storage mein save hote hain.
        </p>
      </div>
    </main>
  );
}
