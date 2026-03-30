"use client";

import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<any>(null);

    // 🔥 CATÁLOGO COMPLETO
      const streaming = [
          { name: "Netflix", logo: "/logos/netflix.jpg" },
              { name: "Disney+", logo: "/logos/disney.jpg" },
                  { name: "Prime Video", logo: "/logos/primevideo.jpg" },
                      { name: "HBO Max", logo: "/logos/hbo.jpg" },
                          { name: "Paramount+", logo: "/logos/paramount.jpg" },
                              { name: "VIX", logo: "/logos/vix.jpg" },
                                  { name: "Crunchyroll", logo: "/logos/crunchyroll.jpg" },
                                      { name: "Tubi", logo: "/logos/tubi.jpg" },
                                          { name: "Pluto TV", logo: "/logos/pluto.jpg" },
                                              { name: "Plex", logo: "/logos/plex.jpg" },
                                                ];

                                                  const music = [
                                                      { name: "Spotify", logo: "/logos/spotify.jpg" },
                                                          { name: "Apple Music", logo: "/logos/applemusic.jpg" },
                                                              { name: "YouTube Music", logo: "/logos/youtubemusic.jpg" },
                                                                  { name: "Deezer", logo: "/logos/deezer.jpg" },
                                                                      { name: "Amazon Music", logo: "/logos/amazonmusic.jpg" },
                                                                        ];

                                                                          const gaming = [
                                                                              { name: "PlayStation", logo: "/logos/playstation.jpg" },
                                                                                  { name: "Xbox", logo: "/logos/xbox.jpg" },
                                                                                    ];

                                                                                      // 💎 CARD PRO
                                                                                        const Card = ({ item }: any) => (
                                                                                            <div className="min-w-[130px] bg-zinc-900 rounded-2xl p-4 text-center hover:scale-105 hover:bg-zinc-800 transition duration-300 shadow-lg">

                                                                                                  <div className="w-full h-16 flex items-center justify-center mb-2">
                                                                                                          <img
                                                                                                                    src={item.logo}
                                                                                                                              alt={item.name}
                                                                                                                                        className="max-h-14 object-contain"
                                                                                                                                                  onError={(e) => {
                                                                                                                                                              e.currentTarget.src = "/logos/default.png";
                                                                                                                                                                        }}
                                                                                                                                                                                />
                                                                                                                                                                                      </div>

                                                                                                                                                                                            <p className="text-sm text-gray-200">{item.name}</p>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                  );

                                                                                                                                                                                                    return (
                                                                                                                                                                                                        <main className="min-h-screen bg-black text-white px-4 py-8">

                                                                                                                                                                                                              {/* 🔥 HERO CENTRADO */}
                                                                                                                                                                                                                    <section className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                                                                                                                                                                                                                            <h1 className="text-4xl font-bold leading-tight">
                                                                                                                                                                                                                                      El paraíso del entretenimiento digital
                                                                                                                                                                                                                                              </h1>

                                                                                                                                                                                                                                                      <p className="text-gray-400 text-lg">
                                                                                                                                                                                                                                                                Compra, vende y escala cuentas premium en segundos
                                                                                                                                                                                                                                                                        </p>
                                                                                                                                                                                                                                                                              </section>

                                                                                                                                                                                                                                                                                    {/* 🎬 STREAMING */}
                                                                                                                                                                                                                                                                                          <section className="mb-10">
                                                                                                                                                                                                                                                                                                  <h2 className="text-xl mb-4">🎬 Streaming</h2>

                                                                                                                                                                                                                                                                                                          <div className="flex gap-4 overflow-x-auto pb-2">
                                                                                                                                                                                                                                                                                                                    {streaming.map((item) => (
                                                                                                                                                                                                                                                                                                                                <Card key={item.name} item={item} />
                                                                                                                                                                                                                                                                                                                                          ))}
                                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                                        </section>

                                                                                                                                                                                                                                                                                                                                                              {/* 🎵 MÚSICA */}
                                                                                                                                                                                                                                                                                                                                                                    <section className="mb-10">
                                                                                                                                                                                                                                                                                                                                                                            <h2 className="text-xl mb-4">🎵 Música</h2>

                                                                                                                                                                                                                                                                                                                                                                                    <div className="flex gap-4 overflow-x-auto pb-2">
                                                                                                                                                                                                                                                                                                                                                                                              {music.map((item) => (
                                                                                                                                                                                                                                                                                                                                                                                                          <Card key={item.name} item={item} />
                                                                                                                                                                                                                                                                                                                                                                                                                    ))}
                                                                                                                                                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                  </section>

                                                                                                                                                                                                                                                                                                                                                                                                                                        {/* 🎮 GAMING */}
                                                                                                                                                                                                                                                                                                                                                                                                                                              <section className="mb-10">
                                                                                                                                                                                                                                                                                                                                                                                                                                                      <h2 className="text-xl mb-4">🎮 Gaming</h2>

                                                                                                                                                                                                                                                                                                                                                                                                                                                              <div className="flex gap-4">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        {gaming.map((item) => (
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    <Card key={item.name} item={item} />
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              ))}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </section>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                </main>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  );
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  }