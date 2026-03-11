export default function Success({ searchParams }: { searchParams: { orderId?: string } }) {
  return (
    <main className="center-wrap">
      <section className="card empty-state strong-card checkout-state">
        <span className="badge badge-success">Pago aprobado</span>
        <h1>Compra confirmada</h1>
        <p className="lead compact-lead">Orden: {searchParams.orderId ?? "—"}</p>
        <p className="muted">El seller recibirá la instrucción, tu pago queda protegido y el flujo continúa con trazabilidad.</p>
        <div className="form-actions" style={{ justifyContent: "center" }}>
          <a href="/dashboard" className="button button-primary">Ir al dashboard</a>
        </div>
      </section>
    </main>
  );
}
