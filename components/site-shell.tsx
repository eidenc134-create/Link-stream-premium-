import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/listings", label: "Marketplace" },
  { href: "/dashboard", label: "Control Center" },
  { href: "/seller/dashboard", label: "Seller OS" },
  { href: "/login", label: "Entrar" },
];

const statusItems = [
  "Escrow 24h",
  "Sin compartir contraseñas",
  "Pagos protegidos",
  "Modo claro/oscuro",
];

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="site-header">
        <div className="shell nav-shell">
          <a className="brand" href="/">
            <span className="brand-mark">LS</span>
            <div>
              <strong>LinkStream</strong>
              <small>Fintech SaaS para cupos digitales</small>
            </div>
          </a>

          <nav className="nav-links" aria-label="Principal">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <ThemeToggle />
            <a className="button button-ghost" href="/seller/onboarding">
              Vender
            </a>
            <a className="button button-primary" href="/signup">
              Crear cuenta
            </a>
          </div>
        </div>
      </header>

      <div className="shell status-strip" aria-label="Ventajas clave">
        {statusItems.map((item) => (
          <span key={item} className="pill subtle-pill">
            {item}
          </span>
        ))}
      </div>

      <div className="shell page-shell">{children}</div>

      <footer className="site-footer">
        <div className="shell footer-grid">
          <div>
            <strong>LinkStream</strong>
            <p>
              Una experiencia estilo fintech/SaaS para vender y comprar accesos digitales con más claridad,
              confianza y conversión.
            </p>
            <div className="stack-row" style={{ marginTop: 14 }}>
              <span className="pill">Marketplace</span>
              <span className="pill">Seller OS</span>
              <span className="pill">Checkout protegido</span>
            </div>
          </div>
          <div>
            <h4>Producto</h4>
            <a href="/listings">Explorar catálogo</a>
            <a href="/dashboard">Control center</a>
            <a href="/seller/dashboard">Seller OS</a>
          </div>
          <div>
            <h4>Infraestructura</h4>
            <span>Supabase + Mercado Pago</span>
            <span>Escrow operativo</span>
            <span>Arquitectura lista para escalar</span>
          </div>
        </div>
      </footer>
    </>
  );
}
