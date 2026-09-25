"use client";

import CustomComboBuilder from "./CustomComboBuilder";
import PredefinedCombos from "./PredefinedCombos";

export default function ComboSection() {
  const handleCustomCombo = (data: {
    products: string[];
    duration: any;
    subtotal: number;
    discount: number;
    total: number;
  }) => {
    const params = new URLSearchParams({
      products: data.products.join(","),
      duration: String(data.duration),
      price: String(data.total),
      combo: "custom",
    });

    window.location.href = `/checkout?${params.toString()}`;
  };

  return (
    <section
      className="relative z-10 w-full bg-black py-12 border-4 border-red-500"
      aria-labelledby="linkstream-combos"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <div id="linkstream-combos" className="sr-only">
          Combos LinkStream
        </div>

        <CustomComboBuilder onContinue={handleCustomCombo} />

        <div className="mt-10">
          <PredefinedCombos />
        </div>

      </div>
    </section>
  );
}
