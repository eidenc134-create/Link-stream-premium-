import MetricCard from "@/components/MetricCard"

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-2 gap-4">
        <MetricCard label="Ventas" value="24" />
        <MetricCard label="Usuarios" value="120" />
        <MetricCard label="Marketplace" value="24/7" />
        <MetricCard label="Checkout" value="Seguro" />
      </div>
    </main>
  )
}
