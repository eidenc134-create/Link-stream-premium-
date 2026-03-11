"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setMsg(error.message);
    window.location.href = "/dashboard";
  }

  return (
    <main className="auth-layout">
      <section className="card strong-card auth-side">
        <span className="eyebrow">Acceso seguro</span>
        <h1 className="page-title page-title-medium">Entra a tu cuenta y retoma el control del marketplace.</h1>
        <p className="lead compact-lead">
          La interfaz de acceso ahora se siente más premium y más coherente con una plataforma SaaS moderna.
        </p>
        <div className="bullet-grid compact-bullets">
          <div className="bullet-item"><span className="bullet-dot" />Dashboard más ejecutivo</div>
          <div className="bullet-item"><span className="bullet-dot" />Seller OS más claro</div>
          <div className="bullet-item"><span className="bullet-dot" />Tema dual persistente</div>
        </div>
      </section>

      <section className="form-card strong-card auth-form-card">
        <span className="eyebrow">Bienvenido de vuelta</span>
        <h2 style={{ marginTop: 0 }}>Entrar</h2>
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
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {msg && <p className="error-text">{msg}</p>}
        <p className="helper-text">¿Aún no tienes cuenta? <a href="/signup"><strong>Créala aquí</strong></a>.</p>
      </section>
    </main>
  );
}
