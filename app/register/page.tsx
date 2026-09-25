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
      console.error("Error registrando con Google:", err);
      setError("No se pudo crear la cuenta con Google.");
    } finally {
      setLoading(false);
    }
  };

  const registerEmail = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      setError("Escribe tu nombre.");
      return;
    }

    if (!cleanEmail) {
      setError("Escribe tu correo electrónico.");
      return;
    }

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
        cleanEmail,
        password
      );

      await updateProfile(credential.user, {
        displayName: cleanName,
      });

      window.location.href = "/";
    } catch (err) {
      console.error("Error creando cuenta:", err);

      const firebaseError = err as {
        code?: string;
      };

      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          setError("Este correo ya está registrado.");
          break;

        case "auth/invalid-email":
          setError("El correo electrónico no es válido.");
          break;

        case "auth/weak-password":
          setError("La contraseña es demasiado débil.");
          break;

        case "auth/network-request-failed":
          setError(
            "No se pudo conectar con Firebase. Inténtalo nuevamente."
          );
          break;

        default:
          setError(
            "No se pudo crear la cuenta. Verifica tus datos."
          );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page">

      <div className="register-background" />

      <div className="register-card">

        {/* =================================================
            MARCA
        ================================================== */}

        <header className="register-header">

          <div className="register-logo">
            <span>L</span>
          </div>

          <div className="register-brand">
            <h1>
              Link<span>Stream</span>
              <small>2.0</small>
            </h1>

            <p>
              EL PARAÍSO DEL ENTRETENIMIENTO DIGITAL
            </p>
          </div>

        </header>


        {/* =================================================
            TÍTULO
        ================================================== */}

        <div className="register-intro">

          <h2>
            Crea tu cuenta
          </h2>

          <p>
            Disfruta de todo el entretenimiento
            en un solo lugar.
          </p>

        </div>


        {/* =================================================
            GOOGLE
        ================================================== */}

        <button
          type="button"
          onClick={registerGoogle}
          disabled={loading}
          className="google-register-button"
        >
          <span className="google-register-icon">
            G
          </span>

          <span>
            {loading
              ? "Conectando..."
              : "Continuar con Google"}
          </span>
        </button>


        {/* =================================================
            DIVISOR
        ================================================== */}

        <div className="register-divider">
          <span />
          <b>o</b>
          <span />
        </div>


        {/* =================================================
            FORMULARIO
        ================================================== */}

        <form
          onSubmit={registerEmail}
          className="register-form"
        >

          <div className="register-field">

            <label htmlFor="register-name">
              Nombre
            </label>

            <input
              id="register-name"
              name="name"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              autoComplete="name"
              required
              disabled={loading}
            />

          </div>


          <div className="register-field">

            <label htmlFor="register-email">
              Correo electrónico
            </label>

            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
              disabled={loading}
            />

          </div>


          <div className="register-field">

            <label htmlFor="register-password">
              Contraseña
            </label>

            <input
              id="register-password"
              name="password"
              type="password"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="new-password"
              minLength={6}
              required
              disabled={loading}
            />

            <small>
              Usa al menos 6 caracteres.
            </small>

          </div>


          <div className="register-field">

            <label htmlFor="register-confirm-password">
              Confirmar contraseña
            </label>

            <input
              id="register-confirm-password"
              name="confirmPassword"
              type="password"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              autoComplete="new-password"
              minLength={6}
              required
              disabled={loading}
            />

          </div>


          {/* ERROR */}

          {error && (
            <div
              className="register-error"
              role="alert"
            >
              <span>!</span>
              <p>{error}</p>
            </div>
          )}


          {/* BOTÓN */}

          <button
            type="submit"
            disabled={loading}
            className="register-submit"
          >
            {loading
              ? "Creando cuenta..."
              : "Crear cuenta"}

            {!loading && (
              <span aria-hidden="true">
                →
              </span>
            )}
          </button>

        </form>


        {/* =================================================
            LOGIN
        ================================================== */}

        <p className="register-login">

          <span>
            ¿Ya tienes una cuenta?
          </span>{" "}

          <a href="/login">
            Iniciar sesión
          </a>

        </p>


        {/* =================================================
            SEGURIDAD
        ================================================== */}

        <div className="register-security">

          <span>🔒</span>

          <p>
            Tus datos están protegidos
            y tu información permanece segura.
          </p>

        </div>

      </div>

    </main>
  );
}
