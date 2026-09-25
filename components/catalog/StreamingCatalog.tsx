"use client";

type Product = {
  name: string;
  logo: string;
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
    logo: "/logos/netflix.jpg",
    category: "Streaming",
    description: "Entretenimiento, series y películas.",
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
    logo: "/logos/prime-video.jpg",
    category: "Streaming",
    description: "Películas, series y producciones originales.",
    plan: "Estándar",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 8,
  },

  {
    name: "Disney+",
    logo: "/logos/disney-plus.jpg",
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
    logo: "/logos/hbo-max.jpg",
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
    logo: "/logos/vix.png",
    category: "Streaming",
    description: "Contenido en español, series y entretenimiento.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 6,
  },

  {
    name: "Paramount+",
    logo: "/logos/paramount-plus.jpg",
    category: "Streaming",
    description: "Series, películas y contenido exclusivo.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },

  {
    name: "Universal+",
    logo: "/logos/universal-plus.jpg",
    category: "Streaming",
    description: "Series y películas de Universal y NBC.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 4,
  },

  {
    name: "Crunchyroll",
    logo: "/logos/crunchyroll.jpg",
    category: "Anime",
    description: "Anime, manga y contenido japonés.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 7,
    badge: "ANIME",
  },

  {
    name: "Xbox Game Pass",
    logo: "/logos/xbox.jpg",
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
    logo: "/logos/playstation.jpg",
    category: "Gaming",
    description: "Juegos, beneficios y ventajas para PlayStation.",
    plan: "Extra",
    duration: "3 meses",
    price: "$XX.XX",
    slots: 6,
    badge: "GAMING",
  },

  {
    name: "DramaBox",
    logo: "/logos/dramabox.jpg",
    category: "Dramas",
    description: "Dramas asiáticos y contenido exclusivo.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
    badge: "NUEVO",
  },

  {
    name: "iQIYI",
    logo: "/logos/iqiyi.webp",
    category: "Dramas",
    description: "Dramas asiáticos, anime y entretenimiento.",
    plan: "VIP",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },

  {
    name: "Apple TV+",
    logo: "/logos/apple-tv.jpg",
    category: "Streaming",
    description: "Series, películas y producciones originales.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },

  {
    name: "Claro Video",
    logo: "/logos/claro-video.jpg",
    category: "Streaming",
    description: "Películas, series y entretenimiento para todos.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },

  {
    name: "DAZN",
    logo: "/logos/dazn.jpg",
    category: "Streaming",
    description: "Deportes y eventos deportivos en vivo.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
    badge: "DEPORTES",
  },

  {
    name: "DGO",
    logo: "/logos/dgo.jpg",
    category: "Streaming",
    description: "Televisión, deportes y entretenimiento en vivo.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },

  {
    name: "ESPN",
    logo: "/logos/espn.jpg",
    category: "Streaming",
    description: "Deportes, eventos y contenido deportivo.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
    badge: "DEPORTES",
  },

  {
    name: "MUBI",
    logo: "/logos/mubi.jpg",
    category: "Streaming",
    description: "Cine seleccionado, películas independientes y clásicos.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },

  {
    name: "Viki",
    logo: "/logos/viki.jpg",
    category: "Dramas",
    description: "Dramas asiáticos, series y entretenimiento internacional.",
    plan: "Premium",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },

  {
    name: "WeTV",
    logo: "/logos/wetv.jpg",
    category: "Dramas",
    description: "Dramas asiáticos, series y contenido exclusivo.",
    plan: "VIP",
    duration: "1 mes",
    price: "$XX.XX",
    slots: 5,
  },
];

export default function StreamingCatalog() {
  return (
    <section className="streaming-catalog" id="catalogo">
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
        <button
          type="button"
          className="active"
        >
          Todo
        </button>

        <button type="button">
          Streaming
        </button>

        <button type="button">
          Gaming
        </button>

        <button type="button">
          Dramas
        </button>

        <button type="button">
          Ofertas
        </button>
      </div>

      <div className="streaming-grid">
        {products.map((product) => (
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
              <img
                src={product.logo}
                alt={`Logo de ${product.name}`}
              />
            </div>

            <div className="service-content">
              <span>
                {product.category}
              </span>

              <h3>
                {product.name}
              </h3>

              <p>
                {product.description}
              </p>

              <div className="product-details">
                <div>
                  <small>
                    PLAN
                  </small>

                  <strong>
                    {product.plan}
                  </strong>
                </div>

                <div>
                  <small>
                    DURACIÓN
                  </small>

                  <strong>
                    {product.duration}
                  </strong>
                </div>
              </div>

              <div className="product-price">
                {product.oldPrice && (
                  <del>
                    {product.oldPrice}
                  </del>
                )}

                <strong>
                  {product.price}
                </strong>
              </div>

              <div className="product-slots">
                <span>
                  ●
                </span>

                {product.slots} cupos disponibles
              </div>

              <button
                type="button"
                className="service-button"
                onClick={() => {
                  window.location.href =
                    `/product?name=${encodeURIComponent(
                      product.name
                    )}`;
                }}
              >
                Ver producto →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}