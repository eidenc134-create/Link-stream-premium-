import "server-only";
import { cert, getApps, initializeApp } from "firebase-admin/app";
const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId || !clientEmail || !privateKey) {
  throw new Error(
      "Faltan las variables de entorno de Firebase Admin."
        );
        }

        export const firebaseAdminApp =
          getApps().length > 0
              ? getApps()[0]
                  : initializeApp({
                          credential: cert({
                                    projectId,
                                              clientEmail,
                                                        privateKey,
                                                                }),
                                                                      });