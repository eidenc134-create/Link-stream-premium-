import {
      confirmPasswordReset,
        sendPasswordResetEmail,
          verifyPasswordResetCode,
          } from "firebase/auth";

          import { auth } from "../auth";

          export async function sendPasswordReset(email: string) {
            await sendPasswordResetEmail(auth, email);
            }

            export async function verifyResetCode(code: string) {
              return verifyPasswordResetCode(auth, code);
              }

              export async function resetPassword(
                code: string,
                  newPassword: string
                  ) {
                    await confirmPasswordReset(auth, code, newPassword);
                    }