import { getStorage } from "firebase/storage";
import { firebaseApp } from "@/lib/firebase/client/config";

export const storage = getStorage(firebaseApp);