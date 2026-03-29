import { getServerSupabase } from "@/lib/serverSupabase"

export default async function Dashboard() {
  const supabase = getServerSupabase()
  const { data } = await supabase.from("revenue").select("*")
  const total = data?.reduce((acc: number, r: any) => acc + r.amount, 0)

  return (
    <div>
      <h1>Ingresos 💰</h1>
      <h2>${total}</h2>
    </div>
  )
}
