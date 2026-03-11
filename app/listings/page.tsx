"use client";

import { useEffect, useMemo, useState } from "react";

type Listing = {
  id: string;
  platform: string;
  plan_name: string;
  category: string;
  capacity_available: number;
  capacity_total: number;
  price_cents: number;
  sla_minutes: number;
  status: string;
};

const sortOptions = {
  relevance: "Relevancia",
  priceAsc: "Precio más bajo",
  priceDesc: "Precio más alto",
  slaAsc: "Entrega más rápida",
} as const;

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<keyof typeof sortOptions>("relevance");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/listings/search", { cache: "no-store" });
        const data = await response.json();
        setListings(data.listings ?? []);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const categories = useMemo(() => {
    const values = Array.from(new Set(listings.map((item) => item.category).filter(Boolean)));
    return ["all", ...values];
  }, [listings]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const base = listings.filter((item) => {
      const byCategory = category === "all" || item.category === category;
      const byQuery =
        !normalized ||
        item.platform.toLowerCase().includes(normalized) ||
        item.plan_name.toLowerCase().includes(normalized) ||
        item.category.toLowerCase().includes(normalized);
      return byCategory && byQuery;
    });

    return [...base].sort((a, b) => {
      if (sort === "priceAsc") return a.price_cents - b.price_cents;
      if (sort === "priceDesc") return b.price_cents - a.price_cents;
      if (sort === "slaAsc") return a.sla_minutes - b.sla_minutes;
      return b.capacity_available - a.capacity_available;
    });
  }, [category, listings, query, sort]);

  return (
    <main>
      <section className="section-card card strong-card">
        <div className="section-header header-compact">
          <div>
            <span className="eyebrow">Marketplace premium</span>
            <h1 className="page-title page-title-medium">Descubre ofertas con filtros, mejor lectura y una experiencia más tipo fintech.</h1>
            <p className="lead compact-lead">
              El catálogo ahora se siente más sofisticado: tarjetas más limpias, resumen visible y una UX pensada
              para comparar rápido sin perder contexto.
            </p>
          </div>
          <div className="badge-grid">
            <span className="pill">+ claridad visual</span>
            <span className="pill">+ intención de compra</span>
            <span className="pill">+ estilo premium</span>
          </div>
        </div>
      </section>

      <section className="section panel-toolbar">
        <div className="toolbar premium-toolbar">
          <input
            className="input"
            placeholder="Buscar por plataforma, plan o categoría"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select className="select" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item === "all" ? "Todas las categorías" : item}
              </option>
            ))}
          </select>
          <select className="select" value={sort} onChange={(event) => setSort(event.target.value as keyof typeof sortOptions)}>
            {Object.entries(sortOptions).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </section>

      {loading ? (
        <section className="section card empty-state strong-card">
          <h3>Cargando marketplace...</h3>
          <p className="muted">Estamos preparando el catálogo premium.</p>
        </section>
      ) : filtered.length === 0 ? (
        <section className="section card empty-state strong-card">
          <h3>No encontramos resultados</h3>
          <p className="muted">Prueba otro texto, cambia la categoría o revisa los listings publicados.</p>
        </section>
      ) : (
        <section className="section catalog-grid catalog-grid-dense">
          {filtered.map((listing) => (
            <article className="card listing-card strong-card elevated-card" key={listing.id}>
              <div className="listing-top">
                <div>
                  <span className="badge">{listing.category}</span>
                  <h3 style={{ margin: "12px 0 6px" }}>{listing.platform}</h3>
                  <p className="muted" style={{ margin: 0 }}>{listing.plan_name}</p>
                </div>
                <span className={listing.capacity_available > 0 ? "badge badge-success" : "badge badge-danger"}>
                  {listing.capacity_available > 0 ? "Disponible" : "Sin stock"}
                </span>
              </div>

              <div className="price-row">
                <div>
                  <div className="price">{formatMoney(listing.price_cents)}</div>
                  <div className="helper-text">por cupo</div>
                </div>
                <div className="signal-box">
                  <span className="signal-value">{listing.sla_minutes}m</span>
                  <span className="signal-label">SLA</span>
                </div>
              </div>

              <div className="meta-row meta-row-tight">
                <span>{listing.capacity_available}/{listing.capacity_total} cupos</span>
                <span>Estado: {listing.status}</span>
              </div>

              <div className="card-footer">
                <span className="helper-text">Checkout protegido + entrega por invitación</span>
                <a className="button button-primary" href={`/listings/${listing.id}`}>
                  Ver detalle
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
