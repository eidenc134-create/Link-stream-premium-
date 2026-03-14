import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminWalletsPage() {
  const supabase = await supabaseServer();

    const { data: wallets } = await supabase
        .from("wallets")
            .select("*")
                .order("updated_at", { ascending: false });

                  const safeWallets = wallets ?? [];

                    return (
                        <main className="min-h-screen bg-[#030b18] p-8 text-white">
                              <h1 className="mb-6 text-3xl font-semibold">Wallets</h1>

                                    <div className="space-y-4">
                                            {safeWallets.length === 0 ? (
                                                      <p>No hay wallets todavía.</p>
                                                              ) : (
                                                                        safeWallets.map((wallet: any) => (
                                                                                    <div
                                                                                                  key={wallet.id}
                                                                                                                className="rounded-xl border border-white/10 bg-white/5 p-4"
                                                                                                                            >
                                                                                                                                          <p className="font-semibold">Usuario: {wallet.user_id}</p>
                                                                                                                                                        <p className="text-sm text-white/60">
                                                                                                                                                                        Pendiente: {wallet.pending_balance}
                                                                                                                                                                                      </p>
                                                                                                                                                                                                    <p className="text-sm text-white/60">
                                                                                                                                                                                                                    Disponible: {wallet.available_balance}
                                                                                                                                                                                                                                  </p>
                                                                                                                                                                                                                                                <p className="text-sm text-white/60">
                                                                                                                                                                                                                                                                Ganado total: {wallet.total_earned}
                                                                                                                                                                                                                                                                              </p>
                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                    ))
                                                                                                                                                                                                                                                                                                            )}
                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                      </main>
                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                        }