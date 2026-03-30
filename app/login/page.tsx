"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
        const [errorMsg, setErrorMsg] = useState("");

          const handleLogin = async () => {
              setLoading(true);
                  setErrorMsg("");

                      const { error } = await supabase.auth.signInWithPassword({
                            email,
                                  password,
                                      });

                                          if (error) {
                                                setErrorMsg("Correo o contraseña incorrectos");
                                                      setLoading(false);
                                                          } else {
                                                                window.location.href = "/";
                                                                    }
                                                                      };

                                                                        return (
                                                                            <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

                                                                                  <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">

                                                                                          {/* HEADER */}
                                                                                                  <h1 className="text-2xl font-bold text-center mb-2">
                                                                                                            Bienvenido de nuevo 👋
                                                                                                                    </h1>

                                                                                                                            <p className="text-center text-white/60 mb-6 text-sm">
                                                                                                                                      Inicia sesión para continuar
                                                                                                                                              </p>

                                                                                                                                                      {/* ERROR */}
                                                                                                                                                              {errorMsg && (
                                                                                                                                                                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-2 rounded mb-4 text-center">
                                                                                                                                                                                    {errorMsg}
                                                                                                                                                                                              </div>
                                                                                                                                                                                                      )}

                                                                                                                                                                                                              {/* EMAIL */}
                                                                                                                                                                                                                      <input
                                                                                                                                                                                                                                type="email"
                                                                                                                                                                                                                                          placeholder="Correo electrónico"
                                                                                                                                                                                                                                                    value={email}
                                                                                                                                                                                                                                                              onChange={(e) => setEmail(e.target.value)}
                                                                                                                                                                                                                                                                        className="w-full mb-3 p-3 bg-black/40 border border-white/10 rounded-lg outline-none focus:border-green-400 transition"
                                                                                                                                                                                                                                                                                />

                                                                                                                                                                                                                                                                                        {/* PASSWORD */}
                                                                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                                                                          type="password"
                                                                                                                                                                                                                                                                                                                    placeholder="Contraseña"
                                                                                                                                                                                                                                                                                                                              value={password}
                                                                                                                                                                                                                                                                                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                                                                                                                                                                                                                                                                                                  className="w-full mb-4 p-3 bg-black/40 border border-white/10 rounded-lg outline-none focus:border-green-400 transition"
                                                                                                                                                                                                                                                                                                                                                          />

                                                                                                                                                                                                                                                                                                                                                                  {/* BOTÓN */}
                                                                                                                                                                                                                                                                                                                                                                          <button
                                                                                                                                                                                                                                                                                                                                                                                    onClick={handleLogin}
                                                                                                                                                                                                                                                                                                                                                                                              disabled={loading}
                                                                                                                                                                                                                                                                                                                                                                                                        className="w-full bg-gradient-to-r from-green-400 to-emerald-500 py-3 rounded-lg font-semibold hover:scale-105 transition"
                                                                                                                                                                                                                                                                                                                                                                                                                >
                                                                                                                                                                                                                                                                                                                                                                                                                          {loading ? "Entrando..." : "Iniciar sesión"}
                                                                                                                                                                                                                                                                                                                                                                                                                                  </button>

                                                                                                                                                                                                                                                                                                                                                                                                                                          {/* LINK REGISTER */}
                                                                                                                                                                                                                                                                                                                                                                                                                                                  <p className="text-center text-white/50 text-sm mt-4">
                                                                                                                                                                                                                                                                                                                                                                                                                                                            ¿No tienes cuenta?{" "}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                      <a href="/signup" className="text-green-400 hover:underline">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  Crear cuenta
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </a>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </p>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }