import {
      createUserWithEmailAndPassword,
        sendEmailVerification,
          signInWithEmailAndPassword,
            signOut,
            } from "firebase/auth";

            import { auth } from "../auth";

            export async function registerUser(
              email: string,
                password: string
                ) {
                  const credential = await createUserWithEmailAndPassword(
                      auth,
                          email,
                              password
                                );

                                  await sendEmailVerification(credential.user);

                                    return credential.user;
                                    }

                                    export async function loginUser(
                                      email: string,
                                        password: string
                                        ) {
                                          const credential = await signInWithEmailAndPassword(
                                              auth,
                                                  email,
                                                      password
                                                        );

                                                          return credential.user;
                                                          }

                                                          export async function logoutUser() {
                                                            await signOut(auth);
                                                            }
