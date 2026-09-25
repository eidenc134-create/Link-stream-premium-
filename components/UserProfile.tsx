"use client";

import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase/client/auth";

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  const displayName =
    user.displayName ||
    user.email?.split("@")[0] ||
    "Usuario";

  const initial = displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div
      ref={menuRef}
      className="user-profile"
    >
      <button
        type="button"
        className="user-profile-button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Abrir menú de usuario"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Foto de perfil"
            className="user-avatar"
          />
        ) : (
          <span className="user-avatar user-avatar-placeholder">
            {initial}
          </span>
        )}

        <span className="user-profile-name">
          {displayName}
        </span>

        <span
          className={`user-profile-arrow ${
            open ? "user-profile-arrow-open" : ""
          }`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div className="user-profile-menu">
          <div className="user-profile-menu-header">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Foto de perfil"
                className="user-menu-avatar"
              />
            ) : (
              <span className="user-menu-avatar user-avatar-placeholder">
                {initial}
              </span>
            )}

            <div>
              <strong>{displayName}</strong>

              <small>
                {user.email || "Sin correo"}
              </small>
            </div>
          </div>

          <div className="user-profile-menu-divider" />

          <a
            href="/account"
            className="user-profile-menu-item"
            onClick={() => setOpen(false)}
          >
            <span>⚙️</span>
            Administrar cuenta
          </a>

          <button
            type="button"
            className="user-profile-menu-item user-profile-logout"
            onClick={handleLogout}
          >
            <span>↪</span>
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}