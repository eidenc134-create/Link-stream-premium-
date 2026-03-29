export async function POST(req: Request) {
  const body = await req.json()
  console.log("listing", body)
  return Response.json({ ok: true })
}
