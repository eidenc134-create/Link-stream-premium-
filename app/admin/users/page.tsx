import { supabaseServer } from "@/lib/supabaseServer";
import AdminUsersClient from "./users-client";

export default async function AdminUsersPage() {
  const supabase = await supabaseServer();

    const { data: users } = await supabase
        .from("profiles")
            .select("*")
                .order("created_at", { ascending: false });

                  return <AdminUsersClient initialUsers={users ?? []} />;
                  }