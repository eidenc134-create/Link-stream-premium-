export default function Sidebar() {
  return (
    <div style={{
      width: 260,
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(20px)",
      padding: 20
    }}>
      <h2>🚀 LinkStream</h2>
      <nav>
        <a href="/">Dashboard</a><br/>
        <a href="/analytics">Analytics</a><br/>
        <a href="/onboarding">Onboarding</a><br/>
        <a href="/seller/dashboard">Seller</a><br/>
        <a href="/admin">Admin</a>
      </nav>
    </div>
  )
}
