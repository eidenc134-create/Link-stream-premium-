import OpenAI from "openai"
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const { product } = await req.json()
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: `Vende esto: ${product}` }]
  })
  return Response.json({ text: res.choices[0].message.content })
}
