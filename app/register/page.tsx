"use client";

import { useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase/client/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const registerGoogle = async () => {
    try {
      setLoading(true);
      setError("");

      const provider = new GoogleAuthProvider();

      await signInWithPopup(auth, provider);

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("No se pudo crear la cuenta con Google.");
    } finally {
      setLoading(false);
    }
  };

  const registerEmail = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);

      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credential.user, {
        displayName: name,
      });

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError(
        "No se pudo crear la cuenta. Verifica tus datos."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">
      <div className="register-card">

        <div className="register-logo">
          L
        </div>

        <div className="register-header">
          <h1>LinkStream <span>2.0</span></h1>
          <p>Crea tu cuenta</p>
        </div>

        <button
          type="button"
          onClick={registerGoogle}
          disabled={loading}
          className="google-register-button"
        >
          {loading
            ? "Conectando..."
            : "Registrarse con Google"}
        </button>

        <div className="register-divider">
          <span></span>
          <b>o</b>
          <span></span>
        </div>

        <form
          onSubmit={registerEmail}
          className="register-form"
        >

          <div className="register-field">
            <label>Nombre</label>

            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="register-field">
            <label>Correo electrónico</label>

            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="register-field">
            <label>Contraseña</label>

            <input
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <div className="register-field">
            <label>Confirmar contraseña</label>

            <input
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          {error && (
            <div className="register-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="register-submit"
          >
            {loading
              ? "Creando cuenta..."
              : "Crear cuenta"}
          </button>

        </form>

        <p className="register-login">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login">
            Iniciar sesión
          </a>
        </p>

      </div>
    </main>
  );
}