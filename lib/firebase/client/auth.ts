import { getAuth } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase/client/config";

export const auth = getAuth(firebaseApp);