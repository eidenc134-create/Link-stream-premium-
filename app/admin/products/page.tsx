import { supabaseServer } from "@/lib/supabaseServer";

function formatDate(value?: string | null) {
  if (!value) return "N/D";
    try {
        return new Date(value).toLocaleString();
          } catch {
              return "N/D";
                }
                }

                export default async function AdminProductsPage() {
                  const supabase = await supabaseServer();

                    const { data: products } = await supabase
                        .from("products")
                            .select("*")
                                .order("created_at", { ascending: false });

                                  const safeProducts = products ?? [];

                                    return (
                                        <main style={{ padding: "40px", color: "white", maxWidth: "1100px", margin: "0 auto" }}>
                                              <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Productos marketplace</h1>
                                                    <p style={{ opacity: 0.7, marginBottom: "24px" }}>
                                                            Revisión general del catálogo de productos.
                                                                  </p>

                                                                        <a href="/admin" style={{ color: "#9bb2ff", textDecoration: "none" }}>
                                                                                ← Volver al admin
                                                                                      </a>

                                                                                            <div style={{ marginTop: "24px", display: "grid", gap: "14px" }}>
                                                                                                    {safeProducts.length === 0 ? (
                                                                                                              <p style={{ opacity: 0.7 }}>No hay productos todavía.</p>
                                                                                                                      ) : (
                                                                                                                                safeProducts.map((product: any) => (
                                                                                                                                            <div
                                                                                                                                                          key={product.id}
                                                                                                                                                                        style={{
                                                                                                                                                                                        padding: "16px",
                                                                                                                                                                                                        borderRadius: "14px",
                                                                                                                                                                                                                        border: "1px solid rgba(255,255,255,0.08)",
                                                                                                                                                                                                                                        background: "rgba(255,255,255,0.03)",
                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                <div style={{ fontWeight: 700 }}>
                                                                                                                                                                                                                                                                                                {product.title || product.name || "Producto sin nombre"}
                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                            <div style={{ opacity: 0.75, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                                                            Estado: {product.status || "draft"}
                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                        <div style={{ opacity: 0.75, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                                                                                                        Precio: {product.price ?? product.amount ?? 0}
                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                    <div style={{ opacity: 0.6, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                    Fecha: {formatDate(product.created_at)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }