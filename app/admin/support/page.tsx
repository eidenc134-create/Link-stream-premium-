import { supabaseServer } from "@/lib/supabaseServer";

function formatDate(value?: string | null) {
  if (!value) return "N/D";
    try {
        return new Date(value).toLocaleString();
          } catch {
              return "N/D";
                }
                }

                export default async function AdminSupportPage() {
                  const supabase = await supabaseServer();

                    const { data: tickets } = await supabase
                        .from("support_tickets")
                            .select("*")
                                .order("created_at", { ascending: false });

                                  const safeTickets = tickets ?? [];

                                    return (
                                        <main style={{ padding: "40px", color: "white", maxWidth: "1100px", margin: "0 auto" }}>
                                              <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Soporte</h1>
                                                    <p style={{ opacity: 0.7, marginBottom: "24px" }}>
                                                            Tickets, errores y reportes técnicos del sistema.
                                                                  </p>

                                                                        <a href="/admin" style={{ color: "#9bb2ff", textDecoration: "none" }}>
                                                                                ← Volver al admin
                                                                                      </a>

                                                                                            <div style={{ marginTop: "24px", display: "grid", gap: "14px" }}>
                                                                                                    {safeTickets.length === 0 ? (
                                                                                                              <p style={{ opacity: 0.7 }}>No hay tickets todavía.</p>
                                                                                                                      ) : (
                                                                                                                                safeTickets.map((ticket: any) => (
                                                                                                                                            <div
                                                                                                                                                          key={ticket.id}
                                                                                                                                                                        style={{
                                                                                                                                                                                        padding: "16px",
                                                                                                                                                                                                        borderRadius: "14px",
                                                                                                                                                                                                                        border: "1px solid rgba(255,255,255,0.08)",
                                                                                                                                                                                                                                        background: "rgba(255,255,255,0.03)",
                                                                                                                                                                                                                                                      }}
                                                                                                                                                                                                                                                                  >
                                                                                                                                                                                                                                                                                <div style={{ fontWeight: 700 }}>
                                                                                                                                                                                                                                                                                                {ticket.subject || "Sin asunto"}
                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                            <div style={{ opacity: 0.75, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                                                            Estado: {ticket.status || "open"}
                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                        <div style={{ opacity: 0.75, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                                                                                                        Tipo: {ticket.type || "general"}
                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                    <div style={{ opacity: 0.6, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                    Fecha: {formatDate(ticket.created_at)}
                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ))
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                )}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }