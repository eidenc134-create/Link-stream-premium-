export default function Failure({ searchParams }: { searchParams: { orderId?: string } }) {
  return (
    <main className="center-wrap">
      <section className="card empty-state strong-card checkout-state">
        <span className="badge badge-danger">Pago fallido</span>
        <h1>No pudimos completar el pago</h1>
        <p className="lead compact-lead">Orden: {searchParams.orderId ?? "—"}</p>
        <p className="muted">Puedes volver a intentar con otro método o regresar al marketplace para comparar opciones.</p>
        <div className="form-actions" style={{ justifyContent: "center" }}>
          <a href="/listings" className="button button-primary">Volver a intentar</a>
        </div>
      </section>
    </main>
  );
}
