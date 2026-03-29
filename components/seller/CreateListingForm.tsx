'use client'
import { useState } from "react"

export default function CreateListingForm() {
  const [msg, setMsg] = useState("")

  async function submit(e: any) {
    e.preventDefault()
    const payload = { title: e.target.title.value }
    const res = await fetch('/api/listings/create', { method: 'POST', body: JSON.stringify(payload) })
    setMsg(res.ok ? 'Creado ✅' : 'Error ❌')
  }

  return (
    <form onSubmit={submit}>
      <input name="title" placeholder="Producto" />
      <button type="submit">Crear</button>
      <p>{msg}</p>
    </form>
  )
}
