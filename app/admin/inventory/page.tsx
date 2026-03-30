import { createClient } from "@supabase/supabase-js"

export default async function InventoryPage() {

  const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
            )

              const { data: inventory } = await supabase
                  .from("inventory")
                      .select(`
                            id,
                                  account_email,
                                        status,
                                              products (
                                                      title
                                                            )
                                                                `)
                                                                    .order("created_at", { ascending: false })

                                                                      return (
                                                                          <main style={{ padding: "32px", color: "white" }}>
                                                                                <h1>Inventario</h1>

                                                                                      <table style={{ width: "100%", marginTop: "20px" }}>
                                                                                              <thead>
                                                                                                        <tr>
                                                                                                                    <th>Producto</th>
                                                                                                                                <th>Email</th>
                                                                                                                                            <th>Status</th>
                                                                                                                                                      </tr>
                                                                                                                                                              </thead>

                                                                                                                                                                      <tbody>
                                                                                                                                                                                {inventory?.map((item:any) => (
                                                                                                                                                                                            <tr key={item.id}>
                                                                                                                                                                                                          <td>{item.products?.title}</td>
                                                                                                                                                                                                                        <td>{item.account_email}</td>
                                                                                                                                                                                                                                      <td>{item.status}</td>
                                                                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                                                                            ))}
                                                                                                                                                                                                                                                                    </tbody>

                                                                                                                                                                                                                                                                          </table>

                                                                                                                                                                                                                                                                              </main>
                                                                                                                                                                                                                                                                                )
                                                                                                                                                                                                                                                                                }