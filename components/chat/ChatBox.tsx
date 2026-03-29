'use client'
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ChatBox() {
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    const channel = supabase
      .channel("chat")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        setMessages((prev) => [...prev, payload.new])
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [])

  return (
    <div>
      {messages.map((m, i) => (
        <p key={i}>{m.content}</p>
      ))}
    </div>
  )
}
