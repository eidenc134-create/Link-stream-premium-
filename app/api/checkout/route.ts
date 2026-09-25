import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Falta STRIPE_SECRET_KEY en las variables de entorno.");
}

const stripe = new Stripe(stripeSecretKey);

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://bug-free-lamp-5g6pj54xrqjw34rvj-3000.app.github.dev";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      product,
      logo,
      access,
      duration,
      price,
    } = body;

    if (
      typeof product !== "string" ||
      typeof duration !== "string" ||
      typeof access !== "string" ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return NextResponse.json(
        { error: "Datos de compra inválidos." },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "mxn",

            product_data: {
              name: `${product} — ${access}`,
              description: `Duración: ${duration}`,

              ...(typeof logo === "string" && logo.startsWith("/")
                ? {
                    images: [`${SITE_URL}${logo}`],
                  }
                : {}),
            },

            unit_amount: Math.round(price * 100),
          },

          quantity: 1,
        },
      ],

      success_url:
        `${SITE_URL}/checkout/success` +
        "?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        `${SITE_URL}/checkout?` +
        new URLSearchParams({
          product,
          ...(typeof logo === "string" ? { logo } : {}),
          access,
          duration,
          price: String(price),
        }).toString(),

      metadata: {
        product,
        access,
        duration,
        price: String(price),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe no devolvió una URL de checkout." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error("ERROR REAL DE STRIPE:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Error desconocido al crear la sesión de Stripe.";

    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}
