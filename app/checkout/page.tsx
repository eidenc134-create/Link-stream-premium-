"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function CheckoutContent() {
  const searchParams = useSearchParams();

  const product = searchParams.get("product") || "";
  const logo = searchParams.get("logo") || "";
  const access = searchParams.get("access") || "";
  const duration = searchParams.get("duration") || "";
  const price = searchParams.get("price") || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const numericPrice = Number(price);

  const hasData =
    Boolean(product) &&
    Boolean(access) &&
    Boolean(duration) &&
    Number.isFinite(numericPrice) &&
    numericPrice > 0;

  useEffect(() => {
    document.title = product
      ? `Comprar ${product} | LinkStream 2.0`
      : "Checkout | LinkStream 2.0";
  }, [product]);

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
              animation: "linkstreamCheckoutSpin .8s linear infinite",
            }}
          />

          <span
            style={{
              color: "#858d9d",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            Preparando tu pedido...
          </span>
        </div>

        <style>{`
          @keyframes linkstreamCheckoutSpin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </main>
    );
  }

  const handleCheckout = async () => {
    if (!hasData || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product,
          logo,
          access,
          duration,
          price: numericPrice,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.url) {
        throw new Error(
          data.error || "No se pudo iniciar el pago.",
        );
      }

      window.location.href = data.url;
    } catch (checkoutError) {
      console.error(
        "Error iniciando Stripe Checkout:",
        checkoutError,
      );

      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "No se pudo iniciar el pago.",
      );

      setLoading(false);
    }
  };

  if (!hasData) {
    return (
      <>
        <style jsx>{`
          * {
            box-sizing: border-box;
          }

          .page {
            min-height: 100vh;
            min-height: 100svh;
            display: grid;
            place-items: center;
            padding: 24px;
            background: #050609;
            color: white;
            font-family: Arial, Helvetica, sans-serif;
          }

          .card {
            width: min(460px, 100%);
            padding: 42px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            background: rgba(17, 18, 23, 0.96);
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
          }

          .icon {
            width: 54px;
            height: 54px;
            margin: 0 auto 20px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            background: rgba(255, 190, 80, 0.08);
            color: #ffc46b;
            font-size: 22px;
            font-weight: 800;
          }

          .eyebrow {
            display: block;
            margin-bottom: 10px;
            color: rgba(255, 255, 255, 0.35);
            font-size: 9px;
            font-weight: 800;
            letter-spacing: 3px;
          }

          h1 {
            margin: 0;
            font-size: 28px;
            letter-spacing: -1px;
          }

          p {
            margin: 12px 0 24px;
            color: rgba(255, 255, 255, 0.45);
            font-size: 13px;
            line-height: 1.6;
          }

          a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 46px;
            padding: 0 20px;
            border-radius: 12px;
            background: white;
            color: #07080b;
            font-size: 12px;
            font-weight: 800;
            text-decoration: none;
          }
        `}</style>

        <main className="page">
          <section className="card">
            <div className="icon">!</div>

            <span className="eyebrow">
              LINKSTREAM 2.0
            </span>

            <h1>Compra no disponible</h1>

            <p>
              No encontramos toda la información necesaria
              para preparar tu pedido.
            </p>

            <a href="/product">
              Volver al catálogo →
            </a>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          padding: 0 24px 70px;
          background:
            radial-gradient(
              circle at 50% -20%,
              rgba(255, 255, 255, 0.09),
              transparent 36%
            ),
            #06070a;
          color: #fff;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        .page::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(
              circle at 0% 50%,
              rgba(113, 77, 255, 0.06),
              transparent 30%
            ),
            radial-gradient(
              circle at 100% 90%,
              rgba(113, 77, 255, 0.05),
              transparent 30%
            );
        }

        .top {
          position: relative;
          z-index: 2;
          width: min(1120px, 100%);
          height: 82px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          color: white;
          text-decoration: none;
        }

        .brandMark {
          width: 39px;
          height: 39px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 11px;
          background: rgba(255, 255, 255, 0.055);
          font-size: 11px;
          font-weight: 900;
        }

        .brandText {
          font-size: 19px;
          font-weight: 500;
          letter-spacing: -1px;
        }

        .brandText strong {
          font-weight: 850;
        }

        .version {
          margin-left: 4px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 8px;
          vertical-align: top;
        }

        .secureTop {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 11px;
        }

        .lock {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.035);
        }

        .container {
          position: relative;
          z-index: 2;
          width: min(1120px, 100%);
          margin: 0 auto;
        }

        .heading {
          margin: 42px 0 32px;
        }

        .back {
          display: inline-block;
          margin-bottom: 24px;
          color: rgba(255, 255, 255, 0.38);
          font-size: 11px;
          text-decoration: none;
        }

        .back:hover {
          color: white;
        }

        .eyebrow {
          display: block;
          margin-bottom: 9px;
          color: rgba(255, 255, 255, 0.32);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 2.7px;
        }

        .heading h1 {
          margin: 0;
          font-size: clamp(38px, 5vw, 55px);
          line-height: 1;
          font-weight: 760;
          letter-spacing: -2.8px;
        }

        .heading p {
          margin: 14px 0 0;
          color: rgba(255, 255, 255, 0.4);
          font-size: 13px;
          line-height: 1.6;
        }

        .checkout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 25px;
          background: rgba(14, 15, 19, 0.94);
          box-shadow:
            0 35px 90px rgba(0, 0, 0, 0.5),
            inset 0 1px rgba(255, 255, 255, 0.045);
        }

        .product {
          padding: 42px;
        }

        .productTop {
          display: flex;
          align-items: center;
          gap: 27px;
        }

        .logoBox {
          width: 145px;
          height: 145px;
          flex: 0 0 145px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 21px;
          background: #08090c;
          box-shadow: 0 20px 42px rgba(0, 0, 0, 0.4);
        }

        .logoBox img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .productLabel {
          margin-bottom: 9px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .product h2 {
          margin: 0;
          font-size: 31px;
          line-height: 1.05;
          letter-spacing: -1.3px;
        }

        .description {
          max-width: 430px;
          margin: 10px 0 16px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 12px;
          line-height: 1.6;
        }

        .available {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 10px;
          border: 1px solid rgba(255, 255, 255, 0.065);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.025);
          color: rgba(255, 255, 255, 0.46);
          font-size: 9px;
        }

        .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #75e49b;
          box-shadow: 0 0 10px rgba(117, 228, 155, 0.65);
        }

        .line {
          height: 1px;
          margin: 45px 0 28px;
          background: rgba(255, 255, 255, 0.065);
        }

        .details {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 11px;
        }

        .detail {
          min-height: 70px;
          padding: 15px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.022);
        }

        .detail span {
          display: block;
          margin-bottom: 8px;
          color: rgba(255, 255, 255, 0.28);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .detail strong {
          display: block;
          overflow: hidden;
          color: rgba(255, 255, 255, 0.85);
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .summary {
          display: flex;
          flex-direction: column;
          padding: 42px 34px;
          border-left: 1px solid rgba(255, 255, 255, 0.065);
          background:
            linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.045),
              rgba(255, 255, 255, 0.012)
            );
        }

        .summaryTitle {
          margin-bottom: 29px;
          color: rgba(255, 255, 255, 0.3);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.9px;
        }

        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          color: rgba(255, 255, 255, 0.62);
          font-size: 11px;
        }

        .row strong {
          color: white;
          font-size: 12px;
        }

        .sub {
          margin-top: 9px;
          color: rgba(255, 255, 255, 0.27);
          font-size: 9px;
        }

        .separator {
          height: 1px;
          margin: 27px 0;
          background: rgba(255, 255, 255, 0.07);
        }

        .total {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 25px;
        }

        .totalLabel {
          color: rgba(255, 255, 255, 0.48);
          font-size: 11px;
        }

        .totalCurrency {
          display: block;
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.24);
          font-size: 8px;
          letter-spacing: 1px;
        }

        .totalPrice {
          color: white;
          font-size: 32px;
          font-weight: 760;
          line-height: 1;
          letter-spacing: -1.5px;
        }

        .pay {
          width: 100%;
          min-height: 55px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 19px 0 20px;
          border: 0;
          border-radius: 14px;
          background: white;
          color: #07080b;
          font: inherit;
          font-size: 12px;
          font-weight: 850;
          cursor: pointer;
          box-shadow: 0 14px 34px rgba(0, 0, 0, 0.3);
          transition: 0.2s ease;
        }

        .pay:hover:not(:disabled) {
          transform: translateY(-2px);
          background: #eeeeee;
          box-shadow: 0 20px 42px rgba(0, 0, 0, 0.4);
        }

        .pay:disabled {
          opacity: 0.55;
          cursor: wait;
        }

        .arrow {
          font-size: 20px;
          font-weight: 500;
          transition: transform 0.2s ease;
        }

        .pay:hover:not(:disabled) .arrow {
          transform: translateX(4px);
        }

        .error {
          margin-bottom: 13px;
          padding: 10px;
          border: 1px solid rgba(255, 70, 70, 0.17);
          border-radius: 11px;
          background: rgba(255, 70, 70, 0.045);
          color: #ff9999;
          font-size: 9px;
          line-height: 1.5;
          word-break: break-word;
        }

        .security {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 19px;
          padding: 12px;
          border: 1px solid rgba(117, 228, 155, 0.08);
          border-radius: 12px;
          background: rgba(117, 228, 155, 0.022);
        }

        .securityIcon {
          width: 27px;
          height: 27px;
          flex: 0 0 27px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(117, 228, 155, 0.08);
          color: #75e49b;
          font-size: 10px;
          font-weight: 800;
        }

        .security strong,
        .security span {
          display: block;
        }

        .security strong {
          margin-bottom: 2px;
          color: rgba(255, 255, 255, 0.72);
          font-size: 9px;
        }

        .security span {
          color: rgba(255, 255, 255, 0.28);
          font-size: 8px;
        }

        .note {
          margin: 15px 0 0;
          color: rgba(255, 255, 255, 0.21);
          font-size: 8px;
          line-height: 1.55;
          text-align: center;
        }

        .trust {
          display: flex;
          justify-content: center;
          gap: 40px;
          margin-top: 23px;
          color: rgba(255, 255, 255, 0.24);
          font-size: 9px;
        }

        .trust span {
          color: rgba(255, 255, 255, 0.62);
        }

        @media (max-width: 900px) {
          .checkout {
            grid-template-columns: 1fr;
          }

          .summary {
            border-top: 1px solid rgba(255, 255, 255, 0.065);
            border-left: 0;
          }
        }

        @media (max-width: 640px) {
          .page {
            padding: 0 15px 45px;
          }

          .secureTop {
            display: none;
          }

          .heading {
            margin-top: 27px;
          }

          .heading h1 {
            font-size: 37px;
            letter-spacing: -2px;
          }

          .product,
          .summary {
            padding: 25px 20px;
          }

          .productTop {
            flex-direction: column;
            align-items: flex-start;
          }

          .logoBox {
            width: 105px;
            height: 105px;
            flex-basis: 105px;
          }

          .product h2 {
            font-size: 28px;
          }

          .details {
            grid-template-columns: 1fr;
          }

          .trust {
            flex-direction: column;
            align-items: center;
            gap: 9px;
          }
        }
      `}</style>

      <main className="page">
        <header className="top">
          <a href="/" className="brand">
            <span className="brandMark">LS</span>

            <span className="brandText">
              <strong>Link</strong>Stream
              <small className="version">2.0</small>
            </span>
          </a>

          <div className="secureTop">
            <span className="lock">⌕</span>
            <span>Pago seguro</span>
          </div>
        </header>

        <div className="container">
          <div className="heading">
            <a href="/product" className="back">
              ← Volver al producto
            </a>

            <span className="eyebrow">
              FINALIZAR COMPRA
            </span>

            <h1>Confirma tu pedido</h1>

            <p>
              Revisa los detalles antes de continuar con
              el pago seguro.
            </p>
          </div>

          <section className="checkout">
            <div className="product">
              <div className="productTop">
                <div className="logoBox">
                  {logo ? (
                    <img
                      src={logo}
                      alt={product}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "grid",
                        placeItems: "center",
                        fontSize: "50px",
                        fontWeight: 800,
                      }}
                    >
                      {product.charAt(0)}
                    </div>
                  )}
                </div>

                <div>
                  <div className="productLabel">
                    SERVICIO DIGITAL
                  </div>

                  <h2>{product}</h2>

                  <p className="description">
                    Acceso digital para disfrutar de tu
                    servicio favorito.
                  </p>

                  <div className="available">
                    <span className="dot" />
                    Disponible para activación
                  </div>
                </div>
              </div>

              <div className="line" />

              <div className="details">
                <div className="detail">
                  <span>Tipo de acceso</span>
                  <strong>{access}</strong>
                </div>

                <div className="detail">
                  <span>Duración</span>
                  <strong>{duration}</strong>
                </div>

                <div className="detail">
                  <span>Pago</span>
                  <strong>Stripe</strong>
                </div>
              </div>
            </div>

            <aside className="summary">
              <div className="summaryTitle">
                RESUMEN DEL PEDIDO
              </div>

              <div className="row">
                <span>{product}</span>
                <strong>
                  ${numericPrice.toFixed(2)} MXN
                </strong>
              </div>

              <div className="row sub">
                <span>
                  {access} · {duration}
                </span>
                <span>1 unidad</span>
              </div>

              <div className="separator" />

              <div className="total">
                <div>
                  <span className="totalLabel">
                    Total a pagar
                  </span>

                  <span className="totalCurrency">
                    MXN
                  </span>
                </div>

                <strong className="totalPrice">
                  ${numericPrice.toFixed(2)}
                </strong>
              </div>

              {error && (
                <div className="error">
                  {error}
                </div>
              )}

              <button
                type="button"
                className="pay"
                onClick={handleCheckout}
                disabled={loading}
              >
                <span>
                  {loading
                    ? "Preparando pago..."
                    : "Continuar al pago"}
                </span>

                <span className="arrow">
                  {loading ? "…" : "→"}
                </span>
              </button>

              <div className="security">
                <div className="securityIcon">
                  ✓
                </div>

                <div>
                  <strong>Pago protegido</strong>

                  <span>
                    Procesado de forma segura por Stripe
                  </span>
                </div>
              </div>

              <p className="note">
                Serás redirigido a Stripe para completar
                tu pago de forma segura.
              </p>
            </aside>
          </section>

          <div className="trust">
            <div>
              <span>✓</span> Pago seguro
            </div>

            <div>
              <span>✓</span> Protección de datos
            </div>

            <div>
              <span>✓</span> Confirmación inmediata
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            background: "#06070a",
            color: "rgba(255,255,255,.5)",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Preparando tu compra...
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
