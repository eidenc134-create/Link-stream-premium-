"use client";

import { FormEvent, useState } from "react";
import { registerUser } from "@/lib/firebase/client/auth/actions";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const [message, setMessage] = useState("");
        const [loading, setLoading] = useState(false);

          async function handleSubmit(event: FormEvent<HTMLFormElement>) {
              event.preventDefault();

                  setMessage("");
                      setLoading(true);

                          try {
                                await registerUser(email, password);

                                      setMessage(
                                              "Cuenta creada. Revisa tu correo para verificar tu cuenta."
                                                    );

                                                          setEmail("");
                                                                setPassword("");
                                                                    } catch {
                                                                          setMessage(
                                                                                  "No se pudo crear la cuenta. Comprueba los datos e inténtalo nuevamente."
                                                                                        );
                                                                                            } finally {
                                                                                                  setLoading(false);
                                                                                                      }
                                                                                                        }

                                                                                                          return (
                                                                                                              <form onSubmit={handleSubmit}>
                                                                                                                    <input
                                                                                                                            type="email"
                                                                                                                                    placeholder="Correo electrónico"
                                                                                                                                            value={email}
                                                                                                                                                    onChange={(event) => setEmail(event.target.value)}
                                                                                                                                                            required
                                                                                                                                                                  />

                                                                                                                                                                        <input
                                                                                                                                                                                type="password"
                                                                                                                                                                                        placeholder="Contraseña"
                                                                                                                                                                                                value={password}
                                                                                                                                                                                                        onChange={(event) => setPassword(event.target.value)}
                                                                                                                                                                                                                required
                                                                                                                                                                                                                        minLength={6}
                                                                                                                                                                                                                              />

                                                                                                                                                                                                                                    <button type="submit" disabled={loading}>
                                                                                                                                                                                                                                            {loading ? "Creando cuenta..." : "Crear cuenta"}
                                                                                                                                                                                                                                                  </button>

                                                                                                                                                                                                                                                        {message && <p>{message}</p>}
                                                                                                                                                                                                                                                            </form>
                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                              }