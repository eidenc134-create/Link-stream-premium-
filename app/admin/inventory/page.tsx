import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminInventoryPage() {
  const supabase = await supabaseServer();

    const { data: items } = await supabase
        .from("product_inventory")
            .select("*, products(title, provider, plan_name)")
                .order("created_at", { ascending: false });

                  const safeItems = items ?? [];

                    return (
                        <main className="min-h-screen bg-[#030b18] p-8 text-white">
                              <h1 className="mb-6 text-3xl font-semibold">Inventario</h1>

                                    <div className="space-y-4">
                                            {safeItems.length === 0 ? (
                                                      <p>No hay inventario todavía.</p>
                                                              ) : (
                                                                        safeItems.map((item: any) => (
                                                                                    <div
                                                                                                  key={item.id}
                                                                                                                className="rounded-xl border border-white/10 bg-white/5 p-4"
                                                                                                                            >
                                                                                                                                          <p className="font-semibold">
                                                                                                                                                          {item.products?.title || "Producto"}
                                                                                                                                                                        </p>
                                                                                                                                                                                      <p className="text-sm text-white/60">
                                                                                                                                                                                                      Proveedor: {item.products?.provider || "N/D"}
                                                                                                                                                                                                                    </p>
                                                                                                                                                                                                                                  <p className="text-sm text-white/60">
                                                                                                                                                                                                                                                  Plan: {item.products?.plan_name || "N/D"}
                                                                                                                                                                                                                                                                </p>
                                                                                                                                                                                                                                                                              <p className="text-sm text-white/60">
                                                                                                                                                                                                                                                                                              Email: {item.login_email}
                                                                                                                                                                                                                                                                                                            </p>
                                                                                                                                                                                                                                                                                                                          <p className="text-sm text-white/60">
                                                                                                                                                                                                                                                                                                                                          Estado: {item.status}
                                                                                                                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                                              ))
                                                                                                                                                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                </main>
                                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                                  }