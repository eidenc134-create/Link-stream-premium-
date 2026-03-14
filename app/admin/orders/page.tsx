import { supabaseServer } from "@/lib/supabaseServer";

function formatDate(value?: string | null) {
  if (!value) return "N/D";
    try {
        return new Date(value).toLocaleString();
          } catch {
              return "N/D";
                }
                }

                export default async function AdminOrdersPage() {
                  const supabase = await supabaseServer();

                    const { data: orders } = await supabase
                        .from("orders")
                            .select("*")
                                .order("created_at", { ascending: false });

                                  const safeOrders = orders ?? [];

                                    return (
                                        <main style={{ padding: "40px", color: "white", maxWidth: "1100px", margin: "0 auto" }}>
                                              <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Ventas y órdenes</h1>
                                                    <p style={{ opacity: 0.7, marginBottom: "24px" }}>
                                                            Historial de compras y estados de órdenes.
                                                                  </p>

                                                                        <a href="/admin" style={{ color: "#9bb2ff", textDecoration: "none" }}>
                                                                                ← Volver al admin
                                                                                      </a>

                                                                                            <div style={{ marginTop: "24px", display: "grid", gap: "14px" }}>
                                                                                                    {safeOrders.length === 0 ? (
                                                                                                              <p style={{ opacity: 0.7 }}>No hay órdenes todavía.</p>
                                                                                                                      ) : (
                                                                                                                                safeOrders.map((order: any) => (
                                                                                                                                            <div
                                                                                                                                                          key={order.id}
                                                                                                                                                                        style={{
                                                                                                                                                                                        padding: "16px",
                                                                                                                                                                                                        borderRadius: "14px",
                                                                                                                                                                                                                        border: "1px solid rgba(255,255,255,0.08)",
                                                                                                                                                                                                                                        background: "rgba(255,255,255,0.03)",
                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                <div style={{ fontWeight: 700 }}>
                                                                                                                                                                                                                                                                                                Orden #{String(order.id).slice(0, 8)}
                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                            <div style={{ opacity: 0.75, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                                                            Estado: {order.status || "pending"}
                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                        <div style={{ opacity: 0.75, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                                                                                                        Monto: {order.total_amount ?? order.amount ?? order.price ?? 0}
                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                    <div style={{ opacity: 0.6, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                    Fecha: {formatDate(order.created_at)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }