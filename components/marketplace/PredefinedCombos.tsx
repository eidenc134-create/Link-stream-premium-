"use client";

import { useState } from "react";

type Combo = {
  id: string;
  category: string;
  name: string;
  description: string;
  products: string[];
  price: number;
  popular?: boolean;
};

const combos: Combo[] = [
  {
    id: "economico-netflix-crunchyroll",
    category: "Económico",
    name: "Netflix + Crunchyroll",
    description: "Entretenimiento y anime en un solo combo.",
    products: ["Netflix", "Crunchyroll"],
    price: 80,
  },
  {
    id: "economico-hbo-paramount",
    category: "Económico",
    name: "HBO Max + Paramount+",
    description: "Películas, series y contenido exclusivo.",
    products: ["HBO Max", "Paramount+"],
    price: 70,
  },
  {
    id: "economico-hbo-vix",
    category: "Económico",
    name: "HBO Max + ViX",
    description: "Series premium y entretenimiento latino.",
    products: ["HBO Max", "ViX"],
    price: 70,
  },
  {
    id: "basico-netflix-hbo",
    category: "Básico",
    name: "Netflix + HBO Max",
    description: "Dos de las plataformas favoritas en un solo combo.",
    products: ["Netflix", "HBO Max"],
    price: 90,
    popular: true,
  },
  {
    id: "basico-netflix-vix",
    category: "Básico",
    name: "Netflix + ViX",
    description: "Series, películas y contenido latino.",
    products: ["Netflix", "ViX"],
    price: 90,
  },
  {
    id: "basico-prime-hbo-vix",
    category: "Básico",
    name: "Prime + HBO Max + ViX",
    description: "Más contenido por un solo precio.",
    products: ["Prime Video", "HBO Max", "ViX"],
    price: 110,
  },
  {
    id: "premium-netflix-disney",
    category: "Premium",
    name: "Netflix + Disney+",
    description: "Un combo ideal para toda la familia.",
    products: ["Netflix", "Disney+"],
    price: 100,
    popular: true,
  },
  {
    id: "premium-netflix-prime",
    category: "Premium",
    name: "Netflix + Prime Video",
    description: "Series, películas y entretenimiento sin parar.",
    products: ["Netflix", "Prime Video"],
    price: 100,
  },
  {
    id: "premium-netflix-hbo-vix",
    category: "Premium",
    name: "Netflix + HBO Max + ViX",
    description: "Tres plataformas para ampliar tu entretenimiento.",
    products: ["Netflix", "HBO Max", "ViX"],
    price: 120,
  },
  {
    id: "premium-netflix-disney-paramount",
    category: "Premium",
    name: "Netflix + Disney+ + Paramount+",
    description: "Una selección premium para toda la familia.",
    products: ["Netflix", "Disney+", "Paramount+"],
    price: 125,
  },
  {
    id: "full-netflix-hbo-disney",
    category: "Full",
    name: "Netflix + HBO Max + Disney+",
    description: "Una combinación completa de entretenimiento.",
    products: ["Netflix", "HBO Max", "Disney+"],
    price: 130,
    popular: true,
  },
  {
    id: "full-netflix-prime-hbo",
    category: "Full",
    name: "Netflix + Prime + HBO Max",
    description: "Tres grandes plataformas en un solo combo.",
    products: ["Netflix", "Prime Video", "HBO Max"],
    price: 130,
  },
  {
    id: "full-netflix-disney-crunchyroll-hbo",
    category: "Full",
    name: "Netflix + Disney+ + Crunchyroll + HBO Max",
    description: "Series, películas, anime y contenido familiar.",
    products: ["Netflix", "Disney+", "Crunchyroll", "HBO Max"],
    price: 155,
  },
  {
    id: "full-netflix-disney-paramount-vix",
    category: "Full",
    name: "Netflix + Disney+ + Paramount+ + ViX",
    description: "Cuatro plataformas para maximizar tu entretenimiento.",
    products: ["Netflix", "Disney+", "Paramount+", "ViX"],
    price: 150,
  },
  {
    id: "vip-netflix-disney-hbo-paramount-crunchyroll",
    category: "VIP",
    name: "Full Entertainment",
    description: "Cinco plataformas premium en un solo combo.",
    products: [
      "Netflix",
      "Disney+",
      "HBO Max",
      "Paramount+",
      "Crunchyroll",
    ],
    price: 180,
    popular: true,
  },
  {
    id: "vip-netflix-disney-prime-hbo-vix",
    category: "VIP",
    name: "Entertainment Plus",
    description: "Una experiencia completa para disfrutar más contenido.",
    products: ["Netflix", "Disney+", "Prime Video", "HBO Max", "ViX"],
    price: 190,
  },
  {
    id: "vip-six-platforms",
    category: "VIP",
    name: "Full Entertainment 6",
    description: "Seis plataformas para una experiencia de entretenimiento total.",
    products: [
      "Netflix",
      "Disney+",
      "HBO Max",
      "Prime Video",
      "Paramount+",
      "Crunchyroll",
    ],
    price: 220,
  },
  {
    id: "vip-completo",
    category: "VIP",
    name: "Full Entertainment — 6 plataformas",
    description: "El paquete más completo de LinkStream.",
    products: [
      "Netflix",
      "Disney+",
      "HBO Max",
      "Prime Video",
      "Paramount+",
      "Crunchyroll",
    ],
    price: 250,
  },
];

const logos: Record<string, string> = {
  Netflix: "/logos/netflix.jpg",
  "Disney+": "/logos/disney-plus.jpg",
  "HBO Max": "/logos/hbo-max.jpg",
  "Paramount+": "/logos/paramount-plus.jpg",
  "Prime Video": "/logos/prime-video.jpg",
  ViX: "/logos/vix.png",
  Crunchyroll: "/logos/crunchyroll.jpg",
};

const categories = ["Todos", "Económico", "Básico", "Premium", "Full", "VIP"];

export default function PredefinedCombos() {
  const [category, setCategory] = useState("Todos");

  const filteredCombos =
    category === "Todos"
      ? combos
      : combos.filter((combo) => combo.category === category);

  return (
    <section className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-black/60 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-yellow-500/5 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-7">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-400">
            <span>✦</span>
            Combos LinkStream
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Elige tu combo
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
            Combos preparados para que disfrutes más plataformas por un mejor
            precio.
          </p>
        </div>

        <div className="mb-7 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => {
            const active = category === item;

            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={[
                  "shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition-all",
                  active
                    ? "border-yellow-400 bg-yellow-400 text-black"
                    : "border-white/10 bg-white/[0.03] text-white/55 hover:border-yellow-400/30 hover:text-white",
                ].join(" ")}
              >
                {item}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredCombos.map((combo) => (
            <article
              key={combo.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-white/[0.045]"
            >
              {combo.popular && (
                <div className="absolute right-3 top-3 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-yellow-400">
                  Popular
                </div>
              )}

              <div className="mb-4 flex items-center gap-2">
                {combo.products.slice(0, 5).map((product) => (
                  <img
                    key={product}
                    src={logos[product] ?? "/logos/netflix.jpg"}
                    alt=""
                    className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10"
                  />
                ))}

                {combo.products.length > 5 && (
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-xs font-bold text-white/50">
                    +{combo.products.length - 5}
                  </span>
                )}
              </div>

              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-yellow-400/70">
                {combo.category}
              </div>

              <h3 className="pr-16 text-base font-black text-white">
                {combo.name}
              </h3>

              <p className="mt-2 min-h-[42px] text-xs leading-5 text-white/45">
                {combo.description}
              </p>

              <div className="mt-5 flex items-end justify-between gap-3">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-white/30">
                    Desde
                  </span>

                  <span className="text-2xl font-black text-yellow-400">
                    ${combo.price}
                  </span>

                  <span className="ml-1 text-xs font-semibold text-white/35">
                    MXN
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams({
                      products: combo.products.join(","),
                      price: String(combo.price),
                      combo: combo.id,
                      duration: "1",
                    });

                    window.location.href = `/checkout?${params.toString()}`;
                  }}
                  className="rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-2.5 text-xs font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  Elegir combo
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
