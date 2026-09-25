"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "@/lib/firebase/client/auth/actions";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Escribe tu nombre.");
      return;
    }

    if (!email.trim()) {
      setError("Escribe tu correo electrónico.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        name,
        email,
        password,
      });

      // Por ahora solamente vamos a la cuenta.
      // La verificación de correo la agregaremos en el Paso 2.
      router.push("/account");
    } catch (err: unknown) {
      console.error("Error al registrar usuario:", err);

      const firebaseError = err as {
        code?: string;
        message?: string;
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
          setError("No se pudo conectar con Firebase. Inténtalo nuevamente.");
          break;

        default:
          setError(
            firebaseError.message ||
              "No se pudo crear la cuenta. Inténtalo nuevamente."
          );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <div className="form-group">
        <label htmlFor="name">Nombre</label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Tu nombre"
          autoComplete="name"
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo electrónico</label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@correo.com"
          autoComplete="email"
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Mínimo 6 caracteres"
          autoComplete="new-password"
          disabled={loading}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmar contraseña</label>

        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Repite tu contraseña"
          autoComplete="new-password"
          disabled={loading}
          required
        />
      </div>

      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} className="register-button">
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>
    </form>
  );
}