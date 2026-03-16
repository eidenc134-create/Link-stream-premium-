import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

async function createProduct(formData: FormData) {
  "use server";

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
              );

                const title = String(formData.get("title"));
                  const description = String(formData.get("description"));
                    const category = String(formData.get("category"));
                      const provider = String(formData.get("provider"));
                        const planName = String(formData.get("plan_name"));
                          const durationDays = Number(formData.get("duration_days"));
                            const price = Number(formData.get("price"));

                              const accountEmail = String(formData.get("account_email"));
                                const deliveryReference = String(formData.get("delivery_reference"));
                                  const deliveryNotes = String(formData.get("delivery_notes"));

                                    const { data: product, error } = await supabase
                                        .from("products")
                                            .insert({
                                                  title,
                                                        description,
                                                              category,
                                                                    provider,
                                                                          plan_name: planName,
                                                                                duration_days: durationDays,
                                                                                      price,
                                                                                            status: "active"
                                                                                                })
                                                                                                    .select()
                                                                                                        .single();

                                                                                                          if (error) {
                                                                                                              console.error(error);
                                                                                                                  throw new Error("Error creando producto");
                                                                                                                    }

                                                                                                                      if (accountEmail) {
                                                                                                                          const { error: inventoryError } = await supabase
                                                                                                                                .from("inventory")
                                                                                                                                      .insert({
                                                                                                                                              product_id: product.id,
                                                                                                                                                      account_email: accountEmail,
                                                                                                                                                              delivery_reference: deliveryReference,
                                                                                                                                                                      notes: deliveryNotes,
                                                                                                                                                                              status: "available"
                                                                                                                                                                                    });

                                                                                                                                                                                        if (inventoryError) {
                                                                                                                                                                                              console.error(inventoryError);
                                                                                                                                                                                                  }
                                                                                                                                                                                                    }

                                                                                                                                                                                                      redirect("/admin/products");
                                                                                                                                                                                                      }

                                                                                                                                                                                                      export default function Page() {
                                                                                                                                                                                                        return (
                                                                                                                                                                                                            <div style={{maxWidth:900,margin:"40px auto",color:"white"}}>

                                                                                                                                                                                                                  <h1>Crear producto</h1>

                                                                                                                                                                                                                        <form action={createProduct} style={{display:"grid",gap:12}}>

                                                                                                                                                                                                                                <input name="title" placeholder="Titulo" required />

                                                                                                                                                                                                                                        <textarea name="description" placeholder="Descripción" />

                                                                                                                                                                                                                                                <input name="category" placeholder="Categoria" required />

                                                                                                                                                                                                                                                        <input name="provider" placeholder="Proveedor" />

                                                                                                                                                                                                                                                                <input name="plan_name" placeholder="Plan" />

                                                                                                                                                                                                                                                                        <input name="duration_days" placeholder="Duración días" />

                                                                                                                                                                                                                                                                                <input name="price" placeholder="Precio" required />

                                                                                                                                                                                                                                                                                        <h3>Inventario inicial</h3>

                                                                                                                                                                                                                                                                                                <input name="account_email" placeholder="Correo cuenta" />

                                                                                                                                                                                                                                                                                                        <input name="delivery_reference" placeholder="Contraseña o referencia" />

                                                                                                                                                                                                                                                                                                                <textarea name="delivery_notes" placeholder="Notas internas" />

                                                                                                                                                                                                                                                                                                                        <button type="submit">
                                                                                                                                                                                                                                                                                                                                  Guardar producto
                                                                                                                                                                                                                                                                                                                                          </button>

                                                                                                                                                                                                                                                                                                                                                </form>

                                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                                                                                      }