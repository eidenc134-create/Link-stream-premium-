import Sidebar from "../components/layout/Sidebar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body style={{ display: "flex", background: "#0b0f19", color: "white" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: 24 }}>{children}</div>
      </body>
    </html>
  )
}
