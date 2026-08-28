"use client";

import { useState, type FormEvent } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginGoogle = async () => {
    try {
      setLoading(true);
      setError("");

      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("No se pudo iniciar sesión con Google.");
    } finally {
      setLoading(false);
    }
  };

  const loginEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await signInWithEmailAndPassword(auth, email, password);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("Correo o contraseña incorrectos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(circle at top, #24113f 0%, #0b0710 35%, #050507 100%)",
        padding: "24px",
        boxSizing: "border-box",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          background: "rgba(255,255,255,0.055)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "24px",
          padding: "36px",
          boxSizing: "border-box",
          boxShadow:
            "0 25px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
          backdropFilter: "blur(18px)",
        }}
      >
        {/* LOGO / TÍTULO */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 18px",
              borderRadius: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background:
                "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #4c1d95 100%)",
              boxShadow: "0 12px 35px rgba(124,58,237,0.35)",
              fontSize: "30px",
              fontWeight: 800,
            }}
          >
            L
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            LinkStream <span style={{ color: "#a78bfa" }}>2.0</span>
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              color: "rgba(255,255,255,0.55)",
              fontSize: "15px",
            }}
          >
            Inicia sesión para continuar
          </p>
        </div>

        {/* GOOGLE */}
        <button
          type="button"
          onClick={loginGoogle}
          disabled={loading}
          style={{
            width: "100%",
            height: "50px",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "12px",
            background: "rgba(255,255,255,0.96)",
            color: "#111",
            fontSize: "15px",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "0.2s",
          }}
        >
          {loading ? "Conectando..." : "Continuar con Google"}
        </button>

        {/* SEPARADOR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "24px 0",
          }}
        >
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          />

          <span
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "13px",
            }}
          >
            o
          </span>

          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          />
        </div>

        {/* FORMULARIO */}
        <form onSubmit={loginEmail}>
          <div style={{ marginBottom: "14px" }}>
            <label
              htmlFor="email"
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Correo electrónico
            </label>

            <input
              id="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                height: "50px",
                padding: "0 15px",
                boxSizing: "border-box",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                outline: "none",
                background: "rgba(0,0,0,0.3)",
                color: "white",
                fontSize: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "14px" }}>
            <label
              htmlFor="password"
              style={{
                display: "block",
                marginBottom: "7px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Contraseña
            </label>

            <input
              id="password"
              type="password"
              placeholder="Tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                height: "50px",
                padding: "0 15px",
                boxSizing: "border-box",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)",
                outline: "none",
                background: "rgba(0,0,0,0.3)",
                color: "white",
                fontSize: "15px",
              }}
            />
          </div>

          {/* ERROR */}
          {error && (
            <div
              style={{
                margin: "12px 0",
                padding: "12px",
                borderRadius: "10px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#f87171",
                fontSize: "13px",
              }}
            >
              {error}
            </div>
          )}

          {/* INICIAR SESIÓN */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: "50px",
              marginTop: "8px",
              border: "none",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)",
              color: "white",
              fontSize: "15px",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1,
              boxShadow: "0 10px 25px rgba(109,40,217,0.25)",
            }}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>

        {/* REGISTRO */}
        <p
          style={{
            margin: "24px 0 0",
            textAlign: "center",
            color: "rgba(255,255,255,0.45)",
            fontSize: "14px",
          }}
        >
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            style={{
              color: "#a78bfa",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Crear cuenta
          </a>
        </p>
      </div>
    </main>
  );
}
