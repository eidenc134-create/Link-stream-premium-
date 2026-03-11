"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null)
    setLoading(true)
    try{
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signUp({ email: email,trim(), password,
    });
    if (error)
      setMsg(error.message);
    setLoading(false);
    return;
    }
    if(!Data.user){
      setMsg("No se pudo crear la cuenta.");
      setLoading(false);
      return;
    }
    setMsg("Cuenta creada. Revisa tu correo para confirmar.");
    setLoading(false)
  }catch (err) {
    console.error(err);
    setMsg("Ocurrió un error al crear la cuenta.");
    setLoading(false);
  }
}
  return (
    <main className="auth-layout">
      <section className="card strong-card auth-side">
        <span className="eyebrow">Nueva cuenta</span>
        <h1 className="page-title page-title-medium">Crea tu acceso y entra a una experiencia de producto más premium.</h1>
        <p className="lead compact-lead">
          Registro simple, interfaz más sofisticada y una base visual lista para crecer como startup real.
        </p>
        <div className="bullet-grid compact-bullets">
          <div className="bullet-item"><span className="bullet-dot" />Compra y venta en un mismo flujo</div>
          <div className="bullet-item"><span className="bullet-dot" />Checkout protegido con Mercado Pago</div>
          <div className="bullet-item"><span className="bullet-dot" />Seller onboarding más claro</div>
        </div>
      </section>

      <section className="form-card strong-card auth-form-card">
        <span className="eyebrow">Activa tu cuenta</span>
        <h2 style={{ marginTop: 0 }}>Crear cuenta</h2>
        <form onSubmit={onSubmit} className="form-grid">
          <label className="field">
            <span>Email</span>
            <input className="input" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className="field">
            <span>Contraseña</span>
            <input className="input" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button className="button button-primary" type="submit" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        {msg && <p className="error-text">{msg}</p>}
        <p className="helper-text">¿Ya tienes cuenta? <a href="/login"><strong>Entra aquí</strong></a>.</p>
      </section>
    </main>
  );
}
