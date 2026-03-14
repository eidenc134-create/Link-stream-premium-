import { supabaseServer } from "@/lib/supabaseServer";
import AdminUsersClient from "./users-client";

export default async function AdminUsersPage() {
  const supabase = await supabaseServer();

      const { data: users } = await supabase
              .from("profiles")
                          .select("*")
                                          .order("created_at", { ascending: false });

                                                            return (
                                                                                  <div style={{ padding: "40px", color: "white" }}>
                                                                                                              <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
                                                                                                                                                  Gestión de usuarios
                                                                                                                                                                                            </h1>

                                                                                                                                                                                                                                            <AdminUsersClient initialUsers={users ?? []} />
                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                                                                            }