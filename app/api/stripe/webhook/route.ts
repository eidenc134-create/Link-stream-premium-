import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("Falta STRIPE_SECRET_KEY en las variables de entorno.");
}

const stripe = new Stripe(stripeSecretKey);

export async function POST(request: Request) {
  if (!webhookSecret) {
    console.error("Falta STRIPE_WEBHOOK_SECRET en las variables de entorno.");

    return NextResponse.json(
      { error: "Webhook de Stripe no configurado." },
      { status: 500 },
    );
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Falta la firma de Stripe." },
      { status: 400 },
    );
  }

  const body = await request.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Firma de webhook inválida:", error);

    return NextResponse.json(
      { error: "Firma de webhook inválida." },
      { status: 400 },
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        console.log("PAGO CONFIRMADO:", {
          sessionId: session.id,
          paymentStatus: session.payment_status,
          customerEmail: session.customer_details?.email ?? null,
          metadata: session.metadata,
        });

        break;
      }

      default:
        console.log(`Evento Stripe recibido: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error procesando webhook:", error);

    return NextResponse.json(
      { error: "Error procesando el webhook." },
      { status: 500 },
    );
  }
}
