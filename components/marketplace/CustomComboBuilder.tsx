"use client";

import { useMemo, useState } from "react";
import {
  calculateCustomCombo,
  durations,
  productPricing,
} from "@/lib/catalog/pricing";

type CustomComboBuilderProps = {
  onContinue?: (data: {
    products: string[];
    duration: ComboDuration;
    subtotal: number;
    discount: number;
    total: number;
  }) => void;
};

const platforms = Object.keys(productPricing);

type ComboDuration = (typeof durations)[number];

const platformIcons: Record<string, string> = {
  Netflix: "/logos/netflix.jpg",
  "Disney+": "/logos/disney-plus.jpg",
  "HBO Max": "/logos/hbo-max.jpg",
  "Paramount+": "/logos/paramount-plus.jpg",
  "Prime Video": "/logos/prime-video.jpg",
  ViX: "/logos/vix.png",
  Crunchyroll: "/logos/crunchyroll.jpg",
  "Apple TV": "/logos/apple-tv.jpg",
  Spotify: "/logos/spotify.jpg",
  IPTV: "/logos/iptv.jpg",
  "Claro Video": "/logos/claro-video.jpg",
  MUBI: "/logos/mubi.jpg",
  "Universal+": "/logos/universal-plus.jpg",
  Viki: "/logos/viki.jpg",
  DGO: "/logos/dgo.jpg",
  ESPN: "/logos/espn.jpg",
  DAZN: "/logos/dazn.jpg",
  Xbox: "/logos/xbox.jpg",
  PlayStation: "/logos/playstation.jpg",
  DramaBox: "/logos/dramabox.jpg",
  iQIYI: "/logos/iqiyi.webp",
  WeTV: "/logos/wetv.jpg",
};

const durationLabels: Record<ComboDuration, string> = {
  "1 mes": "1 mes",
  "3 meses": "3 meses",
  "6 meses": "6 meses",
  "9 meses": "9 meses",
  "12 meses": "12 meses",
};

export default function CustomComboBuilder({
  onContinue,
}: CustomComboBuilderProps) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [duration, setDuration] = useState<ComboDuration>(durations[0]);

  const combo = useMemo(() => {
    if (selectedProducts.length === 0) {
      return {
        subtotal: 0,
        discount: 0,
        total: 0,
      };
    }

    const result = calculateCustomCombo(selectedProducts, duration);

    return {
      subtotal: result.subtotal,
      discount: result.discount,
      total: result.total,
    };
  }, [selectedProducts, duration]);

  const toggleProduct = (product: string) => {
    setSelectedProducts((current) => {
      if (current.includes(product)) {
        return current.filter((item) => item !== product);
      }

      return [...current, product];
    });
  };

  const discountPercent =
    combo.subtotal > 0
      ? Math.round((combo.discount / combo.subtotal) * 100)
      : 0;

  const handleContinue = () => {
    if (selectedProducts.length === 0) return;

    onContinue?.({
      products: selectedProducts,
      duration,
      subtotal: combo.subtotal,
      discount: combo.discount,
      total: combo.total,
    });
  };

  return (
    <section className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-black/60 p-5 shadow-2xl backdrop-blur-xl sm:p-7">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-yellow-500/5 blur-3xl" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-7">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-400">
            <span>✦</span>
            Combo personalizado
          </div>

          <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Arma tu propio combo
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
            Elige las plataformas que quieras y obtén automáticamente un
            descuento según la cantidad seleccionada.
          </p>
        </div>

        {/* Duration */}
        <div className="mb-7">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              Duración
            </h3>

            <span className="text-xs text-white/40">
              {selectedProducts.length}{" "}
              {selectedProducts.length === 1
                ? "plataforma"
                : "plataformas"}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {durations.map((item) => {
              const active = duration === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setDuration(item)}
                  className={[
                    "rounded-xl border px-2 py-3 text-xs font-bold transition-all duration-200",
                    active
                      ? "border-yellow-400/70 bg-yellow-400 text-black shadow-lg shadow-yellow-500/10"
                      : "border-white/10 bg-white/[0.03] text-white/65 hover:border-yellow-400/30 hover:bg-yellow-400/5 hover:text-white",
                  ].join(" ")}
                >
                  {durationLabels[item]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Platforms */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">
              Selecciona tus plataformas
            </h3>

            {selectedProducts.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedProducts([])}
                className="text-xs font-medium text-white/40 transition hover:text-yellow-400"
              >
                Limpiar selección
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {platforms.map((platform) => {
              const selected = selectedProducts.includes(platform);
              const logo = platformIcons[platform];

              return (
                <button
                  key={platform}
                  type="button"
                  onClick={() => toggleProduct(platform)}
                  className={[
                    "group relative flex min-h-[72px] items-center gap-3 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-200",
                    selected
                      ? "border-yellow-400/60 bg-yellow-400/[0.09] shadow-lg shadow-yellow-500/5"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]",
                  ].join(" ")}
                >
                  {logo ? (
                    <img
                      src={logo}
                      alt=""
                      className="h-10 w-10 shrink-0 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xs text-white/50">
                      LS
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-xs font-bold text-white">
                      {platform}
                    </div>

                    <div className="mt-1 text-[11px] text-white/40">
                      Desde $${productPricing[platform]?.[duration]?.offer ?? productPricing[platform]?.[duration]?.normal ?? 0}
                    </div>
                  </div>

                  <span
                    className={[
                      "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-black transition",
                      selected
                        ? "border-yellow-400 bg-yellow-400 text-black"
                        : "border-white/15 text-transparent",
                    ].join(" ")}
                  >
                    ✓
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.025] p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-white/35">
                Resumen
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {selectedProducts.length === 0 ? (
                  <span className="text-sm text-white/40">
                    Selecciona al menos una plataforma
                  </span>
                ) : (
                  selectedProducts.map((product) => (
                    <span
                      key={product}
                      className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-1 text-[11px] font-semibold text-yellow-300"
                    >
                      {product}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="min-w-[190px]">
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between text-white/45">
                  <span>Subtotal</span>
                  <span>${combo.subtotal.toFixed(2)} MXN</span>
                </div>

                <div className="flex items-center justify-between text-emerald-400">
                  <span>
                    Descuento
                    {discountPercent > 0 && ` (${discountPercent}%)`}
                  </span>
                  <span>-${combo.discount.toFixed(2)}</span>
                </div>

                <div className="my-2 border-t border-white/10" />

                <div className="flex items-end justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Total
                  </span>

                  <span className="text-2xl font-black text-yellow-400">
                    ${combo.total.toFixed(2)}
                    <span className="ml-1 text-xs font-semibold text-yellow-400/60">
                      MXN
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Discount information */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-yellow-500/10 bg-yellow-500/5 px-3 py-2.5 text-xs text-white/50">
            <span className="text-yellow-400">✦</span>

            <span>
              {selectedProducts.length < 2
                ? "Selecciona más plataformas para desbloquear descuentos."
                : `Tienes ${discountPercent}% de descuento por seleccionar ${selectedProducts.length} plataformas.`}
            </span>
          </div>

          {/* Continue */}
          <button
            type="button"
            disabled={selectedProducts.length === 0}
            onClick={handleContinue}
            className="mt-4 w-full rounded-xl bg-yellow-400 px-5 py-3.5 text-sm font-black text-black transition-all duration-200 hover:bg-yellow-300 hover:shadow-lg hover:shadow-yellow-500/10 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-yellow-400 disabled:hover:shadow-none"
          >
            Continuar con mi combo
          </button>
        </div>
      </div>
    </section>
  );
}
