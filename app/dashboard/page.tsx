"use client";

import { useEffect, useMemo, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

const portfolioCards = [
  { title: "Protección escrow", value: "24h", note: "Cobertura activa" },
  { title: "Disputas objetivo", value: "<1%", note: "Meta operativa" },
  { title: "Seller OS", value: "Ready", note: "Panel habilitado" },
  { title: "Tema dual", value: "On", note: "Persistente" },
];

const quickActions = [
  { href: "/listings", label: "Explorar marketplace" },
  { href: "/seller/dashboard", label: "Abrir Seller OS" },
  { href: "/seller/onboarding", label: "Completar onboarding" },
];

export default function Dashboard() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    (async () => {
      const supabase = supabaseBrowser();
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? "");
    })();
  }, []);

  const greeting = useMemo(() => (email ? email.split("@")[0] : "operador"), [email]);

  async function logout() {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <main>
      <section className="section-card card strong-card">
        <div className="section-header header-compact">
          <div>
            <span className="eyebrow">Control center</span>
            <h1 className="page-title page-title-medium">Hola, {greeting}. Tu panel ahora se siente más SaaS y más ejecutivo.</h1>
            <p className="lead compact-lead">
              Desde aquí puedes controlar tu sesión, revisar el estado del producto y moverte rápido entre compra,
              operación y crecimiento.
            </p>
          </div>
          <div className="stack-row">
            <a href="/listings" className="button button-primary">Marketplace</a>
            <button className="button button-danger" onClick={logout}>Salir</button>
          </div>
        </div>
      </section>

      <section className="section metrics-grid">
        {portfolioCards.map((card) => (
          <article className="metric-card strong-card" key={card.title}>
            <p className="metric-value">{card.value}</p>
            <p className="metric-label">{card.title}</p>
            <p className="helper-text">{card.note}</p>
          </article>
        ))}
      </section>

      <section className="section dashboard-layout">
        <article className="card strong-card dashboard-main">
          <div className="section-header header-compact">
            <div>
              <h2>Quick actions</h2>
              <p className="section-subtitle">Acciones útiles para moverte como comprador o seller.</p>
            </div>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <a className="card inline-card strong-card" href={action.href} key={action.href}>
                <span className="icon-chip">→</span>
                <div>
                  <strong>{action.label}</strong>
                  <p className="muted">Acceder ahora</p>
                </div>
              </a>
            ))}
          </div>

          <div className="section-spacer" />

          <div className="section-header header-compact">
            <div>
              <h2>Roadmap sugerido</h2>
              <p className="section-subtitle">Dónde tiene más sentido invertir para subir percepción de valor.</p>
            </div>
          </div>
          <div className="timeline-list">
            {[
              ["Historial de órdenes", "Mostrar tracking, fechas de pago y estado de entrega."],
              ["Favoritos y alertas", "Retener usuarios con watchlist y caídas de precio."],
              ["Analytics", "Conversión, ventas por categoría y performance por seller."],
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

        <aside className="dashboard-side">
          <article className="card strong-card">
            <h2>Cuenta</h2>
            <p className="helper-text">Sesión autenticada</p>
            <p><strong>{email || "No has iniciado sesión todavía"}</strong></p>
            <div className="info-list compact-info-list">
              <div className="info-item">
                <strong>Estado de perfil</strong>
                <p className="muted">Listo para comprar y en ruta para operar como seller.</p>
              </div>
              <div className="info-item">
                <strong>Seguridad</strong>
                <p className="muted">Flujo sin compartir contraseñas y con resguardo de pago.</p>
              </div>
            </div>
          </article>

          <article className="card strong-card">
            <h2>Enfoque recomendado</h2>
            <p className="muted">Prioriza reputación visible, órdenes reales y métricas operativas.</p>
            <div className="bullet-grid compact-bullets">
              <div className="bullet-item"><span className="bullet-dot" />Rating por seller</div>
              <div className="bullet-item"><span className="bullet-dot" />SLA visible en catálogo</div>
              <div className="bullet-item"><span className="bullet-dot" />Panel admin con strikes</div>
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}
