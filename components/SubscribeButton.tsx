'use client'

export default function SubscribeButton() {
  async function handleSubscribe() {
    const res = await fetch('/api/stripe/checkout', { method: 'POST' })
    const data = await res.json()
    window.location.href = data.url
  }

  return <button onClick={handleSubscribe}>Suscribirme 💳</button>
}
