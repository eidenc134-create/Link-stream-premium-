"use client";

import { useState } from "react";

export default function AdminUsersClient({ initialUsers }: any) {
  const [users] = useState(initialUsers);

    return (
        <div style={{ marginTop: "20px" }}>
              {users.length === 0 && <p>No hay usuarios.</p>}

                    {users.map((user: any) => (
                            <div
                                      key={user.id}
                                                style={{
                                                            padding: "12px",
                                                                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                                                                                  }}
                                                                                          >
                                                                                                    <p>
                                                                                                                <strong>{user.email}</strong>
                                                                                                                          </p>

                                                                                                                                    <p>Rol: {user.role}</p>

                                                                                                                                              <p>Estado: {user.is_banned ? "Baneado" : "Activo"}</p>
                                                                                                                                                      </div>
                                                                                                                                                            ))}
                                                                                                                                                                </div>
                                                                                                                                                                  );
                                                                                                                                                                  }