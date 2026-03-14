import { supabaseServer } from "@/lib/supabaseServer";

function Card({ href, title }: { href: string; title: string }) {
  return (
      <a
            href={href}
                  style={{
                          display: "block",
                                  padding: "20px",
                                          borderRadius: "16px",
                                                  background: "rgba(255,255,255,0.04)",
                                                          border: "1px solid rgba(255,255,255,0.1)",
                                                                  color: "white",
                                                                          textDecoration: "none",
                                                                                  fontWeight: "600",
                                                                                        }}
                                                                                            >
                                                                                                  {title}
                                                                                                      </a>
                                                                                                        );
                                                                                                        }

                                                                                                        export default async function AdminPage() {
                                                                                                          const supabase = await supabaseServer();

                                                                                                            const { count: users } = await supabase
                                                                                                                .from("profiles")
                                                                                                                    .select("*", { count: "exact", head: true });

                                                                                                                      const { count: products } = await supabase
                                                                                                                          .from("products")
                                                                                                                              .select("*", { count: "exact", head: true });

                                                                                                                                const { count: orders } = await supabase
                                                                                                                                    .from("orders")
                                                                                                                                        .select("*", { count: "exact", head: true });

                                                                                                                                          return (
                                                                                                                                              <main style={{ padding: "40px", color: "white" }}>
                                                                                                                                                    <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
                                                                                                                                                            Admin Center
                                                                                                                                                                  </h1>

                                                                                                                                                                        <div
                                                                                                                                                                                style={{
                                                                                                                                                                                          display: "grid",
                                                                                                                                                                                                    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
                                                                                                                                                                                                              gap: "20px",
                                                                                                                                                                                                                        marginBottom: "40px",
                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                              <div>Usuarios: {users ?? 0}</div>
                                                                                                                                                                                                                                                      <div>Productos: {products ?? 0}</div>
                                                                                                                                                                                                                                                              <div>Órdenes: {orders ?? 0}</div>
                                                                                                                                                                                                                                                                    </div>

                                                                                                                                                                                                                                                                          <div
                                                                                                                                                                                                                                                                                  style={{
                                                                                                                                                                                                                                                                                            display: "grid",
                                                                                                                                                                                                                                                                                                      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                                                                                                                                                                                                                                                                                                                gap: "20px",
                                                                                                                                                                                                                                                                                                                        }}
                                                                                                                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                                                                                                                      <Card href="/admin/users" title="👥 Gestionar usuarios" />
                                                                                                                                                                                                                                                                                                                                              <Card href="/admin/products" title="🛒 Productos marketplace" />
                                                                                                                                                                                                                                                                                                                                                      <Card href="/admin/orders" title="💳 Ventas y órdenes" />
                                                                                                                                                                                                                                                                                                                                                              <Card href="/admin/fraud" title="⚠️ Fraude" />
                                                                                                                                                                                                                                                                                                                                                                      <Card href="/admin/support" title="🎫 Soporte" />
                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                </main>
                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                  }