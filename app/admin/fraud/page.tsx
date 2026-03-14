import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminFraudPage() {
  const supabase = await supabaseServer();

    const { data: users } = await supabase
        .from("profiles")
            .select("*")
                .eq("is_banned", true)
                    .order("created_at", { ascending: false });

                      const bannedUsers = users ?? [];

                        return (
                            <main style={{ padding: "40px", color: "white", maxWidth: "1100px", margin: "0 auto" }}>
                                  <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Fraude y moderación</h1>
                                        <p style={{ opacity: 0.7, marginBottom: "24px" }}>
                                                Cuentas bloqueadas y casos que requieren revisión.
                                                      </p>

                                                            <a href="/admin" style={{ color: "#9bb2ff", textDecoration: "none" }}>
                                                                    ← Volver al admin
                                                                          </a>

                                                                                <div style={{ marginTop: "24px", display: "grid", gap: "14px" }}>
                                                                                        {bannedUsers.length === 0 ? (
                                                                                                  <p style={{ opacity: 0.7 }}>No hay cuentas bloqueadas.</p>
                                                                                                          ) : (
                                                                                                                    bannedUsers.map((user: any) => (
                                                                                                                                <div
                                                                                                                                              key={user.id}
                                                                                                                                                            style={{
                                                                                                                                                                            padding: "16px",
                                                                                                                                                                                            borderRadius: "14px",
                                                                                                                                                                                                            border: "1px solid rgba(255,255,255,0.08)",
                                                                                                                                                                                                                            background: "rgba(255,255,255,0.03)",
                                                                                                                                                                                                                                          }}
                                                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                                                    <div style={{ fontWeight: 700 }}>{user.email || "Sin email"}</div>
                                                                                                                                                                                                                                                                                  <div style={{ opacity: 0.75, marginTop: "6px" }}>
                                                                                                                                                                                                                                                                                                  Rol: {user.role || "user"}
                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                              <div style={{ opacity: 0.75, marginTop: "6px", color: "#fca5a5" }}>
                                                                                                                                                                                                                                                                                                                                              Motivo: {user.banned_reason || "Sin motivo registrado"}
                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                                                  ))
                                                                                                                                                                                                                                                                                                                                                                                          )}
                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                    </main>
                                                                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                                      }