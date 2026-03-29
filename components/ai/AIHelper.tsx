'use client'

export default function AIHelper() {
  async function generar() {
    const res = await fetch('/api/ai/sales', {
      method: 'POST',
      body: JSON.stringify({ product: 'Netflix 4K' })
    })
    const data = await res.json()
    alert(data.text)
  }

  return <button onClick={generar}>🤖 Generar ventas</button>
}
