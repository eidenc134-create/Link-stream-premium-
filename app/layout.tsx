import type { Metadata } from "next";
import "./globals.css";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: "LinkStream | Fintech SaaS Premium",
  description:
    "Marketplace premium para accesos digitales con una experiencia fintech, dashboards elegantes, checkout protegido y modo claro/oscuro.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const saved = localStorage.getItem('theme');
                const theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.dataset.theme = theme;
              } catch (_) {}
            })();`,
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
