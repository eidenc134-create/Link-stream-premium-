import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

type Wallet = {
  id: string;
    available_balance?: number | null;
      pending_balance?: number | null;
        total_earned?: number | null;
          balance?: number | null;
          };

          function money(value: number | null | undefined) {
            return new Intl.NumberFormat("es-MX", {
                style: "currency",
                    currency: "USD",
                      }).format(value || 0);
                      }

                      export default async function SellerWalletPage() {
                        const supabase = createClient(
                            process.env.NEXT_PUBLIC_SUPABASE_URL!,
                                process.env.SUPABASE_SERVICE_ROLE_KEY!
                                  );

                                    const { data: wallets } = await supabase
                                        .from("wallets")
                                            .select("*")
                                                .order("id", { ascending: false });

                                                  const safeWallets: Wallet[] = wallets || [];

                                                    const totalAvailable = safeWallets.reduce(
                                                        (sum, w) => sum + Number(w.available_balance || w.balance || 0),
                                                            0
                                                              );

                                                                const totalPending = safeWallets.reduce(
                                                                    (sum, w) => sum + Number(w.pending_balance || 0),
                                                                        0
                                                                          );

                                                                            const totalEarned = safeWallets.reduce(
                                                                                (sum, w) => sum + Number(w.total_earned || w.balance || 0),
                                                                                    0
                                                                                      );

                                                                                        return (
                                                                                            <main
                                                                                                  style={{
                                                                                                          padding: "40px",
                                                                                                                  color: "white",
                                                                                                                          maxWidth: "1100px",
                                                                                                                                  margin: "0 auto",
                                                                                                                                        }}
                                                                                                                                            >
                                                                                                                                                  <h1 style={{ fontSize: "32px", fontWeight: 700, margin: 0 }}>
                                                                                                                                                          Wallet seller
                                                                                                                                                                </h1>

                                                                                                                                                                      <p style={{ marginTop: "8px", opacity: 0.6 }}>
                                                                                                                                                                              Balance, pendiente y total ganado.
                                                                                                                                                                                    </p>

                                                                                                                                                                                          <div style={{ marginTop: "18px" }}>
                                                                                                                                                                                                  <Link
                                                                                                                                                                                                            href="/seller"
                                                                                                                                                                                                                      style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "14px" }}
                                                                                                                                                                                                                              >
                                                                                                                                                                                                                                        ← Volver al panel seller
                                                                                                                                                                                                                                                </Link>
                                                                                                                                                                                                                                                      </div>

                                                                                                                                                                                                                                                            <div
                                                                                                                                                                                                                                                                    style={{
                                                                                                                                                                                                                                                                              marginTop: "24px",
                                                                                                                                                                                                                                                                                        display: "grid",
                                                                                                                                                                                                                                                                                                  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                                                                                                                                                                                                                                                                                                            gap: "16px",
                                                                                                                                                                                                                                                                                                                    }}
                                                                                                                                                                                                                                                                                                                          >
                                                                                                                                                                                                                                                                                                                                  <Metric title="Disponible" value={money(totalAvailable)} />
                                                                                                                                                                                                                                                                                                                                          <Metric title="Pendiente" value={money(totalPending)} />
                                                                                                                                                                                                                                                                                                                                                  <Metric title="Total ganado" value={money(totalEarned)} />
                                                                                                                                                                                                                                                                                                                                                        </div>
                                                                                                                                                                                                                                                                                                                                                            </main>
                                                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                                                              }

                                                                                                                                                                                                                                                                                                                                                              function Metric({ title, value }: { title: string; value: string }) {
                                                                                                                                                                                                                                                                                                                                                                return (
                                                                                                                                                                                                                                                                                                                                                                    <div
                                                                                                                                                                                                                                                                                                                                                                          style={{
                                                                                                                                                                                                                                                                                                                                                                                  border: "1px solid rgba(255,255,255,0.08)",
                                                                                                                                                                                                                                                                                                                                                                                          background: "rgba(255,255,255,0.04)",
                                                                                                                                                                                                                                                                                                                                                                                                  borderRadius: "18px",
                                                                                                                                                                                                                                                                                                                                                                                                          padding: "20px",
                                                                                                                                                                                                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                                                                                                                                                                          <div style={{ fontSize: "13px", opacity: 0.6 }}>{title}</div>
                                                                                                                                                                                                                                                                                                                                                                                                                                <div style={{ marginTop: "10px", fontSize: "28px", fontWeight: 700 }}>
                                                                                                                                                                                                                                                                                                                                                                                                                                        {value}
                                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                                    }