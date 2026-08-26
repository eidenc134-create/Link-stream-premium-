import {
      reload,
        sendEmailVerification,
        } from "firebase/auth";

        import { auth } from "../auth";

        export async function sendVerificationEmail() {
          const user = auth.currentUser;

            if (!user) {
                throw new Error("No hay una sesión activa.");
                  }

                    if (user.emailVerified) {
                        return;
                          }

                            await sendEmailVerification(user);
                            }

                            export async function refreshVerificationStatus() {
                              const user = auth.currentUser;

                                if (!user) {
                                    return false;
                                      }

                                        await reload(user);

                                          return user.emailVerified;
                                          }

                                          export function hasVerifiedEmail() {
                                            return auth.currentUser?.emailVerified === true;
                                            }