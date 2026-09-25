export default function SuccessLoading() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#080a10",
        display: "grid",
        placeItems: "center",
        color: "#fff",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 42,
            height: 42,
            margin: "0 auto 18px",
            borderRadius: "50%",
            border: "3px solid rgba(255,255,255,.12)",
            borderTopColor: "#fff",
            animation: "successSpin .8s linear infinite",
          }}
        />
        <span style={{ color: "#858d9d", fontSize: 12 }}>
          Confirmando tu pago...
        </span>
      </div>

      <style>{`
        @keyframes successSpin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
