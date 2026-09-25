"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";

import { auth } from "@/lib/firebase/client/auth";

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      },
    );

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

    document.addEventListener(
      "mousedown",
      handleClickOutside,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [open]);

  if (!user) {
    return (
      <a
        href="/login"
        className="user-login-button"
      >
        <span className="user-login-icon">
          →
        </span>

        <span>
          Iniciar sesión
        </span>
      </a>
    );
  }

  const displayName =
    user.displayName ||
    user.email?.split("@")[0] ||
    "Usuario";

  const email =
    user.email || "Sin correo";

  const initial =
    displayName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    try {
      setOpen(false);

      await signOut(auth);

      window.location.href = "/login";
    } catch (error) {
      console.error(
        "Error al cerrar sesión:",
        error,
      );
    }
  };

  return (
    <div
      ref={menuRef}
      className={`user-menu ${
        open ? "user-menu-open" : ""
      }`}
    >
      <button
        type="button"
        className="user-menu-trigger"
        onClick={() =>
          setOpen((value) => !value)
        }
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Abrir menú de usuario"
      >
        <span className="user-menu-trigger-avatar">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt=""
              className="user-menu-avatar"
            />
          ) : (
            <span className="user-menu-avatar user-menu-avatar-placeholder">
              {initial}
            </span>
          )}

          <span
            className="user-menu-status"
            aria-hidden="true"
          />
        </span>

        <span className="user-menu-trigger-info">
          <strong className="user-menu-name">
            {displayName}
          </strong>

          <span className="user-menu-account-label">
            Mi cuenta
          </span>
        </span>

        <span
          className={`user-menu-arrow ${
            open
              ? "user-menu-arrow-open"
              : ""
          }`}
          aria-hidden="true"
        >
          {open ? "↑" : "↓"}
        </span>
      </button>

      {open && (
        <div
          className="user-menu-dropdown"
          role="menu"
          aria-label="Menú de usuario"
        >
          <div className="user-menu-profile">
            <div className="user-menu-profile-avatar">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  className="user-menu-large-avatar"
                />
              ) : (
                <span className="user-menu-large-avatar user-menu-avatar-placeholder">
                  {initial}
                </span>
              )}

              <span
                className="user-menu-profile-status"
                aria-hidden="true"
              />
            </div>

            <div className="user-menu-user-info">
              <strong>
                {displayName}
              </strong>

              <span>
                {email}
              </span>

              <small>
                Cuenta activa
              </small>
            </div>
          </div>

          <div
            className="user-menu-divider"
            aria-hidden="true"
          />

          <a
            href="/account"
            className="user-menu-item user-menu-account"
            role="menuitem"
            onClick={() =>
              setOpen(false)
            }
          >
            <span
              className="user-menu-item-icon"
              aria-hidden="true"
            >
              ⚙
            </span>

            <span className="user-menu-item-content">
              <strong>
                Administrar mi cuenta
              </strong>

              <small>
                Perfil, seguridad y configuración
              </small>
            </span>

            <span
              className="user-menu-item-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </a>

          <button
            type="button"
            className="user-menu-item user-menu-logout"
            role="menuitem"
            onClick={handleLogout}
          >
            <span
              className="user-menu-item-icon"
              aria-hidden="true"
            >
              ↪
            </span>

            <span className="user-menu-item-content">
              <strong>
                Cerrar sesión
              </strong>

              <small>
                Salir de tu cuenta
              </small>
            </span>

            <span
              className="user-menu-item-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
