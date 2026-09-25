"use client";

import { useEffect, useState } from "react";

type IntroCinematicProps = {
  onComplete?: () => void;
};

export default function IntroCinematic({
  onComplete,
}: IntroCinematicProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    console.log("========== INTRO MONTADA ==========");
    const exitTimer = window.setTimeout(() => {
      setExiting(true);
    }, 5400);

    const completeTimer = window.setTimeout(() => {
      console.log("========== LINKSTREAM INTRO: COMPLETADA ==========");
      console.log("VISIBLE ANTES:", visible);
      setVisible(false);
      onComplete?.();
    }, 2000);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!visible) {
    console.log("========== INTRO: RETURN NULL ==========");
    return null;
  }

  return (
    <div
      className={`ls-intro ${
        exiting ? "ls-intro--exit" : ""
      }`}
      aria-hidden="true"
    >
      {/* Fondo */}
      <div className="ls-intro__background" />
      <div className="ls-intro__stars" />
      <div className="ls-intro__light" />

      {/* Contenido */}
      <div className="ls-intro__scene">

        {/* HALCÓN */}
        <div className="ls-intro__eagle">

          <div className="ls-intro__eagle-glow" />

          <img
            src="/logos/halcon-monocromo.png"
            alt=""
          />

          <div className="ls-intro__eye">
            <span />
          </div>

        </div>

        {/* MARCA */}
        <div className="ls-intro__brand">

          <div className="ls-intro__name">

            <span className="ls-intro__link">
              Link
            </span>

            <span className="ls-intro__stream">
              Stream
            </span>

            <span className="ls-intro__version">
              2.0
            </span>

          </div>

          <div className="ls-intro__line" />

          <p className="ls-intro__tagline">
            EL PARAÍSO DEL ENTRETENIMIENTO DIGITAL
          </p>

        </div>

      </div>

      {/* Destello final */}
      <div className="ls-intro__flare" />

    </div>
  );
}