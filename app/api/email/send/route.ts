import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const { email } = await req.json()
  await resend.emails.send({
    from: "onboarding@tusaas.com",
    to: email,
    subject: "Bienvenido 🚀",
    html: "<h1>Empieza a ganar dinero</h1>"
  })
  return Response.json({ ok: true })
}
