export default function Pending({ searchParams }: { searchParams: { orderId?: string } }) {
  return (
    <main className="center-wrap">
      <section className="card empty-state strong-card checkout-state">
        <span className="badge badge-warning">Pago pendiente</span>
        <h1>Estamos validando la operación</h1>
        <p className="lead compact-lead">Orden: {searchParams.orderId ?? "—"}</p>
        <p className="muted">Si pagaste por SPEI u OXXO, la confirmación puede tardar un poco. Tu reserva se mantiene temporalmente.</p>
        <div className="form-actions" style={{ justifyContent: "center" }}>
          <a href="/dashboard" className="button button-primary">Ir al dashboard</a>
        </div>
      </section>
    </main>
  );
}
