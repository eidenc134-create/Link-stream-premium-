"use client";

import { useEffect, useState } from "react";
import UserMenu from "@/components/UserMenu";
import IntroCinematic from "@/components/intro/IntroCinematic";

type Product = {
  name: string;
  category: string;
  description: string;
  plan: string;
  slots: number;
  badge?: string;
  price: number;
  oldPrice?: number;
  offer?: string;
  flash?: boolean;
};

const logos: Record<string, string> = {
  Netflix: "/logos/netflix.jpg",
  "Prime Video": "/logos/prime-video.jpg",
  "Disney+": "/logos/disney-plus.jpg",
  "HBO Max": "/logos/hbo-max.jpg",
  ViX: "/logos/vix.png",
  "Paramount+": "/logos/paramount-plus.jpg",
  "Universal+": "/logos/universal-plus.jpg",
  "Apple TV+": "/logos/apple-tv.jpg",
  "Claro video": "/logos/claro-video.jpg",
  DGO: "/logos/dgo.jpg",
  MUBI: "/logos/mubi.jpg",
  DAZN: "/logos/dazn.jpg",
  ESPN: "/logos/espn.jpg",
  Crunchyroll: "/logos/crunchyroll.jpg",
  iQIYI: "/logos/iqiyi.webp",
  Viki: "/logos/viki.jpg",
  DramaBox: "/logos/dramabox.jpg",
  WeTV: "/logos/wetv.jpg",
  "Xbox Game Pass": "/logos/xbox.jpg",
  "PlayStation Plus": "/logos/playstation.jpg",
  "Game Pass": "/logos/xbox.jpg",
};

function ProductLogo({
  product,
  className,
}: {
  product: Product;
  className: string;
}) {
  const logo = logos[product.name];

  if (!logo) {
    return (
      <div className={className}>
        {product.name.charAt(0)}
      </div>
    );
  }

  return (
    <div className={`${className} real-product-logo`}>
      <img
        src={logo}
        alt={`Logo de ${product.name}`}
      />
    </div>
  );
}

const products: Product[] = [
  {
    name: "Netflix",
    category: "Streaming",
    description: "Series, películas y contenido original.",
    plan: "Premium sin anuncios",
    slots: 5,
    badge: "POPULAR",
    price: 50,
    oldPrice: 50,
    offer: "Desde $50 MXN",
    flash: true,
  },
  {
    name: "Prime Video",
    category: "Streaming",
    description: "Películas, series y producciones originales.",
    plan: "Estándar",
    slots: 8,
    price: 50,
    offer: "Desde $50 MXN",
  },
  {
    name: "Disney+",
    category: "Streaming",
    description: "Disney, Pixar, Marvel y Star Wars.",
    plan: "Premium",
    slots: 4,
    badge: "POPULAR",
    price: 50,
    offer: "Desde $50 MXN",
  },
  {
    name: "HBO Max",
    category: "Streaming",
    description: "Series, películas y contenido exclusivo.",
    plan: "Premium",
    slots: 3,
    badge: "FLASH",
    price: 50,
    oldPrice: 70,
    offer: "Oferta especial",
    flash: true,
  },
  {
    name: "ViX",
    category: "Streaming",
    description: "Contenido en español y entretenimiento.",
    plan: "Premium",
    slots: 6,
    price: 45,
    offer: "Desde $45 MXN",
  },
  {
    name: "Paramount+",
    category: "Streaming",
    description: "Series, películas y contenido exclusivo.",
    plan: "Premium",
    slots: 5,
    price: 50,
    offer: "Desde $50 MXN",
  },
  {
    name: "Universal+",
    category: "Streaming",
    description: "Series y películas de Universal y NBC.",
    plan: "Premium",
    slots: 4,
    price: 50,
    offer: "Desde $50 MXN",
  },
  {
    name: "Apple TV+",
    category: "Streaming",
    description: "Series y producciones originales.",
    plan: "Premium",
    slots: 5,
    price: 50,
    offer: "Desde $50 MXN",
  },
  {
    name: "Claro video",
    category: "Streaming",
    description: "Películas, series y entretenimiento.",
    plan: "Premium",
    slots: 6,
    price: 45,
    offer: "Desde $45 MXN",
  },
  {
    name: "DGO",
    category: "Streaming",
    description: "Televisión en vivo, deportes y entretenimiento.",
    plan: "Premium",
    slots: 4,
    price: 50,
    offer: "Desde $50 MXN",
  },
  {
    name: "MUBI",
    category: "Streaming",
    description: "Cine seleccionado y películas independientes.",
    plan: "Premium",
    slots: 3,
    price: 45,
    offer: "Desde $45 MXN",
  },
  {
    name: "DAZN",
    category: "Deportes",
    description: "Deportes y eventos en directo.",
    plan: "Premium",
    slots: 5,
    badge: "DEPORTES",
    price: 50,
    offer: "Desde $50 MXN",
  },
  {
    name: "ESPN",
    category: "Deportes",
    description: "Deportes, eventos y contenido deportivo.",
    plan: "Premium",
    slots: 5,
    price: 50,
    offer: "Desde $50 MXN",
  },
  {
    name: "Crunchyroll",
    category: "Anime",
    description: "Anime, manga y contenido japonés.",
    plan: "Premium",
    slots: 7,
    badge: "ANIME",
    price: 50,
    offer: "Desde $50 MXN",
    flash: true,
  },
  {
    name: "iQIYI",
    category: "Dramas",
    description: "Dramas asiáticos, anime y entretenimiento.",
    plan: "VIP",
    slots: 5,
    price: 45,
    offer: "Desde $45 MXN",
  },
  {
    name: "Viki",
    category: "Dramas",
    description: "Dramas asiáticos y contenido internacional.",
    plan: "Pass",
    slots: 5,
    badge: "DRAMAS",
    price: 45,
    offer: "Desde $45 MXN",
  },
  {
    name: "DramaBox",
    category: "Dramas",
    description: "Dramas asiáticos y series cortas.",
    plan: "Premium",
    slots: 5,
    badge: "NUEVO",
    price: 45,
    offer: "Desde $45 MXN",
  },
  {
    name: "WeTV",
    category: "Dramas",
    description: "Series y dramas asiáticos.",
    plan: "VIP",
    slots: 4,
    price: 45,
    offer: "Desde $45 MXN",
  },
  {
    name: "Xbox Game Pass",
    category: "Gaming",
    description: "Catálogo de juegos y beneficios para jugadores.",
    plan: "Ultimate",
    slots: 9,
    badge: "GAMING",
    price: 50,
    oldPrice: 70,
    offer: "Oferta especial",
    flash: true,
  },
  {
    name: "PlayStation Plus",
    category: "Gaming",
    description: "Juegos, beneficios y ventajas para PlayStation.",
    plan: "Extra",
    slots: 6,
    badge: "GAMING",
    price: 50,
    offer: "Desde $50 MXN",
  },
  {
    name: "Game Pass",
    category: "Gaming",
    description: "Suscripciones para Xbox y PC.",
    plan: "Ultimate",
    slots: 5,
    badge: "ANUAL",
    price: 50,
    oldPrice: 70,
    offer: "Oferta especial",
  },
];

const categories = [
  "Todo",
  "Streaming",
  "Gaming",
  "Dramas",
  "Anime",
  "Deportes",
];

export default function StreamingCatalog() {
  const [filter, setFilter] = useState("Todo");
  const [heroIndex, setHeroIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const heroProducts = products.filter(
    (product) => product.flash,
  );

  const filteredProducts =
    filter === "Todo"
      ? products
      : products.filter(
          (product) =>
            product.category === filter,
        );

  /*
   * ========================================================
   * CAMBIO DEL SLIDE
   * ========================================================
   */

  const changeHero = (nextIndex: number) => {
    if (!heroProducts.length) return;

    const normalizedIndex =
      (nextIndex + heroProducts.length) %
      heroProducts.length;

    setIsChanging(true);
    setHeroIndex(normalizedIndex);

    window.setTimeout(() => {
      setIsChanging(false);
    }, 700);
  };

  const nextHero = () => {
    changeHero(heroIndex + 1);
  };

  const previousHero = () => {
    changeHero(heroIndex - 1);
  };

  /*
   * ========================================================
   * AUTOPLAY
   * ========================================================
   */

  useEffect(() => {
    if (heroProducts.length <= 1) return;

    const interval = window.setInterval(() => {
      setHeroIndex(
        (current) =>
          (current + 1) %
          heroProducts.length,
      );

      setIsChanging(true);

      window.setTimeout(() => {
        setIsChanging(false);
      }, 700);
    }, 5000);

    return () =>
      window.clearInterval(interval);
  }, [heroProducts.length]);

  const heroProduct =
    heroProducts[heroIndex] ||
    products[0];

  /*
   * ========================================================
   * SLIDES LATERALES
   * ========================================================
   */

  const previousIndex =
    heroProducts.length > 0
      ? (heroIndex - 1 + heroProducts.length) %
        heroProducts.length
      : 0;

  const nextIndex =
    heroProducts.length > 0
      ? (heroIndex + 1) %
        heroProducts.length
      : 0;

  const previousProduct =
    heroProducts[previousIndex];

  const nextProduct =
    heroProducts[nextIndex];

  const scrollToCatalog = () => {
    document
      .getElementById("catalogo")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const showCategory = (
    category: string,
  ) => {
    setFilter(category);

    setTimeout(() => {
      document
        .getElementById("catalogo")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 50);
  };

  return (
    <>
      <IntroCinematic />

      <main className="linkstream">

        {/* ==================================================
            NAVBAR
            ================================================== */}

        <header className="navbar">

          <a
            href="/"
            className="logo"
          >
            <span>L</span>
            LinkStream <b>2.0</b>
          </a>

          <nav>
            <a href="#catalogo">
              Catálogo
            </a>

            <a
              href="#ofertas"
              onClick={() =>
                showCategory("Todo")
              }
            >
              Ofertas
            </a>

            <a
              href="#gaming"
              onClick={() =>
                showCategory("Gaming")
              }
            >
              Gaming
            </a>

            <a
              href="#dramas"
              onClick={() =>
                showCategory("Dramas")
              }
            >
              Dramas
            </a>
          </nav>

          <div className="nav-actions">

            <button
              type="button"
              className="search"
              aria-label="Buscar"
            >
              ⌕
            </button>

            <UserMenu />

          </div>

        </header>


        {/* ==================================================
            HERO — CARRUSEL PREMIUM
            ================================================== */}

        <section
          className={`hero-carousel ${
            isChanging
              ? "is-changing"
              : ""
          }`}
        >

          <div className="hero-carousel-glow" />

          {/* SLIDE LATERAL IZQUIERDO */}

          {previousProduct && (
            <div
              className="hero-side-product hero-side-product-prev"
              aria-hidden="true"
            >
              <ProductLogo
                product={previousProduct}
                className="hero-side-logo"
              />
            </div>
          )}

          {/* SLIDE PRINCIPAL */}

          <div className="hero-carousel-content">

            <div
              className="hero-slide is-active"
              key={`${heroProduct.name}-${heroIndex}`}
            >

              <div className="hero-slide-info">

                <p className="hero-eyebrow">
                  ⚡ OFERTA DESTACADA
                </p>

                <p className="hero-category">
                  {heroProduct.category}
                </p>

                <h1>
                  {heroProduct.name}
                </h1>

                <h2>
                  {heroProduct.plan}
                </h2>

                <p className="hero-slide-description">
                  {heroProduct.description}
                </p>

                <div className="hero-price">

                  {heroProduct.oldPrice && (
                    <del>
                      ${heroProduct.oldPrice}
                    </del>
                  )}

                  <strong>
                    ${heroProduct.price}
                  </strong>

                  <span>
                    MXN
                  </span>

                </div>

                <div className="hero-slide-actions">

                  <a
                    href={`/product?name=${encodeURIComponent(
                      heroProduct.name,
                    )}`}
                    className="primary-button"
                  >
                    Ver producto →
                  </a>

                  <button
                    type="button"
                    className="secondary-button"
                    onClick={scrollToCatalog}
                  >
                    Explorar catálogo
                  </button>

                </div>

              </div>


              <div className="hero-product-visual">

                <div className="hero-product-card">

                  <ProductLogo
                    product={heroProduct}
                    className="hero-product-logo"
                  />

                  <strong>
                    {heroProduct.name}
                  </strong>

                  <span>
                    {heroProduct.offer}
                  </span>

                  <small>
                    ● {heroProduct.slots} cupos disponibles
                  </small>

                </div>

              </div>

            </div>


            {/* CONTROLES */}

            <div className="hero-carousel-controls">

              <button
                type="button"
                className="hero-prev carousel-prev"
                aria-label="Producto anterior"
                onClick={previousHero}
              >
                ←
              </button>

              <div className="hero-dots hero-indicators">

                {heroProducts.map(
                  (product, index) => (
                    <button
                      key={product.name}
                      type="button"
                      className={
                        index === heroIndex
                          ? "active"
                          : ""
                      }
                      aria-current={
                        index === heroIndex
                          ? "true"
                          : undefined
                      }
                      aria-label={`Mostrar ${product.name}`}
                      onClick={() =>
                        changeHero(index)
                      }
                    />
                  ),
                )}

              </div>

              <button
                type="button"
                className="hero-next carousel-next"
                aria-label="Siguiente producto"
                onClick={nextHero}
              >
                →
              </button>

            </div>

          </div>


          {/* SLIDE LATERAL DERECHO */}

          {nextProduct && (
            <div
              className="hero-side-product hero-side-product-next"
              aria-hidden="true"
            >
              <ProductLogo
                product={nextProduct}
                className="hero-side-logo"
              />
            </div>
          )}

        </section>


        {/* ==================================================
            OFERTAS
            ================================================== */}

        <section
          id="ofertas"
          className="home-section"
        >

          <div className="section-heading">

            <div>

              <p>
                OFERTAS ESPECIALES
              </p>

              <h2>
                Aprovecha antes de que termine
              </h2>

            </div>

            <button
              type="button"
              onClick={() =>
                showCategory("Todo")
              }
            >
              Ver catálogo →
            </button>

          </div>

          <div className="horizontal-products">

            {products
              .filter(
                (product) =>
                  product.offer,
              )
              .slice(0, 8)
              .map((product) => (

                <article
                  key={product.name}
                  className="home-product-card offer-card"
                >

                  <div className="home-card-top">

                    <ProductLogo
                      product={product}
                      className="home-product-logo"
                    />

                    {product.badge && (
                      <span>
                        {product.badge}
                      </span>
                    )}

                  </div>

                  <p>
                    {product.category}
                  </p>

                  <h3>
                    {product.name}
                  </h3>

                  <small>
                    {product.plan}
                  </small>

                  <div className="home-card-price">

                    {product.oldPrice && (
                      <del>
                        ${product.oldPrice}
                      </del>
                    )}

                    <strong>
                      ${product.price}
                    </strong>

                    <span>
                      MXN
                    </span>

                  </div>

                  <div className="home-card-stock">

                    <span>
                      ●
                    </span>

                    {product.slots} cupos

                  </div>

                  <a
                    href={`/product?name=${encodeURIComponent(
                      product.name,
                    )}`}
                    className="home-card-button"
                  >
                    Ver oferta →
                  </a>

                </article>

              ))}

          </div>

        </section>


        {/* ==================================================
            FLASH
            ================================================== */}

        <section
          id="flash"
          className="flash-section"
        >

          <div className="flash-header">

            <div>

              <p>
                ⚡ OFERTAS FLASH
              </p>

              <h2>
                Solo por tiempo limitado
              </h2>

            </div>

            <div className="flash-timer">

              <span>
                TERMINA EN
              </span>

              <strong>
                23 : 59 : 59
              </strong>

            </div>

          </div>

          <div className="flash-grid">

            {products
              .filter(
                (product) =>
                  product.flash,
              )
              .map((product) => (

                <a
                  key={product.name}
                  href={`/product?name=${encodeURIComponent(
                    product.name,
                  )}`}
                  className="flash-card"
                >

                  <ProductLogo
                    product={product}
                    className="flash-logo"
                  />

                  <div>

                    <span>
                      FLASH
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.offer}
                    </p>

                  </div>

                  <strong>
                    →
                  </strong>

                </a>

              ))}

          </div>

        </section>


        {/* ==================================================
            DISPONIBILIDAD
            ================================================== */}

        <section
          id="disponibilidad"
          className="home-section"
        >

          <div className="section-heading">

            <div>

              <p>
                DISPONIBILIDAD
              </p>

              <h2>
                Disponible ahora
              </h2>

            </div>

          </div>

          <div className="stock-grid">

            {products
              .filter(
                (product) =>
                  product.slots > 0,
              )
              .slice(0, 8)
              .map((product) => (

                <a
                  key={product.name}
                  href={`/product?name=${encodeURIComponent(
                    product.name,
                  )}`}
                  className="stock-card"
                >

                  <ProductLogo
                    product={product}
                    className="stock-logo"
                  />

                  <div className="stock-info">

                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.category}
                    </span>

                  </div>

                  <div className="stock-count">

                    <span>
                      ●
                    </span>

                    {product.slots}

                  </div>

                </a>

              ))}

          </div>

        </section>


        {/* ==================================================
            CATÁLOGO
            ================================================== */}

        <section
          id="catalogo"
          className="home-section catalog-section"
        >

          <div className="section-heading">

            <div>

              <p>
                LINKSTREAM 2.0
              </p>

              <h2>
                Explora el catálogo
              </h2>

            </div>

          </div>

          <div className="catalog-filters">

            {categories.map(
              (category) => (

                <button
                  key={category}
                  type="button"
                  className={
                    filter === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setFilter(category)
                  }
                >
                  {category}
                </button>

              ),
            )}

          </div>

          {filteredProducts.length === 0 ? (

            <div className="empty-catalog">

              <h3>
                No hay productos disponibles
              </h3>

              <p>
                Por el momento no tenemos
                productos en esta categoría.
              </p>

            </div>

          ) : (

            <div className="streaming-grid">

              {filteredProducts.map(
                (product) => (

                  <article
                    key={product.name}
                    className="streaming-card"
                  >

                    {product.badge && (
                      <div className="product-badge">
                        {product.badge}
                      </div>
                    )}

                    <ProductLogo
                      product={product}
                      className="service-logo"
                    />

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
                            DESDE
                          </small>

                          <strong>
                            ${product.price} MXN
                          </strong>

                        </div>

                      </div>

                      <div className="product-slots">

                        <span>
                          ●
                        </span>

                        {product.slots} cupos disponibles

                      </div>

                      <a
                        href={`/product?name=${encodeURIComponent(
                          product.name,
                        )}`}
                        className="service-button"
                      >
                        Ver producto →
                      </a>

                    </div>

                  </article>

                ),
              )}

            </div>

          )}

        </section>


        {/* ==================================================
            FOOTER
            ================================================== */}

        <footer>

          <p>
            © 2026 LinkStream 2.0
          </p>

          <p>
            Entretenimiento digital en un solo lugar.
          </p>

        </footer>

      </main>
    </>
  );
}