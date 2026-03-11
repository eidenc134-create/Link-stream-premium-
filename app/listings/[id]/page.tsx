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
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

export default function ListingDetail({ params }: { params: { id: string } }) {
  const [listing, setListing] = useState<Listing | null>(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/listings/search", { cache: "no-store" });
      const data = await response.json();
      setListing((data.listings ?? []).find((item: Listing) => item.id === params.id) ?? null);
      setLoading(false);
    })();
  }, [params.id]);

  const total = useMemo(() => {
    if (!listing) return 0;
    return listing.price_cents * qty;
  }, [listing, qty]);

  async function buy() {
    setMsg("");
    const orderResponse = await fetch("/api/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ listingId: params.id, quantity: qty, payMethodHint: "card" }),
    });

    if (!orderResponse.ok) return setMsg(await orderResponse.text());
    const { orderId } = await orderResponse.json();

    const paymentResponse = await fetch("/api/payments/mp/create-preference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });

    if (!paymentResponse.ok) return setMsg(await paymentResponse.text());
    const { init_point } = await paymentResponse.json();
    window.location.href = init_point;
  }

  if (loading) {
    return (
      <main className="center-wrap">
        <div className="card empty-state strong-card">
          <h3>Cargando detalle...</h3>
        </div>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="center-wrap">
        <div className="card empty-state strong-card">
          <h3>No encontramos este listing</h3>
          <a href="/listings" className="button button-primary">Volver al marketplace</a>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="stack-row" style={{ marginBottom: 18 }}>
        <a href="/listings" className="button">← Volver</a>
        <span className="badge">{listing.category}</span>
        <span className="badge badge-success">Checkout protegido</span>
      </div>

      <section className="detail-grid">
        <article className="card strong-card">
          <span className="eyebrow">Oferta verificada</span>
          <h1 className="page-title page-title-medium">{listing.platform}</h1>
          <p className="lead compact-lead">{listing.plan_name}</p>

          <div className="info-list">
            <div className="info-item">
              <strong>Disponibilidad operativa</strong>
              <p className="muted">{listing.capacity_available}/{listing.capacity_total} cupos activos y listos para asignación.</p>
            </div>
            <div className="info-item">
              <strong>Entrega segura</strong>
              <p className="muted">Invitación por email, sin compartir contraseñas ni exponer credenciales del seller.</p>
            </div>
            <div className="info-item">
              <strong>Tiempo de activación</strong>
              <p className="muted">SLA estimado de {listing.sla_minutes} minutos tras la aprobación del pago.</p>
            </div>
          </div>
        </article>

        <aside className="card strong-card purchase-panel">
          <span className="badge badge-success">Resumen de compra</span>
          <h2 style={{ marginBottom: 8 }}>Costo total</h2>
          <p className="price">{formatMoney(total)}</p>
          <p className="muted">{qty} cupo(s) en moneda MXN</p>

          <div className="info-list">
            <div className="info-item">
              <strong>Cantidad</strong>
              <div className="quantity-box" style={{ marginTop: 10 }}>
                <button type="button" onClick={() => setQty((current) => Math.max(1, current - 1))}>−</button>
                <input
                  className="input"
                  type="number"
                  min={1}
                  max={Math.max(1, listing.capacity_available)}
                  value={qty}
                  onChange={(event) =>
                    setQty(
                      Math.max(
                        1,
                        Math.min(Number(event.target.value) || 1, Math.max(1, listing.capacity_available)),
                      ),
                    )
                  }
                />
                <button type="button" onClick={() => setQty((current) => Math.min(current + 1, Math.max(1, listing.capacity_available)))}>+</button>
              </div>
            </div>
            <div className="info-item">
              <strong>Incluye</strong>
              <p className="muted">Mercado Pago, ventana de escrow, seguimiento de orden y experiencia premium.</p>
            </div>
          </div>

          <div className="form-actions">
            <button className="button button-primary" onClick={buy} type="button">
              Comprar ahora
            </button>
            <a className="button" href="/dashboard">
              Guardar para después
            </a>
          </div>
          {msg && <p className="error-text">{msg}</p>}
        </aside>
      </section>
    </main>
  );
}
