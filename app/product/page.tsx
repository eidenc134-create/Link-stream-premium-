"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { productPricing } from "@/lib/catalog/pricing";
import ComboSection from "@/components/marketplace/ComboSection";

type Duration =
  | "1 mes"
  | "3 meses"
  | "6 meses"
  | "9 meses"
  | "12 meses";

type AccessType = "Perfil" | "Cuenta completa";

type PriceOption = {
  normal?: number;
  offer?: number;
  offerLabel?: string;
  offerHours?: number;
};

type Product = {
  name: string;
  logo: string;
  category: string;
  description: string;
  plan: string;
  slots: number;
  badge?: string;
  prices: Partial<Record<Duration, PriceOption>>;
};

const products: Product[] = [
  {
    name: "Netflix",
    logo: "/logos/netflix.jpg",
    category: "Streaming",
    description:
      "Series, películas y contenido original para disfrutar donde quieras.",
    plan: "Premium sin anuncios",
    slots: 5,
    badge: "POPULAR",
    prices: productPricing["Netflix"],
  },

  {
    name: "Prime Video",
    logo: "/logos/prime-video.jpg",
    category: "Streaming",
    description: "Películas, series y producciones originales.",
    plan: "Estándar",
    slots: 8,
    prices: productPricing["Prime Video"],
  },

  {
    name: "Disney+",
    logo: "/logos/disney-plus.jpg",
    category: "Streaming",
    description: "Disney, Pixar, Marvel y Star Wars.",
    plan: "Premium",
    slots: 4,
    badge: "POPULAR",
    prices: productPricing["Disney+"],
  },

  {
    name: "HBO Max",
    logo: "/logos/hbo-max.jpg",
    category: "Streaming",
    description: "Series, películas y contenido exclusivo.",
    plan: "Premium",
    slots: 3,
    badge: "FLASH",
    prices: productPricing["HBO Max"],
  },

  {
    name: "ViX",
    logo: "/logos/vix.png",
    category: "Streaming",
    description: "Contenido en español, series y entretenimiento.",
    plan: "Premium",
    slots: 6,
    prices: productPricing["ViX"],
  },

  {
    name: "Paramount+",
    logo: "/logos/paramount-plus.jpg",
    category: "Streaming",
    description: "Series, películas y contenido exclusivo.",
    plan: "Premium",
    slots: 5,
    prices: productPricing["Paramount+"],
  },

  {
    name: "Universal+",
    logo: "/logos/universal-plus.jpg",
    category: "Streaming",
    description: "Series y películas de Universal y NBC.",
    plan: "Premium",
    slots: 4,
    prices: productPricing["Universal+"],
  },

  {
    name: "Crunchyroll",
    logo: "/logos/crunchyroll.jpg",
    category: "Anime",
    description: "Anime, manga y contenido japonés.",
    plan: "Premium",
    slots: 7,
    badge: "ANIME",
    prices: productPricing["Crunchyroll"],
  },

  {
    name: "Xbox",
    logo: "/logos/xbox.jpg",
    category: "Gaming",
    description: "Catálogo de juegos y beneficios para jugadores.",
    plan: "Ultimate",
    slots: 9,
    badge: "GAMING",
    prices: productPricing["Xbox"],
  },

  {
    name: "PlayStation",
    logo: "/logos/playstation.jpg",
    category: "Gaming",
    description: "Juegos, beneficios y ventajas para PlayStation.",
    plan: "Extra",
    slots: 6,
    badge: "GAMING",
    prices: productPricing["PlayStation"],
  },

  {
    name: "DramaBox",
    logo: "/logos/dramabox.jpg",
    category: "Dramas",
    description: "Dramas asiáticos y contenido exclusivo.",
    plan: "Premium",
    slots: 5,
    badge: "NUEVO",
    prices: productPricing["DramaBox"],
  },

  {
    name: "iQIYI",
    logo: "/logos/iqiyi.webp",
    category: "Dramas",
    description: "Dramas asiáticos, anime y entretenimiento.",
    plan: "VIP",
    slots: 5,
    prices: productPricing["iQIYI"],
  },

  {
    name: "Apple TV",
    logo: "/logos/apple-tv.jpg",
    category: "Streaming",
    description: "Series, películas y producciones originales.",
    plan: "Premium",
    slots: 5,
    prices: productPricing["Apple TV"],
  },

  {
    name: "Claro Video",
    logo: "/logos/claro-video.jpg",
    category: "Streaming",
    description: "Películas, series y entretenimiento.",
    plan: "Premium",
    slots: 5,
    prices: productPricing["Claro Video"],
  },

  {
    name: "DAZN",
    logo: "/logos/dazn.jpg",
    category: "Streaming",
    description: "Deportes y eventos deportivos en vivo.",
    plan: "Premium",
    slots: 5,
    badge: "DEPORTES",
    prices: productPricing["DAZN"],
  },

  {
    name: "DGO",
    logo: "/logos/dgo.jpg",
    category: "Streaming",
    description: "Televisión, deportes y entretenimiento.",
    plan: "Premium",
    slots: 5,
    prices: productPricing["DGO"],
  },

  {
    name: "ESPN",
    logo: "/logos/espn.jpg",
    category: "Streaming",
    description: "Deportes y eventos deportivos.",
    plan: "Premium",
    slots: 5,
    badge: "DEPORTES",
    prices: productPricing["ESPN"],
  },

  {
    name: "MUBI",
    logo: "/logos/mubi.jpg",
    category: "Streaming",
    description: "Cine seleccionado y películas especiales.",
    plan: "Premium",
    slots: 5,
    prices: productPricing["MUBI"],
  },

  {
    name: "Viki",
    logo: "/logos/viki.jpg",
    category: "Dramas",
    description: "Dramas asiáticos, series y entretenimiento.",
    plan: "Premium",
    slots: 5,
    prices: productPricing["Viki"],
  },

  {
    name: "WeTV",
    logo: "/logos/wetv.jpg",
    category: "Dramas",
    description: "Series asiáticas, dramas y entretenimiento.",
    plan: "VIP",
    slots: 5,
    prices: productPricing["WeTV"],
  },
];

const durations: Duration[] = [
  "1 mes",
  "3 meses",
  "6 meses",
  "9 meses",
  "12 meses",
];

function ProductContent() {
  const searchParams = useSearchParams();

  const productName = searchParams.get("name");

  const product = useMemo<Product | null>(() => {
    if (!productName) return null;

    return (
      products.find(
        (item) =>
          item.name.toLowerCase() === productName.toLowerCase(),
      ) || null
    );
  }, [productName]);

  const safeProduct = product || {
    name: "",
    logo: "",
    category: "",
    description: "",
    plan: "",
    slots: 0,
    prices: {"1 mes": {"normal": 60}, "3 meses": {"normal": 180, "offer": 150, "offerLabel": "OFERTA"}, "6 meses": {"normal": 360, "offer": 270, "offerLabel": "OFERTA"}, "9 meses": {"normal": 540, "offer": 380, "offerLabel": "OFERTA"}, "12 meses": {"normal": 720, "offer": 480, "offerLabel": "OFERTA"}},
  };

  const firstAvailableDuration =
    durations.find((item) => safeProduct.prices[item]) || durations[0];

  const [accessType, setAccessType] =
    useState<AccessType>("Perfil");

  const [duration, setDuration] =
    useState<Duration>(firstAvailableDuration);

  const [showOffer, setShowOffer] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const selectedPrice = safeProduct.prices[duration];

  useEffect(() => {
    setDuration(
      durations.find((item) => safeProduct.prices[item]) || durations[0],
    );
  }, [safeProduct]);

  useEffect(() => {
    if (!selectedPrice?.offerHours) {
      setRemainingSeconds(0);
      setShowOffer(Boolean(selectedPrice?.offer));
      return;
    }

    const storageKey =
      `linkstream-offer-${safeProduct.name}-${duration}`;

    let expiration = Number(
      localStorage.getItem(storageKey),
    );

    if (!expiration || expiration <= Date.now()) {
      expiration =
        Date.now() +
        selectedPrice.offerHours * 60 * 60 * 1000;

      localStorage.setItem(
        storageKey,
        String(expiration),
      );
    }

    const updateTimer = () => {
      const remaining = Math.max(
        0,
        expiration - Date.now(),
      );

      setRemainingSeconds(
        Math.floor(remaining / 1000),
      );

      setShowOffer(remaining > 0);
    };

    updateTimer();

    const interval = window.setInterval(
      updateTimer,
      1000,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, [
    safeProduct.name,
    duration,
    selectedPrice?.offer,
    selectedPrice?.offerHours,
  ]);

  const hours = Math.floor(
    remainingSeconds / 3600,
  );

  const minutes = Math.floor(
    (remainingSeconds % 3600) / 60,
  );

  const seconds = remainingSeconds % 60;

  const formattedTime = [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");

  const hasPrice =
    typeof selectedPrice?.normal === "number";

  const hasActiveOffer =
    accessType === "Perfil" &&
    Boolean(selectedPrice?.offer) &&
    showOffer;

  const currentPrice = hasActiveOffer
    ? selectedPrice?.offer
    : selectedPrice?.normal;

  const savings =
    hasActiveOffer &&
    selectedPrice?.normal &&
    selectedPrice?.offer
      ? selectedPrice.normal - selectedPrice.offer
      : 0;

  const handleBuy = () => {
    if (!hasPrice || typeof currentPrice !== "number") {
      alert(
        `El precio de ${safeProduct.name} todavía está por definir.`,
      );
      return;
    }

    const params = new URLSearchParams({
      product: safeProduct.name,
      logo: safeProduct.logo,
      access: accessType,
      duration,
      price: String(currentPrice),
    });

    window.location.href = `/checkout?${params.toString()}`;
  };

  const handleContact = () => {
    alert(
      `Consulta sobre cuenta completa de ${safeProduct.name}.\n\n` +
        "Próximamente conectaremos este botón con el vendedor o administrador.",
    );
  };

  return (
    <>
      <section className="product-page">
      <div className="product-page-content">

        {/* REGRESAR */}
        <a
          href="/#catalogo"
          className="product-back"
        >
          <span>←</span>
          Volver al catálogo
        </a>

        {/* HERO DEL PRODUCTO */}
        <div className="product-hero">

          <div className="product-visual-card">

            <div className="product-visual-glow" />

            <div className="product-visual-badge">
              LINKSTREAM
            </div>

            <div className="product-big-logo">
              <img
                src={safeProduct.logo}
                alt={`Logo de ${safeProduct.name}`}
              />
            </div>

            <div className="product-visual-bottom">
              <span>
                {safeProduct.category}
              </span>

              <strong>
                {safeProduct.plan}
              </strong>
            </div>

          </div>

          <div className="product-header-info">

            <div className="product-title-row">

              <span className="product-category">
                {safeProduct.category}
              </span>

              {safeProduct.badge && (
                <span className="product-header-badge">
                  {safeProduct.badge}
                </span>
              )}

            </div>

            <h1>
              {safeProduct.name}
            </h1>

            <p className="product-description">
              {safeProduct.description}
            </p>

            <div className="product-meta">

              <div>
                <span>PLAN</span>
                <strong>{safeProduct.plan}</strong>
              </div>

              <div>
                <span>DISPONIBILIDAD</span>
                <strong>
                  {safeProduct.slots} cupos
                </strong>
              </div>

            </div>

          </div>

        </div>

        {/* PLAN */}
        <div className="product-option">

          <div className="product-section-heading">
            <span>01</span>

            <div>
              <small>PLAN</small>
              <h2>Elige tu experiencia</h2>
            </div>
          </div>

          <div className="product-plan-box">

            <div className="product-plan-icon">
              ✓
            </div>

            <div>
              <small>
                PLAN SELECCIONADO
              </small>

              <strong>
                {safeProduct.plan}
              </strong>

              <p>
                Disfruta del servicio con acceso
                preparado para ti.
              </p>
            </div>

            <span className="plan-check">
              ✓
            </span>

          </div>

        </div>

        {/* TIPO DE ACCESO */}
        <div className="product-option">

          <div className="product-section-heading">
            <span>02</span>

            <div>
              <small>ACCESO</small>
              <h2>¿Cómo quieres acceder?</h2>
            </div>
          </div>

          <div className="option-buttons">

            <button
              type="button"
              className={
                accessType === "Perfil"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setAccessType("Perfil")
              }
            >
              <span className="option-icon">
                👤
              </span>

              <strong>
                Perfil
              </strong>

              <small>
                Acceso individual
              </small>

              <i>
                {accessType === "Perfil"
                  ? "Seleccionado"
                  : "Seleccionar"}
              </i>

            </button>

            <button
              type="button"
              className={
                accessType === "Cuenta completa"
                  ? "selected"
                  : ""
              }
              onClick={() =>
                setAccessType("Cuenta completa")
              }
            >
              <span className="option-icon">
                👑
              </span>

              <strong>
                Cuenta completa
              </strong>

              <small>
                Acceso total
              </small>

              <i>
                {accessType === "Cuenta completa"
                  ? "Seleccionado"
                  : "Seleccionar"}
              </i>

            </button>

          </div>

        </div>

        {/* DURACIÓN */}
        <div className="product-option">

          <div className="product-section-heading">
            <span>03</span>

            <div>
              <small>DURACIÓN</small>
              <h2>Elige cuánto tiempo</h2>
            </div>
          </div>

          <div className="option-buttons duration-buttons">

            {durations.map((item) => {
              const option = safeProduct.prices[item];

              const hasOption = Boolean(option);
              const hasOffer = Boolean(option?.offer);

              return (
                <button
                  key={item}
                  type="button"
                  disabled={!hasOption}
                  className={
                    duration === item
                      ? "selected"
                      : ""
                  }
                  onClick={() => {
                    if (hasOption) {
                      setDuration(item);
                    }
                  }}
                >
                  <strong>
                    {item}
                  </strong>

                  {hasOffer && (
                    <small>
                      🔥 Oferta
                    </small>
                  )}

                  {!hasOption && (
                    <small>
                      Próximamente
                    </small>
                  )}

                  {duration === item && (
                    <i>
                      ✓
                    </i>
                  )}
                </button>
              );
            })}

          </div>

        </div>

        {/* OFERTA */}
        {accessType === "Perfil" &&
          hasActiveOffer && (
            <div className="product-offer-box">

              <div className="offer-icon">
                🔥
              </div>

              <div className="offer-content">

                <strong>
                  {selectedPrice?.offerLabel ||
                    "OFERTA ESPECIAL"}
                </strong>

                <p>
                  Ahorras ${savings} MXN
                </p>

              </div>

              {selectedPrice?.offerHours && (
                <div className="product-offer-timer">

                  <small>
                    TERMINA EN
                  </small>

                  <strong>
                    {formattedTime}
                  </strong>

                </div>
              )}

            </div>
          )}

        {/* RESUMEN */}
        <div className="product-purchase">

          <div className="purchase-heading">

            <div>
              <span>
                RESUMEN DE TU PEDIDO
              </span>

              <strong>
                {safeProduct.name}
              </strong>
            </div>

            <div className="purchase-total">
              {hasPrice
                ? `$${currentPrice} MXN`
                : "Por definir"}
            </div>

          </div>

          <div className="purchase-grid">

            <div className="purchase-item">
              <small>
                ACCESO
              </small>

              <strong>
                {accessType}
              </strong>
            </div>

            <div className="purchase-item">
              <small>
                DURACIÓN
              </small>

              <strong>
                {duration}
              </strong>
            </div>

            <div className="purchase-item">
              <small>
                DISPONIBILIDAD
              </small>

              <strong>
                {safeProduct.slots} cupos
              </strong>
            </div>

            <div className="purchase-item purchase-price-item">
              <small>
                PRECIO
              </small>

              {hasPrice ? (
                <div className="product-price-result">

                  {hasActiveOffer && (
                    <del>
                      ${selectedPrice?.normal}
                    </del>
                  )}

                  <strong>
                    ${currentPrice} MXN
                  </strong>

                </div>
              ) : (
                <strong>
                  Por definir
                </strong>
              )}
            </div>

          </div>

        </div>

        {/* DISPONIBILIDAD */}
        <div className="product-availability">

          <span>
            ●
          </span>

          <strong>
            {safeProduct.slots}
          </strong>

          <span>
            cupos disponibles
          </span>

        </div>

        {/* COMPRA */}
        {accessType === "Perfil" ? (
          <button
            type="button"
            className="primary-button product-buy"
            onClick={handleBuy}
          >
            <span>
              {hasPrice
                ? `Comprar por $${currentPrice} MXN`
                : "Consultar precio"}
            </span>

            <strong>
              →
            </strong>
          </button>
        ) : (
          <button
            type="button"
            className="primary-button product-buy"
            onClick={handleContact}
          >
            <span>
              Consultar cuenta completa
            </span>

            <strong>
              →
            </strong>
          </button>
        )}

      </div>
    </section>

    <div
      style={{
        display: "block",
        width: "100%",
        minHeight: "300px",
        marginTop: "40px",
        padding: "40px",
        background: "red",
        color: "white",
        fontSize: "40px",
        fontWeight: "900",
        position: "relative",
        zIndex: 9999,
      }}
    >
      PRUEBA COMBO VISIBLE
    </div>

    <ComboSection />

    </>
  );
}

export default function ProductPage() {
  return (
    <main className="product-layout">

      <header className="navbar">

        <a
          href="/"
          className="logo"
        >
          <span>L</span>
          LinkStream <b>2.0</b>
        </a>

        <nav>

          <a href="/#catalogo">
            Catálogo
          </a>

          <a href="/#catalogo">
            Ofertas
          </a>

          <a href="/#catalogo">
            Gaming
          </a>

          <a href="/#catalogo">
            Dramas
          </a>

        </nav>

      </header>

      <Suspense
        fallback={
          <section className="product-page">

            <div className="product-page-content">

              <div className="product-loading">
                <div className="product-loading-spinner" />

                <p>
                  Cargando producto...
                </p>

              </div>

            </div>

          </section>
        }
      >
        <ProductContent />
      </Suspense>

      <footer className="product-footer">

        <div>
          <strong>
            LinkStream <span>2.0</span>
          </strong>

          <p>
            Entretenimiento digital en un solo lugar.
          </p>
        </div>

        <p>
          © 2026 LinkStream 2.0
        </p>

      </footer>

    </main>
  );
}