import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "../auth";

export function watchAuthState(
  callback: (user: User | null) => void
  ) {
    return onAuthStateChanged(auth, callback);
    }

    export function isEmailVerified(user: User | null) {
      return Boolean(user?.emailVerified);
      }