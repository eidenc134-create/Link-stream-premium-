"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SignupPage() {
  const supabase = supabaseBrowser();

    const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
        const [msg, setMsg] = useState("");
          const [loading, setLoading] = useState(false);

            async function handleSignup(e: React.FormEvent) {
                e.preventDefault();
                    setLoading(true);
                        setMsg("");

                            try {
                                  const { error } = await supabase.auth.signUp({
                                          email,
                                                  password,
                                                        });

                                                              if (error) {
                                                                      setMsg(error.message);
                                                                            } else {
                                                                                    setMsg("Cuenta creada. Revisa tu email.");
                                                                                          }
                                                                                              } catch (err) {
                                                                                                    setMsg("Error de conexión con Supabase");
                                                                                                        }

                                                                                                            setLoading(false);
                                                                                                              }

                                                                                                                return (
                                                                                                                    <main style={{ padding: 40 }}>
                                                                                                                          <h1>Crear cuenta</h1>

                                                                                                                                <form onSubmit={handleSignup}>
                                                                                                                                        <input
                                                                                                                                                  type="email"
                                                                                                                                                            placeholder="Email"
                                                                                                                                                                      value={email}
                                                                                                                                                                                onChange={(e) => setEmail(e.target.value)}
                                                                                                                                                                                          required
                                                                                                                                                                                                  />

                                                                                                                                                                                                          <br /><br />

                                                                                                                                                                                                                  <input
                                                                                                                                                                                                                            type="password"
                                                                                                                                                                                                                                      placeholder="Contraseña"
                                                                                                                                                                                                                                                value={password}
                                                                                                                                                                                                                                                          onChange={(e) => setPassword(e.target.value)}
                                                                                                                                                                                                                                                                    required
                                                                                                                                                                                                                                                                            />

                                                                                                                                                                                                                                                                                    <br /><br />

                                                                                                                                                                                                                                                                                            <button type="submit" disabled={loading}>
                                                                                                                                                                                                                                                                                                      {loading ? "Creando..." : "Crear cuenta"}
                                                                                                                                                                                                                                                                                                              </button>
                                                                                                                                                                                                                                                                                                                    </form>

                                                                                                                                                                                                                                                                                                                          {msg && <p>{msg}</p>}
                                                                                                                                                                                                                                                                                                                              </main>
                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                }