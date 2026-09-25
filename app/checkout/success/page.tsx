"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main
        style={{
          minHeight: "100svh",
          width: "100%",
          background: "#080a10",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          fontFamily:
            'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "3px solid rgba(255,255,255,.12)",
              borderTopColor: "#fff",
              animation: "linkstreamSuccessSpin .8s linear infinite",
            }}
          />

          <span
            style={{
              color: "#858d9d",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Confirmando tu pago...
          </span>
        </div>

        <style>{`
          @keyframes linkstreamSuccessSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="success-page">
      <div className="success-glow success-glow-one" />
      <div className="success-glow success-glow-two" />

      <header className="success-header">
        <a href="/" className="success-brand">
          <span className="success-brand-mark">L</span>
          <span>LinkStream</span>
          <small>2.0</small>
        </a>

        <div className="success-secure">
          <span>🔒</span>
          Pago seguro
        </div>
      </header>

      <section className="success-wrap">
        <div className="success-card">

          <div className="success-check">
            <span>✓</span>
          </div>

          <span className="success-eyebrow">
            LINKSTREAM 2.0
          </span>

          <h1>¡Pago realizado!</h1>

          <p className="success-description">
            Tu pago fue enviado correctamente.
            <br />
            Gracias por comprar en LinkStream.
          </p>

          <div className="success-status">
            <div className="status-icon">✓</div>

            <div className="status-text">
              <strong>Pago confirmado</strong>
              <span>Tu pedido está siendo procesado.</span>
            </div>

            <div className="status-dot" />
          </div>

          {sessionId && (
            <div className="success-session">
              <span>ID DE SESIÓN</span>
              <code>{sessionId}</code>
            </div>
          )}

          <div className="success-actions">
            <a href="/" className="success-primary">
              Volver a LinkStream
              <span>→</span>
            </a>

            <a href="/account" className="success-secondary">
              Ver mi cuenta
            </a>
          </div>

          <div className="success-divider" />

          <p className="success-note">
            Guarda tu comprobante de pago.
            <br />
            Próximamente podrás consultar tus pedidos
            directamente desde tu cuenta.
          </p>

          <div className="success-trust">
            <span>✓</span>
            <span>Transacción protegida</span>
            <i />
            <span>Stripe</span>
          </div>

        </div>
      </section>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .success-page {
          min-height: 100vh;
          width: 100%;
          background:
            radial-gradient(
              circle at 50% 25%,
              rgba(80, 100, 180, 0.14),
              transparent 38%
            ),
            #080a10;
          color: #fff;
          position: relative;
          overflow: hidden;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        .success-glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(100px);
          pointer-events: none;
          opacity: 0.3;
        }

        .success-glow-one {
          width: 360px;
          height: 360px;
          background: #344d9b;
          top: 5%;
          left: 50%;
          transform: translateX(-50%);
        }

        .success-glow-two {
          width: 260px;
          height: 260px;
          background: #263d75;
          right: -100px;
          bottom: -80px;
        }

        .success-header {
          height: 76px;
          width: 100%;
          padding: 0 42px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 2;
          background: rgba(8, 10, 16, 0.72);
          backdrop-filter: blur(18px);
        }

        .success-brand {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 18px;
          font-weight: 800;
          letter-spacing: -0.4px;
        }

        .success-brand-mark {
          width: 31px;
          height: 31px;
          border-radius: 9px;
          display: grid;
          place-items: center;
          background: #fff;
          color: #080a10;
          font-size: 17px;
          font-weight: 900;
        }

        .success-brand small {
          color: #7f8798;
          font-size: 11px;
          font-weight: 700;
          margin-left: -5px;
          margin-top: 3px;
        }

        .success-secure {
          color: #8d95a6;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .success-secure span {
          font-size: 12px;
        }

        .success-wrap {
          min-height: calc(100vh - 76px);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 70px 20px 90px;
          position: relative;
          z-index: 1;
        }

        .success-card {
          width: min(620px, 100%);
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: rgba(16, 19, 28, 0.88);
          border-radius: 24px;
          padding: 48px 52px 38px;
          text-align: center;
          box-shadow:
            0 35px 100px rgba(0, 0, 0, 0.48),
            inset 0 1px 0 rgba(255, 255, 255, 0.035);
          backdrop-filter: blur(24px);
        }

        .success-check {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          margin: 0 auto 25px;
          padding: 4px;
          background: linear-gradient(
            145deg,
            #ffffff,
            #aeb8cf
          );
          box-shadow:
            0 0 0 8px rgba(255, 255, 255, 0.045),
            0 15px 45px rgba(255, 255, 255, 0.12);
        }

        .success-check span {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #10131c;
          color: #fff;
          font-size: 35px;
          font-weight: 800;
        }

        .success-eyebrow {
          color: #7f899d;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2.5px;
        }

        h1 {
          margin: 10px 0 12px;
          font-size: clamp(32px, 5vw, 46px);
          line-height: 1.05;
          letter-spacing: -1.8px;
          font-weight: 850;
        }

        .success-description {
          margin: 0;
          color: #969eae;
          font-size: 15px;
          line-height: 1.65;
        }

        .success-status {
          margin-top: 30px;
          padding: 17px 18px;
          border: 1px solid rgba(255, 255, 255, 0.075);
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.025);
          display: flex;
          align-items: center;
          text-align: left;
          gap: 13px;
        }

        .status-icon {
          width: 34px;
          height: 34px;
          flex: 0 0 34px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.08);
          font-size: 16px;
          font-weight: 800;
        }

        .status-text {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .status-text strong {
          font-size: 14px;
          font-weight: 750;
        }

        .status-text span {
          color: #81899a;
          font-size: 12px;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #fff;
          margin-left: auto;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.45);
        }

        .success-session {
          margin-top: 12px;
          padding: 13px 15px;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(255, 255, 255, 0.055);
          text-align: left;
        }

        .success-session span {
          display: block;
          color: #6f7787;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.5px;
          margin-bottom: 7px;
        }

        .success-session code {
          display: block;
          color: #aeb5c3;
          font-size: 10px;
          line-height: 1.5;
          word-break: break-all;
        }

        .success-actions {
          margin-top: 27px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .success-actions a {
          min-height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          font-size: 13px;
          font-weight: 750;
          transition:
            transform 0.2s ease,
            opacity 0.2s ease,
            background 0.2s ease;
        }

        .success-actions a:hover {
          transform: translateY(-2px);
        }

        .success-primary {
          background: #fff;
          color: #080a10;
          gap: 10px;
        }

        .success-primary span {
          font-size: 18px;
        }

        .success-primary:hover {
          background: #e9ecf2;
        }

        .success-secondary {
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #d8dce5;
          background: rgba(255, 255, 255, 0.025);
        }

        .success-secondary:hover {
          background: rgba(255, 255, 255, 0.06);
        }

        .success-divider {
          height: 1px;
          background: rgba(255, 255, 255, 0.07);
          margin: 31px 0 20px;
        }

        .success-note {
          margin: 0;
          color: #737c8d;
          font-size: 11px;
          line-height: 1.7;
        }

        .success-trust {
          margin-top: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #697282;
          font-size: 10px;
          font-weight: 650;
        }

        .success-trust > span:first-child {
          width: 17px;
          height: 17px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          color: #c8ced9;
          font-size: 9px;
        }

        .success-trust i {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #424957;
          margin: 0 4px;
        }

        @media (max-width: 640px) {
          .success-header {
            height: 64px;
            padding: 0 18px;
          }

          .success-secure {
            display: none;
          }

          .success-wrap {
            min-height: calc(100vh - 64px);
            padding: 35px 14px 55px;
          }

          .success-card {
            padding: 36px 20px 28px;
            border-radius: 20px;
          }

          .success-check {
            width: 68px;
            height: 68px;
          }

          h1 {
            font-size: 34px;
          }

          .success-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            minHeight: "100vh",
            background: "#080a10",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Cargando confirmación...
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
