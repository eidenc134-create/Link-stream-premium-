'use client'
import { useState } from "react"

export default function Onboarding() {
  const [step, setStep] = useState(1)

  return (
    <div>
      <h1>Bienvenido 🚀</h1>
      {step === 1 && <button onClick={() => setStep(2)}>Empezar</button>}
      {step === 2 && <button onClick={() => setStep(3)}>Crear producto</button>}
      {step === 3 && <a href="/dashboard">Ir al dashboard</a>}
    </div>
  )
}
