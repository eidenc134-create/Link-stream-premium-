type Props = { label: string; value: string | number }

export default function MetricCard({ label, value }: Props) {
  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.1)",
      padding: 16,
      borderRadius: 12,
      background: "rgba(255,255,255,0.03)"
    }}>
      <p>{label}</p>
      <h2>{value}</h2>
    </div>
  )
}
