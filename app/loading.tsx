export default function Loading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#080a10",
        color: "#fff",
        display: "grid",
        placeItems: "center",
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,.12)",
            borderTopColor: "#fff",
            animation: "spin 0.8s linear infinite",
          }}
        />

        <span
          style={{
            color: "#858d9d",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: ".5px",
          }}
        >
          LinkStream 2.0
        </span>
      </div>

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  );
}
