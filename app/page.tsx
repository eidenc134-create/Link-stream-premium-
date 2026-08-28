"use client";

import { useState } from "react";

type Product = {
  name: string;
  category: string;
  description: string;
  plan: string;
  duration: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  slots: number;
  badge?: string;
};

const products: Product[] = [
  {
    name: "Netflix",
    category: "Streaming",
    description: "Series, películas y contenido original.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    oldPrice: "$XX.XX",
    discount: "-20%",
    slots: 5,
    badge: "OFERTA",
  },
  {
    name: "Prime Video",
    category: "Streaming",
    description: "Películas, series y producciones originales.",
    plan: "Estándar",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 8,
  },
  {
    name: "Disney+",
    category: "Streaming",
    description: "Disney, Pixar, Marvel y Star Wars.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 4,
    badge: "POPULAR",
  },
  {
    name: "HBO Max",
    category: "Streaming",
    description: "Series, películas y contenido exclusivo.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    oldPrice: "$XX.XX",
    discount: "-25%",
    slots: 3,
    badge: "FLASH",
  },
  {
    name: "ViX",
    category: "Streaming",
    description: "Contenido en español y entretenimiento.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 6,
  },
  {
    name: "Paramount+",
    category: "Streaming",
    description: "Series, películas y contenido exclusivo.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },
  {
    name: "Universal+",
    category: "Streaming",
    description: "Series y películas de Universal y NBC.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 4,
  },
  {
    name: "Apple TV+",
    category: "Streaming",
    description: "Series y producciones originales.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },
  {
    name: "Claro video",
    category: "Streaming",
    description: "Películas, series y entretenimiento.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 6,
  },
  {
    name: "DGO",
    category: "Streaming",
    description: "Televisión en vivo, deportes y entretenimiento.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 4,
    badge: "TV EN VIVO",
  },
  {
    name: "MUBI",
    category: "Streaming",
    description: "Cine seleccionado y películas independientes.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 3,
  },
  {
    name: "DAZN",
    category: "Deportes",
    description: "Deportes y eventos en directo.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
    badge: "DEPORTES",
  },
  {
    name: "ESPN",
    category: "Deportes",
    description: "Deportes, eventos y contenido deportivo.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },
  {
    name: "Crunchyroll",
    category: "Anime",
    description: "Anime, manga y contenido japonés.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 7,
    badge: "ANIME",
  },
  {
    name: "iQIYI",
    category: "Dramas",
    description: "Dramas asiáticos, anime y entretenimiento.",
    plan: "VIP",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },
  {
    name: "Viki",
    category: "Dramas",
    description: "Dramas asiáticos y contenido internacional.",
    plan: "Pass",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
    badge: "DRAMAS",
  },
  {
    name: "DramaBox",
    category: "Dramas",
    description: "Dramas asiáticos y series cortas.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
    badge: "NUEVO",
  },
  {
    name: "WeTV",
    category: "Dramas",
    description: "Series y dramas asiáticos.",
    plan: "VIP",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 4,
  },
  {
    name: "Xbox Game Pass",
    category: "Gaming",
    description: "Catálogo de juegos y beneficios para jugadores.",
    plan: "Ultimate",
    duration: "3 meses",
    price: "$XX.XX",
    oldPrice: "$XX.XX",
    discount: "-15%",
    slots: 9,
    badge: "GAMING",
  },
  {
    name: "PlayStation Plus",
    category: "Gaming",
    description: "Juegos, beneficios y ventajas para PlayStation.",
    plan: "Extra",
    duration: "3 meses",
    price: "$XX.XX",
    slots: 6,
    badge: "GAMING",
  },
  {
    name: "Game Pass",
    category: "Gaming",
    description: "Suscripciones para Xbox y PC.",
    plan: "Ultimate",
    duration: "12 meses",
    price: "$XX.XX",
    oldPrice: "$XX.XX",
    discount: "-20%",
    slots: 5,
    badge: "ANUAL",
  },
];

const filters = [
  "Todo",
  "Streaming",
  "Gaming",
  "Dramas",
  "Anime",
  "Deportes",
  "Ofertas",
];

export default function StreamingCatalog() {
  const [filter, setFilter] = useState("Todo");

  const filteredProducts =
    filter === "Todo"
      ? products
      : filter === "Ofertas"
        ? products.filter((product) => product.discount)
        : products.filter(
            (product) => product.category === filter,
          );

  return (
    <section className="streaming-catalog">
      <div className="catalog-heading">
        <div>
          <p>LINKSTREAM 2.0</p>
          <h2>Encuentra tu entretenimiento</h2>
        </div>

        <button type="button">
          Ver todo →
        </button>
      </div>

      <div className="catalog-filters">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            className={filter === item ? "active" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-catalog">
          <h3>No hay productos disponibles</h3>
          <p>
            Por el momento no tenemos productos en esta categoría.
          </p>
        </div>
      ) : (
        <div className="streaming-grid">
          {filteredProducts.map((product) => (
            <article
              className="streaming-card"
              key={product.name}
            >
              {product.badge && (
                <div className="product-badge">
                  {product.badge}
                </div>
              )}

              {product.discount && (
                <div className="discount-badge">
                  {product.discount}
                </div>
              )}

              <div className="service-logo">
                {product.name.charAt(0)}
              </div>

              <div className="service-content">
                <span>{product.category}</span>

                <h3>{product.name}</h3>

                <p>{product.description}</p>

                <div className="product-details">
                  <div>
                    <small>PLAN</small>
                    <strong>{product.plan}</strong>
                  </div>

                  <div>
                    <small>DURACIÓN</small>
                    <strong>{product.duration}</strong>
                  </div>
                </div>

                <div className="product-price">
                  {product.oldPrice && (
                    <del>{product.oldPrice}</del>
                  )}

                  <strong>{product.price}</strong>
                </div>

                <div className="product-slots">
                  <span>●</span>
                  {product.slots} cupos disponibles
                </div>

                <button
                  type="button"
                  className="service-button"
                >
                  Ver producto →
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}