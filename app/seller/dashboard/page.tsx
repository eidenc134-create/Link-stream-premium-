"use client";

import { useState } from "react";

const opsMetrics = [
  { value: "$28.9k", label: "GMV proyectado" },
  { value: "94m", label: "SLA promedio" },
  { value: "4.9/5", label: "Rating objetivo" },
  { value: "0.8%", label: "Disputas" },
];

export default function SellerDashboard() {
  const [msg, setMsg] = useState("");

  async function createListing(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const form = new FormData(e.target as HTMLFormElement);

    const payload = {
      category: form.get("category"),
      platform: form.get("platform"),
      plan_name: form.get("plan_name"),
      capacity_total: Number(form.get("capacity_total")),
      price_cents: Math.round(Number(form.get("price_mxn")) * 100),
      sla_minutes: Number(form.get("sla_minutes") || 120),
    };

    const response = await fetch("/api/listings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) setMsg(await response.text());
    else setMsg("Listing creado correctamente ✅");
  }

  return (
    <main>
      <section className="section-card card strong-card">
        <div className="section-header header-compact">
          <div>
            <span className="eyebrow">Seller OS</span>
            <h1 className="page-title page-title-medium">Opera como un seller premium con un cockpit más serio y con mejor jerarquía visual.</h1>
            <p className="lead compact-lead">Publica ofertas, conecta pagos y gestiona tu operación con una estética más tipo software de negocio.</p>
          </div>
          <div className="stack-row">
            <a className="button" href="/dashboard">← Control center</a>
            <a className="button button-primary" href="/api/mp/oauth/start">Conectar Mercado Pago</a>
          </div>
        </div>
      </section>

      <section className="section metrics-grid">
        {opsMetrics.map((metric) => (
          <article className="metric-card strong-card" key={metric.label}>
            <p className="metric-value">{metric.value}</p>
            <p className="metric-label">{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="section dashboard-layout seller-layout">
        <article className="card strong-card dashboard-main">
          <div className="section-header header-compact">
            <div>
              <h2>Crear listing</h2>
              <p className="section-subtitle">Formulario más ordenado para publicar ofertas de forma rápida.</p>
            </div>
          </div>

          <form onSubmit={createListing} className="form-grid">
            <div className="form-grid two">
              <label className="field">
                <span>Categoría</span>
                <input className="input" name="category" placeholder="streaming" defaultValue="streaming" />
              </label>
              <label className="field">
                <span>Plataforma</span>
                <input className="input" name="platform" placeholder="Netflix" />
              </label>
            </div>

            <label className="field">
              <span>Nombre del plan</span>
              <input className="input" name="plan_name" placeholder="Plan familiar 4K" />
            </label>

            <div className="form-grid two">
              <label className="field">
                <span>Cupos totales</span>
                <input className="input" name="capacity_total" type="number" placeholder="5" defaultValue="5" />
              </label>
              <label className="field">
                <span>Precio por cupo (MXN)</span>
                <input className="input" name="price_mxn" type="number" placeholder="99" defaultValue="99" />
              </label>
            </div>

            <label className="field">
              <span>SLA (minutos)</span>
              <input className="input" name="sla_minutes" type="number" placeholder="120" defaultValue="120" />
            </label>

            <div className="form-actions">
              <button className="button button-primary" type="submit">Publicar listing</button>
              <a className="button" href="/listings">Ver catálogo</a>
            </div>
          </form>
          {msg && <p className={msg.includes("✅") ? "success-text" : "error-text"}>{msg}</p>}
        </article>

        <aside className="dashboard-side">
          <article className="card strong-card">
            <h2>Checklist operativo</h2>
            <div className="timeline-list">
              {[
                ["Cuenta verificada", "Asegura seller_verification=verified antes de vender."],
                ["Cobros conectados", "Mercado Pago debe quedar autorizado y listo para payout."],
                ["Oferta clara", "Precio, cupos y SLA visibles mejoran confianza y conversión."],
              ].map(([title, body], index) => (
                <div className="timeline-item" key={title}>
                  <div className="timeline-step">0{index + 1}</div>
                  <div>
                    <strong>{title}</strong>
                    <p className="muted">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="card strong-card">
            <h2>Palancas de crecimiento</h2>
            <div className="bullet-grid compact-bullets">
              <div className="bullet-item"><span className="bullet-dot" />Mostrar reputación por seller</div>
              <div className="bullet-item"><span className="bullet-dot" />Boost de listings premium</div>
              <div className="bullet-item"><span className="bullet-dot" />Automatizar renovaciones</div>
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
