"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
      <div className="min-h-screen bg-black text-white">

            {/* 🔝 NAVBAR */}
                  <header className="flex justify-between items-center px-6 py-4 border-b border-white/10">

                          {/* LOGO */}
                                  <Link href="/" className="font-bold text-lg">
                                            LinkStream
                                                    </Link>

                                                            {/* NAV LINKS */}
                                                                    <nav className="flex items-center gap-4 text-sm">

                                                                              <Link
                                                                                          href="/marketplace"
                                                                                                      className="hover:text-green-400 transition"
                                                                                                                >
                                                                                                                            Marketplace
                                                                                                                                      </Link>

                                                                                                                                                <Link
                                                                                                                                                            href="/seller"
                                                                                                                                                                        className="hover:text-green-400 transition"
                                                                                                                                                                                  >
                                                                                                                                                                                              Seller
                                                                                                                                                                                                        </Link>

                                                                                                                                                                                                                  <Link
                                                                                                                                                                                                                              href="/login"
                                                                                                                                                                                                                                          className="hover:text-green-400 transition"
                                                                                                                                                                                                                                                    >
                                                                                                                                                                                                                                                                Login
                                                                                                                                                                                                                                                                          </Link>

                                                                                                                                                                                                                                                                                    {/* 🌙 Dark/Light toggle */}
                                                                                                                                                                                                                                                                                              <ThemeToggle />
                                                                                                                                                                                                                                                                                                      </nav>
                                                                                                                                                                                                                                                                                                            </header>

                                                                                                                                                                                                                                                                                                                  {/* 📦 CONTENIDO */}
                                                                                                                                                                                                                                                                                                                        <main className="p-6">{children}</main>
                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                              );
                                                                                                                                                                                                                                                                                                                              }