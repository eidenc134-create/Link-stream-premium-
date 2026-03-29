import MetricCard from "@/components/ui/MetricCard"
import Chart from "@/components/dashboard/Chart"

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <MetricCard label="Ventas" value={120} />
        <MetricCard label="Usuarios" value={45} />
      </div>
      <Chart />
    </div>
  )
}
