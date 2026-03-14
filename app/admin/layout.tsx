import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminLayout({
  children,
  }: {
    children: React.ReactNode;
    }) {
      const supabase = supabaseServer();

        const {
            data: { user },
              } = await supabase.auth.getUser();

                if (!user?.email) {
                    redirect("/login");
                      }

                        const { data: profile } = await supabase
                            .from("profiles")
                                .select("role,email")
                                    .eq("email", user.email)
                                        .single();

                                          if (!profile || !["admin", "super_admin"].includes(profile.role)) {
                                              redirect("/dashboard");
                                                }

                                                  return <>{children}</>;
                                                  }