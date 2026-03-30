"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
    const [open, setOpen] = useState(false);

      useEffect(() => {
          const getUser = async () => {
                const {
                        data: { session },
                              } = await supabase.auth.getSession();

                                    setUser(session?.user ?? null);
                                        };

                                            getUser();
                                              }, []);

                                                const handleLogout = async () => {
                                                    await supabase.auth.signOut();
                                                        location.reload();
                                                          };

                                                            return (
                                                                <nav className="flex justify-between items-center px-6 py-4 border-b border-zinc-800 bg-black sticky top-0 z-50">

                                                                      <h1 className="text-xl font-bold">LinkStream</h1>

                                                                            <div className="flex items-center gap-6 text-sm text-gray-300">

                                                                                    <Link href="/marketplace">Marketplace</Link>

                                                                                            {user && <Link href="/seller">Seller</Link>}

                                                                                                    {!user ? (
                                                                                                              <>
                                                                                                                          <Link href="/login">Login</Link>
                                                                                                                                      <Link href="/signup">Signup</Link>
                                                                                                                                                </>
                                                                                                                                                        ) : (
                                                                                                                                                                  <div className="relative">
                                                                                                                                                                              <button
                                                                                                                                                                                            onClick={() => setOpen(!open)}
                                                                                                                                                                                                          className="w-9 h-9 rounded-full bg-green-400 text-black font-bold"
                                                                                                                                                                                                                      >
                                                                                                                                                                                                                                    {user.email?.charAt(0).toUpperCase()}
                                                                                                                                                                                                                                                </button>

                                                                                                                                                                                                                                                            {open && (
                                                                                                                                                                                                                                                                          <div className="absolute right-0 mt-2 w-40 bg-zinc-900 border rounded-lg p-2">
                                                                                                                                                                                                                                                                                          <p className="text-xs text-gray-400">{user.email}</p>

                                                                                                                                                                                                                                                                                                          <Link href="/dashboard">Dashboard</Link>
                                                                                                                                                                                                                                                                                                                          <Link href="/seller">Seller</Link>

                                                                                                                                                                                                                                                                                                                                          <button onClick={handleLogout} className="text-red-400">
                                                                                                                                                                                                                                                                                                                                                            Logout
                                                                                                                                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                                                                                                                                                                                                      )}
                                                                                                                                                                                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                                                                                                                                                                                        )}
                                                                                                                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                  </nav>
                                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                                    }