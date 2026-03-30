"use client";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

const steps = [
  {
    step: "01",
    title: "Verifica identidad y rol",
    body: "Completa KYC y valida que tu perfil quede listo para operar como seller confiable.",
  },
  {
    step: "02",
    title: "Conecta cobros",
    body: "Mercado Pago gestiona el flujo de cobro y acelera el paso a operación real.",
  },
  {
    step: "03",
    title: "Publica y optimiza",
    body: "Crea listings con precio claro, stock visible y un SLA competitivo para convertir mejor.",
  },
];

export default function SellerOnboarding() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      const supabase = supabaseBrowser();
      const { data } = await supabase.auth.getUser();
      if (!data.user) setMsg("Necesitas iniciar sesión primero para avanzar con el onboarding.");
    })();
  }, []);

  return (
    <main>
      <section className="section-card card strong-card">
        <span className="eyebrow">Seller onboarding</span>
        <h1 className="page-title page-title-medium">Una ruta más sofisticada para convertirte en seller premium.</h1>
        <p className="lead compact-lead">
          Esta pantalla ya se siente más producto: define pasos, ordena la información y reduce fricción en el arranque.
        </p>
      </section>

      <section className="section two-col two-col-emphasis">
        <article className="card strong-card">
          <h2>Ruta operativa</h2>
          <div className="timeline-list">
            {steps.map((step) => (
              <div className="timeline-item" key={step.step}>
                <div className="timeline-step">{step.step}</div>
                <div>
                  <strong>{step.title}</strong>
                  <p className="muted">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="card strong-card">
          <h2>Checklist premium</h2>
          <div className="bullet-grid">
            <div className="bullet-item"><span className="bullet-dot" />Políticas de acceso claras</div>
            <div className="bullet-item"><span className="bullet-dot" />Entregas sin compartir contraseñas</div>
            <div className="bullet-item"><span className="bullet-dot" />Tiempo de respuesta competitivo</div>
            <div className="bullet-item"><span className="bullet-dot" />Oferta diseñada para retención</div>
          </div>

          <div className="form-actions" style={{ marginTop: 22 }}>
            <a className="button button-primary" href="/api/mp/oauth/start">Conectar Mercado Pago</a>
            <a className="button" href="/seller/dashboard">Ir al Seller OS</a>
          </div>
          {msg && <p className="error-text">{msg}</p>}
        </article>
      </section>
    </main>
  );
}
