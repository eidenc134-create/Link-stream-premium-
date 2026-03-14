import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
      const { email, is_banned, banned_reason } = await req.json();

          if (!email || typeof is_banned !== "boolean") {
                return NextResponse.json(
                        { error: "Email e is_banned son requeridos" },
                                { status: 400 }
                                      );
                                          }

                                              const supabase = createClient(
                                                    process.env.NEXT_PUBLIC_SUPABASE_URL!,
                                                          process.env.SUPABASE_SERVICE_ROLE_KEY!
                                                              );

                                                                  const { error } = await supabase
                                                                        .from("profiles")
                                                                              .update({
                                                                                      is_banned,
                                                                                              banned_reason: is_banned
                                                                                                        ? banned_reason || "Moderación administrativa"
                                                                                                                  : null,
                                                                                                                        })
                                                                                                                              .eq("email", email);

                                                                                                                                  if (error) {
                                                                                                                                        return NextResponse.json({ error: error.message }, { status: 500 });
                                                                                                                                            }

                                                                                                                                                return NextResponse.json({ success: true });
                                                                                                                                                  } catch (error: any) {
                                                                                                                                                      return NextResponse.json(
                                                                                                                                                            { error: error.message || "Error interno" },
                                                                                                                                                                  { status: 500 }
                                                                                                                                                                      );
                                                                                                                                                                        }
                                                                                                                                                                        }