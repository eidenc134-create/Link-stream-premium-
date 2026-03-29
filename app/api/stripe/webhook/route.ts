export async function POST(req: Request) {
  const body = await req.text()
  console.log("stripe webhook", body)
  return new Response("ok")
}
