
"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product } from "../lib/products";
import { STORAGE_KEY } from "../lib/products";

const categories = [
  {
    name: "Living Room",
    desc: "Sofas, Coffee Tables & TV Units",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85",
    filter: "Sofas",
  },
  {
    name: "Bedroom",
    desc: "Beds, Wardrobes & Dressers",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=85",
    filter: "Beds",
  },
  {
    name: "Dining Room",
    desc: "Dining Tables & Chairs",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=85",
    filter: "Tables",
  },
  {
    name: "Office",
    desc: "Desks, Chairs & Storage",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85",
    filter: "Office",
  },
];

const products: Product[] = [
  {
    id: 1,
    name: "Cloud Comfort Sofa",
    category: "Sofas",
    price: 89900,
    oldPrice: 109900,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=85",
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "Nordic Wooden Bed",
    category: "Beds",
    price: 125000,
    oldPrice: 145000,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=700&q=85",
    tag: "POPULAR",
  },
  {
    id: 3,
    name: "Oak Dining Set",
    category: "Tables",
    price: 78500,
    oldPrice: 92000,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=85",
    tag: "NEW",
  },
  {
    id: 4,
    name: "Executive Office Chair",
    category: "Office",
    price: 32500,
    oldPrice: 39900,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&w=700&q=85",
    tag: "TRENDING",
  },
  {
    id: 5,
    name: "Modern Storage Wardrobe",
    category: "Storage",
    price: 95000,
    oldPrice: 115000,
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=700&q=85",
    tag: "POPULAR",
  },
  {
    id: 6,
    name: "Minimal Coffee Table",
    category: "Tables",
    price: 18500,
    oldPrice: 24000,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1499933374294-4584851497cc?auto=format&fit=crop&w=700&q=85",
    tag: "SALE",
  },
];

const filters = ["All", "Sofas", "Beds", "Tables", "Office", "Storage"];

const money = (amount: number) =>
  "Rs. " + amount.toLocaleString("en-PK");

export default function Home() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);

  useEffect(() => {
    function loadAdminProducts() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const parsed: unknown = saved ? JSON.parse(saved) : [];

        if (Array.isArray(parsed)) {
          setAdminProducts(parsed as Product[]);
        } else {
          setAdminProducts([]);
        }
      } catch {
        setAdminProducts([]);
      }
    }

    loadAdminProducts();

    window.addEventListener("storage", loadAdminProducts);
    window.addEventListener(
      "furnilux-products-updated",
      loadAdminProducts
    );

    return () => {
      window.removeEventListener("storage", loadAdminProducts);
      window.removeEventListener(
        "furnilux-products-updated",
        loadAdminProducts
      );
    };
  }, []);

  const allProducts = useMemo(
    () => [...products, ...adminProducts],
    [adminProducts]
  );

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesCategory =
        activeFilter === "All" || product.category === activeFilter;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, search, allProducts]);

  const whatsappLink = (product?: string) =>
    `https://wa.me/923001234567?text=${encodeURIComponent(
      product
        ? `Hi FurniLux! I am interested in ${product}. Please share more details.`
        : "Hi FurniLux! I would like to know more about your furniture collection."
    )}`;

  return (
    <main className="min-h-screen bg-[#faf9f6] text-[#20221f]">
      {/* NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#171916]/95 text-white shadow-lg backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-10">
          <a href="#home" className="flex items-center gap-3">
            <span className="text-4xl text-[#d9b77a]">♧</span>
            <span>
              <span className="block font-serif text-2xl tracking-wide">
                Furni<span className="text-[#d9b77a]">Lux</span>
              </span>
              <span className="text-[10px] tracking-[3px] text-gray-400">
                MODERN LIVING, BETTER LIFE
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a href="#home" className="text-[#e7c78d]">Home</a>
            <a href="#collections" className="transition hover:text-[#e7c78d]">Collections</a>
            <a href="#products" className="transition hover:text-[#e7c78d]">Products</a>
            <a href="#about" className="transition hover:text-[#e7c78d]">About</a>
            <a href="#contact" className="transition hover:text-[#e7c78d]">Contact</a>
          </nav>

          <div className="hidden items-center gap-4 sm:flex">
            <a href="#products" className="rounded-full border border-white/20 px-4 py-2 text-sm hover:border-[#d9b77a]">
              Search products ↗
            </a>
            <a href="#contact" className="text-xl" aria-label="Contact">♡</a>
          </div>

          <button
            className="rounded-lg border border-white/20 px-3 py-2 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-4 border-t border-white/10 px-6 py-5 md:hidden">
            {["Home", "Collections", "Products", "About", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              )
            )}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-[570px] overflow-hidden bg-[#29251f] md:min-h-[650px]">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=90"
          alt="Elegant modern living room"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#171713]/95 via-[#171713]/70 to-transparent" />

        <div className="relative mx-auto flex min-h-[570px] max-w-[1400px] items-center px-6 py-20 md:min-h-[650px] md:px-12">
          <div className="max-w-2xl animate-[fadeUp_.8s_ease-out]">
            <p className="mb-6 text-xs font-semibold tracking-[4px] text-[#e4c18a]">
              PREMIUM FURNITURE COLLECTION
            </p>

            <h1 className="font-serif text-5xl leading-[1.12] text-white sm:text-6xl md:text-7xl">
              Make Room
              <br />
              For <span className="italic text-[#e4c18a]">Beautiful</span>
              <br />
              Living.
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-gray-200 md:text-lg">
              Discover timeless furniture, thoughtful designs and beautiful
              details made to turn your house into a home.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#collections" className="rounded-full bg-[#dfbd83] px-7 py-4 text-sm font-semibold text-[#201c16] transition duration-300 hover:-translate-y-1 hover:bg-white">
                Explore Collection ↗
              </a>
              <a href="#products" className="rounded-full border border-white/50 px-7 py-4 text-sm text-white transition hover:bg-white hover:text-black">
                Discover Products
              </a>
            </div>

            <div className="mt-12 flex gap-10 border-t border-white/20 pt-6">
              <div>
                <p className="font-serif text-2xl text-[#e4c18a]">200+</p>
                <p className="mt-1 text-xs text-gray-300">Design Options</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#e4c18a]">Premium</p>
                <p className="mt-1 text-xs text-gray-300">Selected Materials</p>
              </div>
              <div>
                <p className="font-serif text-2xl text-[#e4c18a]">Made</p>
                <p className="mt-1 text-xs text-gray-300">For Modern Living</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="collections" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[3px] text-[#a77d3c]">EXPLORE OUR WORLD</p>
            <h2 className="font-serif text-4xl md:text-5xl">Shop by Collection</h2>
            <p className="mt-3 text-sm text-gray-500">
              Find the perfect pieces for every corner of your home.
            </p>
          </div>
          <a href="#products" className="text-sm font-semibold hover:text-[#a77d3c]">
            View all products →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#products"
              onClick={() => {
                setSearch("");
                setActiveFilter(category.filter);
              }}
              className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 transition group-hover:bg-black/20" />
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg transition group-hover:bg-[#dfbd83]">
                  ↗
                </span>
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-serif text-xl">{category.name}</h3>
                  <p className="mt-2 text-xs text-gray-500">{category.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="bg-[#f0eee8] py-20 md:py-24">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="mb-3 text-xs font-bold tracking-[3px] text-[#a77d3c]">HANDPICKED FOR YOU</p>
              <h2 className="font-serif text-4xl md:text-5xl">Featured Products</h2>
              <p className="mt-3 text-sm text-gray-500">
                Thoughtful design. Lasting comfort. Everyday elegance.
              </p>
            </div>

            <div className="w-full max-w-sm">
              <label htmlFor="furniture-search" className="sr-only">Search furniture</label>
              <input
                id="furniture-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search furniture..."
                className="w-full rounded-full border border-black/10 bg-white px-5 py-3 text-sm outline-none transition focus:border-[#b38a4a] focus:ring-2 focus:ring-[#b38a4a]/20"
              />
            </div>
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-sm transition duration-300 ${
                  activeFilter === filter
                    ? "bg-[#20221f] text-white shadow-lg"
                    : "border border-black/10 bg-white text-gray-600 hover:border-[#b38a4a] hover:text-black"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl bg-white px-6 py-16 text-center">
              <p className="font-serif text-2xl">No products found</p>
              <p className="mt-3 text-sm text-gray-500">Try a different search or category.</p>
              <button
                onClick={() => {
                  setSearch("");
                  setActiveFilter("All");
                }}
                className="mt-5 rounded-full bg-[#20221f] px-6 py-3 text-sm text-white"
              >
                Show all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-black/5 bg-white transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden bg-[#e9e5dd]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-bold tracking-wider">
                      {product.tag}
                    </span>

                    <button
                      onClick={() =>
                        setFavorites((current) =>
                          current.includes(product.id)
                            ? current.filter((id) => id !== product.id)
                            : [...current, product.id]
                        )
                      }
                      aria-label="Add to favourites"
                      className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl shadow-sm transition hover:scale-110 ${
                        favorites.includes(product.id) ? "text-red-500" : "text-gray-700"
                      }`}
                    >
                      {favorites.includes(product.id) ? "♥" : "♡"}
                    </button>
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[2px] text-[#a77d3c]">
                      {product.category}
                    </p>
                    <h3 className="mt-2 min-h-12 font-serif text-lg leading-6">{product.name}</h3>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold">{money(product.price)}</span>
                      {product.oldPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {money(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    <p className="mt-3 text-xs text-amber-500">
                      ★★★★★ <span className="text-gray-500">({product.rating})</span>
                    </p>

                    <button
                      onClick={() => setSelected(product)}
                      className="mt-4 w-full rounded-full bg-[#20221f] px-3 py-3 text-xs font-semibold text-white transition hover:bg-[#b18a4e]"
                    >
                      View Details ↗
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mx-auto max-w-[1400px] px-5 py-20 md:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85"
              alt="Contemporary interior design"
              className="h-[420px] w-full object-cover transition duration-700 hover:scale-105 md:h-[500px]"
            />
          </div>

          <div className="py-4">
            <p className="mb-4 text-xs font-bold tracking-[3px] text-[#a77d3c]">THE FURNILUX DIFFERENCE</p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">
              Designed with care.
              <br />
              <span className="italic text-[#a77d3c]">Made for living.</span>
            </h2>
            <p className="mt-6 leading-8 text-gray-600">
              We believe furniture should do more than fill a room. It should
              reflect your style, bring people together and make everyday
              moments feel special.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="border-l-2 border-[#d9b77a] pl-4">
                <p className="font-serif text-xl">Timeless Design</p>
                <p className="mt-2 text-sm text-gray-500">Beautiful pieces for every space.</p>
              </div>
              <div className="border-l-2 border-[#d9b77a] pl-4">
                <p className="font-serif text-xl">Quality First</p>
                <p className="mt-2 text-sm text-gray-500">Thoughtful choices in every detail.</p>
              </div>
            </div>

            <a href="#collections" className="mt-9 inline-block rounded-full border border-[#20221f] px-7 py-3.5 text-sm font-semibold transition hover:bg-[#20221f] hover:text-white">
              Explore Our Collections →
            </a>
          </div>
        </div>
      </section>

      {/* SERVICE BAR */}
      <section className="bg-[#20221f] text-white">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 divide-y divide-white/10 px-5 py-8 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:px-10">
          {[
            ["♧", "Thoughtful Design", "Styles for every kind of home"],
            ["◇", "Quality Focused", "Carefully selected furniture"],
            ["↗", "Friendly Support", "Here to answer your questions"],
            ["♡", "Made for Living", "Comfort meets timeless style"],
          ].map(([icon, title, desc]) => (
            <div key={title} className="flex items-center gap-4 px-4 py-5">
              <span className="text-3xl text-[#dfbd83]">{icon}</span>
              <div>
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-1 text-xs text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-[#e7dfd0] px-5 py-16 text-center md:py-20">
        <p className="text-xs font-bold tracking-[3px] text-[#98713a]">LET'S MAKE YOUR SPACE SPECIAL</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
          Found something you love?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600">
          Contact our team to ask about products, available designs, sizes and
          custom furniture options.
        </p>
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#20221f] px-8 py-4 text-sm font-semibold text-white transition hover:-translate-y-1 hover:bg-[#3d6846]"
        >
          ☎ Chat on WhatsApp ↗
        </a>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#171916] px-5 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-serif text-3xl">
              Furni<span className="text-[#d9b77a]">Lux</span>
            </p>
            <p className="mt-2 text-xs text-gray-400">Modern Living, Better Life.</p>
          </div>

          <div className="flex flex-wrap gap-5 text-sm text-gray-300">
            <a href="#home" className="hover:text-[#dfbd83]">Home</a>
            <a href="#collections" className="hover:text-[#dfbd83]">Collections</a>
            <a href="#products" className="hover:text-[#dfbd83]">Products</a>
            <a href="#contact" className="hover:text-[#dfbd83]">Contact</a>
          </div>

          <p className="text-xs text-gray-500">© 2026 FurniLux. All rights reserved.</p>
        </div>
      </footer>

      {/* PRODUCT DETAILS MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
            className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close product details"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-xl shadow"
            >
              ×
            </button>

            <img
              src={selected.image}
              alt={selected.name}
              className="h-72 w-full object-cover md:h-full"
            />

            <div className="flex flex-col justify-center p-7 md:p-9">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#a77d3c]">
                {selected.category}
              </p>
              <h2 className="mt-3 font-serif text-3xl">{selected.name}</h2>
              <p className="mt-3 text-sm text-amber-500">
                ★★★★★ <span className="text-gray-500">({selected.rating})</span>
              </p>
              <p className="mt-5 text-2xl font-bold">{money(selected.price)}</p>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                Interested in this design? Contact our team for more
                information, sizes, available finishes and ordering details.
              </p>
              <a
                href={whatsappLink(selected.name)}
                target="_blank"
                rel="noreferrer"
                className="mt-7 rounded-full bg-[#20221f] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#3d6846]"
              >
                Enquire on WhatsApp ↗
              </a>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 85px;
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        ::selection {
          background: #dfbd83;
          color: #20221f;
        }
      `}</style>
    </main>
  );
}
