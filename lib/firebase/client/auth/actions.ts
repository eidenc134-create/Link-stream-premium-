import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth } from "../auth";
import { db } from "../firestore";

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export async function registerUser({
  name,
  email,
  password,
}: RegisterData): Promise<User> {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanName) {
    throw new Error("El nombre es obligatorio.");
  }

  if (!cleanEmail) {
    throw new Error("El correo electrónico es obligatorio.");
  }

  if (password.length < 6) {
    throw new Error("La contraseña debe tener al menos 6 caracteres.");
  }

  // 1. Crear usuario en Firebase Authentication
  const credential = await createUserWithEmailAndPassword(
    auth,
    cleanEmail,
    password
  );

  const user = credential.user;

  // 2. Guardar el nombre en Firebase Authentication
  await updateProfile(user, {
    displayName: cleanName,
  });

  // 3. Crear el perfil del usuario en Firestore
  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    name: cleanName,
    email: cleanEmail,
    role: "user",
    emailVerified: user.emailVerified,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return user;
}