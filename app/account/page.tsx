"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  EmailAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  signOut,
  updatePassword,
  updateProfile,
  verifyBeforeUpdateEmail,
  type User,
} from "firebase/auth";

import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import { auth } from "@/lib/firebase/client/auth";
import { storage } from "@/lib/firebase/client/storage";

type ModalType =
  | "name"
  | "email"
  | "password"
  | "photo"
  | null;

export default function AccountPage() {
  /* ========================================
     ESTADO DE AUTENTICACIÓN
  ======================================== */

  const [user, setUser] =
    useState<User | null>(null);

  const [checking, setChecking] =
    useState(true);

  /* ========================================
     MODALES
  ======================================== */

  const [modal, setModal] =
    useState<ModalType>(null);

  /* ========================================
     FORMULARIOS
  ======================================== */

  const [name, setName] =
    useState("");

  const [newEmail, setNewEmail] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [currentPassword, setCurrentPassword] =
    useState("");

  /* ========================================
     ESTADO GENERAL
  ======================================== */

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  /* ========================================
     ESCUCHAR SESIÓN
  ======================================== */

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setChecking(false);
        },
      );

    return () => unsubscribe();
  }, []);

  /* ========================================
     REDIRECCIÓN SI NO HAY SESIÓN
  ======================================== */

  useEffect(() => {
    if (!checking && !user) {
      window.location.href = "/login";
    }
  }, [checking, user]);

  /* ========================================
     MENSAJES
  ======================================== */

  const clearMessages = () => {
    setMessage("");
    setError("");
  };

  /* ========================================
     ABRIR MODAL
  ======================================== */

  const openModal = (
    type: ModalType,
  ) => {
    clearMessages();

    setModal(type);

    if (type === "name") {
      setName(
        user?.displayName || "",
      );
    }

    if (type === "email") {
      setNewEmail(
        user?.email || "",
      );

      setCurrentPassword("");
    }

    if (type === "password") {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  /* ========================================
     CERRAR MODAL
  ======================================== */

  const closeModal = () => {
    if (loading) return;

    setModal(null);

    clearMessages();

    setName("");
    setNewEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
  };

  /* ========================================
     OBTENER PROVEEDOR
  ======================================== */

  const getProviderId = () => {
    if (!user) return null;

    return (
      user.providerData[0]
        ?.providerId || null
    );
  };

  /* ========================================
     REAUTENTICAR USUARIO
  ======================================== */

  const reauthenticateUser =
    async () => {
      if (!user) {
        throw new Error(
          "No hay una sesión activa.",
        );
      }

      const providerId =
        getProviderId();

      /* CUENTA CON CORREO Y CONTRASEÑA */

      if (providerId === "password") {
        if (!user.email) {
          throw new Error(
            "La cuenta no tiene un correo electrónico.",
          );
        }

        if (!currentPassword) {
          throw new Error(
            "Introduce tu contraseña actual.",
          );
        }

        const credential =
          EmailAuthProvider.credential(
            user.email,
            currentPassword,
          );

        await reauthenticateWithCredential(
          user,
          credential,
        );

        return;
      }

      /* CUENTA CON GOOGLE */

      if (
        providerId === "google.com"
      ) {
        const provider =
          new GoogleAuthProvider();

        await reauthenticateWithPopup(
          user,
          provider,
        );

        return;
      }

      throw new Error(
        "No se pudo identificar el método de inicio de sesión.",
      );
    };

  /* ========================================
     CAMBIAR NOMBRE
  ======================================== */

  const handleChangeName =
    async (
      e: FormEvent<HTMLFormElement>,
    ) => {
      e.preventDefault();

      if (!user) return;

      const cleanName =
        name.trim();

      if (cleanName.length < 2) {
        setError(
          "El nombre debe tener al menos 2 caracteres.",
        );

        return;
      }

      try {
        setLoading(true);
        clearMessages();

        await updateProfile(user, {
          displayName: cleanName,
        });

        setUser(auth.currentUser);

        setMessage(
          "Nombre actualizado correctamente.",
        );

        setTimeout(() => {
          closeModal();
        }, 900);
      } catch (err) {
        console.error(err);

        setError(
          "No se pudo actualizar el nombre.",
        );
      } finally {
        setLoading(false);
      }
    };

  /* ========================================
     CAMBIAR CORREO
  ======================================== */

  const handleChangeEmail =
    async (
      e: FormEvent<HTMLFormElement>,
    ) => {
      e.preventDefault();

      if (!user) return;

      const email =
        newEmail.trim();

      if (!email) {
        setError(
          "Introduce un correo electrónico.",
        );

        return;
      }

      if (email === user.email) {
        setError(
          "El correo nuevo es igual al actual.",
        );

        return;
      }

      try {
        setLoading(true);
        clearMessages();

        /*
         * Primero verificamos que el usuario
         * sea realmente el propietario.
         */

        await reauthenticateUser();

        /*
         * Firebase enviará un correo
         * de verificación al nuevo correo.
         */

        await verifyBeforeUpdateEmail(
          user,
          email,
        );

        setMessage(
          "Te enviamos un correo de verificación. Confirma el nuevo correo para completar el cambio.",
        );
      } catch (err: any) {
        console.error(err);

        if (
          err?.code ===
          "auth/email-already-in-use"
        ) {
          setError(
            "Ese correo ya está siendo utilizado por otra cuenta.",
          );
        } else if (
          err?.code ===
          "auth/invalid-email"
        ) {
          setError(
            "El correo electrónico no es válido.",
          );
        } else if (
          err?.code ===
          "auth/requires-recent-login"
        ) {
          setError(
            "Debes volver a iniciar sesión para realizar este cambio.",
          );
        } else if (
          err?.code ===
          "auth/operation-not-allowed"
        ) {
          setError(
            "Firebase no permite cambiar el correo con la configuración actual.",
          );
        } else if (
          err?.code ===
          "auth/too-many-requests"
        ) {
          setError(
            "Se realizaron demasiados intentos. Inténtalo nuevamente más tarde.",
          );
        } else {
          setError(
            err?.message ||
              "No se pudo cambiar el correo.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

  /* ========================================
     CAMBIAR CONTRASEÑA
  ======================================== */

  const handleChangePassword =
    async (
      e: FormEvent<HTMLFormElement>,
    ) => {
      e.preventDefault();

      if (!user) return;

      if (newPassword.length < 6) {
        setError(
          "La nueva contraseña debe tener al menos 6 caracteres.",
        );

        return;
      }

      if (
        newPassword !==
        confirmPassword
      ) {
        setError(
          "Las contraseñas nuevas no coinciden.",
        );

        return;
      }

      try {
        setLoading(true);
        clearMessages();

        await reauthenticateUser();

        await updatePassword(
          user,
          newPassword,
        );

        setMessage(
          "Contraseña actualizada correctamente.",
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          closeModal();
        }, 900);
      } catch (err: any) {
        console.error(err);

        if (
          err?.code ===
            "auth/wrong-password" ||
          err?.code ===
            "auth/invalid-credential"
        ) {
          setError(
            "La contraseña actual es incorrecta.",
          );
        } else if (
          err?.code ===
          "auth/requires-recent-login"
        ) {
          setError(
            "Debes volver a iniciar sesión para cambiar la contraseña.",
          );
        } else if (
          err?.code ===
          "auth/weak-password"
        ) {
          setError(
            "La nueva contraseña es demasiado débil.",
          );
        } else {
          setError(
            err?.message ||
              "No se pudo cambiar la contraseña.",
          );
        }
      } finally {
        setLoading(false);
      }
    };

  /* ========================================
     FOTO DE PERFIL
  ======================================== */

  const handlePhotoChange =
    async (
      e: ChangeEvent<HTMLInputElement>,
    ) => {
      const file =
        e.target.files?.[0];

      if (!file || !user) return;

      clearMessages();

      if (
        !file.type.startsWith(
          "image/",
        )
      ) {
        setError(
          "Selecciona una imagen válida.",
        );

        return;
      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {
        setError(
          "La imagen no puede superar los 5 MB.",
        );

        return;
      }

      try {
        setLoading(true);

        const extension =
          file.name
            .split(".")
            .pop() || "jpg";

        const fileRef = ref(
          storage,
          `profile-images/${user.uid}/profile.${extension}`,
        );

        await uploadBytes(
          fileRef,
          file,
        );

        const downloadURL =
          await getDownloadURL(
            fileRef,
          );

        await updateProfile(
          user,
          {
            photoURL:
              downloadURL,
          },
        );

        setUser(
          auth.currentUser,
        );

        setMessage(
          "Foto de perfil actualizada correctamente.",
        );

        setTimeout(() => {
          closeModal();
        }, 900);
      } catch (err) {
        console.error(err);

        setError(
          "No se pudo subir la foto. Revisa la configuración de Firebase Storage.",
        );
      } finally {
        setLoading(false);

        if (
          fileInputRef.current
        ) {
          fileInputRef.current.value =
            "";
        }
      }
    };

  /* ========================================
     CERRAR SESIÓN
  ======================================== */

  const handleLogout =
    async () => {
      try {
        setLoading(true);

        await signOut(auth);

        window.location.href =
          "/login";
      } catch (err) {
        console.error(err);

        setError(
          "No se pudo cerrar la sesión.",
        );

        setLoading(false);
      }
    };

  /* ========================================
     CARGANDO
  ======================================== */

  if (checking || !user) {
    return (
      <main className="account-page">

        <div className="account-loading">

          <div className="account-loading-spinner" />

          <p>
            Cargando cuenta...
          </p>

        </div>

      </main>
    );
  }

  /* ========================================
     DATOS DEL USUARIO
  ======================================== */

  const displayName =
    user.displayName ||
    user.email?.split("@")[0] ||
    "Usuario";

  const initial =
    displayName
      .charAt(0)
      .toUpperCase();

  const providerId =
    getProviderId();



  /* ========================================
     INTERFAZ
  ======================================== */

  return (
    <main className="account-page">

      <div className="account-bg-glow account-bg-glow-one" />
      <div className="account-bg-glow account-bg-glow-two" />

      <section className="account-card">

        <a href="/" className="account-back">
          <span>←</span>
          Volver al catálogo
        </a>

        <header className="account-header">

          <div className="account-avatar-container">

            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Foto de perfil"
                className="account-avatar"
              />
            ) : (
              <div className="account-avatar account-avatar-placeholder">
                {initial}
              </div>
            )}

            <span className="account-avatar-status" />

          </div>

          <div className="account-header-content">

            <span className="account-header-eyebrow">
              CUENTA PERSONAL
            </span>

            <h1>Mi cuenta</h1>

            <p>
              Administra tu información personal,
              seguridad y perfil.
            </p>

          </div>

        </header>


        <section className="account-section">

          <div className="account-section-heading">

            <div className="account-section-icon">
              👤
            </div>

            <div>
              <span className="account-section-label">
                PERFIL
              </span>

              <h2>Información personal</h2>

              <p>
                Administra los datos principales
                de tu cuenta.
              </p>
            </div>

          </div>


          <div className="account-info-grid">

            <article className="account-info-card">

              <div className="account-info-card-icon">
                👤
              </div>

              <div className="account-info-card-content">

                <span>Nombre</span>

                <strong>{displayName}</strong>

                <small>
                  Nombre visible en tu perfil.
                </small>

              </div>

              <button
                type="button"
                className="account-action"
                onClick={() => openModal("name")}
              >
                Cambiar
                <b>→</b>
              </button>

            </article>


            <article className="account-info-card">

              <div className="account-info-card-icon">
                ✉
              </div>

              <div className="account-info-card-content">

                <span>Correo electrónico</span>

                <strong>
                  {user.email || "Sin correo"}
                </strong>

                <small>
                  Correo asociado a tu cuenta.
                </small>

              </div>

              <button
                type="button"
                className="account-action"
                onClick={() => openModal("email")}
              >
                Cambiar
                <b>→</b>
              </button>

            </article>

          </div>

        </section>


        <section className="account-section">

          <div className="account-section-heading">

            <div className="account-section-icon">
              🔐
            </div>

            <div>
              <span className="account-section-label">
                SEGURIDAD
              </span>

              <h2>Protege tu cuenta</h2>

              <p>
                Mantén segura tu información
                de acceso.
              </p>
            </div>

          </div>


          <article className="account-security-card">

            <div className="account-security-main">

              <div className="account-security-icon">
                🔒
              </div>

              <div>
                <span>Contraseña</span>

                <strong>••••••••••••</strong>

                <small>
                  Actualiza tu contraseña
                  periódicamente para mantener
                  tu cuenta protegida.
                </small>
              </div>

            </div>

            <button
              type="button"
              className="account-action"
              onClick={() => openModal("password")}
            >
              Cambiar
              <b>→</b>
            </button>

          </article>

        </section>


        <section className="account-section">

          <div className="account-section-heading">

            <div className="account-section-icon">
              📷
            </div>

            <div>
              <span className="account-section-label">
                IMAGEN
              </span>

              <h2>Foto de perfil</h2>

              <p>
                Personaliza la apariencia
                de tu cuenta.
              </p>
            </div>

          </div>


          <article className="account-photo-card">

            <div className="account-photo-preview">

              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Foto de perfil"
                />
              ) : (
                <span>{initial}</span>
              )}

            </div>

            <div className="account-photo-content">

              <strong>
                Personaliza tu perfil
              </strong>

              <p>
                Utiliza una imagen para
                identificar fácilmente tu cuenta.
              </p>

              <small>
                JPG, PNG, WEBP o GIF · Máximo 5 MB
              </small>

            </div>

            <button
              type="button"
              className="account-secondary-button"
              onClick={() => openModal("photo")}
            >
              <span>📷</span>
              Cambiar foto
            </button>

          </article>

        </section>


        <footer className="account-footer">

          <div className="account-logout-info">
            <span>¿Terminaste?</span>

            <small>
              Cierra tu sesión de forma segura.
            </small>
          </div>

          <button
            type="button"
            className="account-logout"
            onClick={handleLogout}
            disabled={loading}
          >
            <span>↪</span>

            {loading
              ? "Cerrando sesión..."
              : "Cerrar sesión"}

          </button>

        </footer>

      </section>


      {modal && (
        <div
          className="account-modal-overlay"
          onMouseDown={(e) => {
            if (
              e.target === e.currentTarget &&
              !loading
            ) {
              closeModal();
            }
          }}
        >

          <div className="account-modal">

            <button
              type="button"
              className="account-modal-close"
              onClick={closeModal}
              disabled={loading}
              aria-label="Cerrar"
            >
              ×
            </button>


            {modal === "name" && (
              <>

                <div className="account-modal-icon">
                  👤
                </div>

                <h2>Cambiar nombre</h2>

                <p>
                  Actualiza el nombre que
                  aparecerá en tu perfil.
                </p>

                <form
                  onSubmit={handleChangeName}
                  className="account-form"
                >

                  <label>
                    Nombre

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Tu nombre"
                      minLength={2}
                      required
                    />
                  </label>

                  {error && (
                    <div className="account-error">
                      {error}
                    </div>
                  )}

                  {message && (
                    <div className="account-success">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="account-primary-button"
                    disabled={loading}
                  >
                    {loading
                      ? "Guardando..."
                      : "Guardar cambios →"}
                  </button>

                </form>

              </>
            )}


            {modal === "email" && (
              <>

                <div className="account-modal-icon">
                  ✉
                </div>

                <h2>Cambiar correo</h2>

                <p>
                  Introduce el nuevo correo
                  electrónico que quieres utilizar.
                </p>

                <form
                  onSubmit={handleChangeEmail}
                  className="account-form"
                >

                  <label>
                    Nuevo correo

                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) =>
                        setNewEmail(e.target.value)
                      }
                      placeholder="tu@correo.com"
                      required
                    />
                  </label>

                  {providerId === "password" && (
                    <label>
                      Contraseña actual

                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) =>
                          setCurrentPassword(
                            e.target.value
                          )
                        }
                        placeholder="Tu contraseña actual"
                        required
                      />
                    </label>
                  )}

                  {providerId === "google.com" && (
                    <div className="account-info-note">
                      Para confirmar este cambio
                      se abrirá Google.
                    </div>
                  )}

                  {error && (
                    <div className="account-error">
                      {error}
                    </div>
                  )}

                  {message && (
                    <div className="account-success">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="account-primary-button"
                    disabled={loading}
                  >
                    {loading
                      ? "Enviando..."
                      : "Cambiar correo →"}
                  </button>

                </form>

              </>
            )}


            {modal === "password" && (
              <>

                <div className="account-modal-icon">
                  🔐
                </div>

                <h2>Cambiar contraseña</h2>

                <p>
                  Crea una nueva contraseña
                  para proteger tu cuenta.
                </p>

                <form
                  onSubmit={handleChangePassword}
                  className="account-form"
                >

                  {providerId === "password" && (
                    <label>
                      Contraseña actual

                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) =>
                          setCurrentPassword(
                            e.target.value
                          )
                        }
                        placeholder="Contraseña actual"
                        required
                      />
                    </label>
                  )}

                  {providerId === "google.com" && (
                    <div className="account-info-note">
                      Para confirmar este cambio
                      se abrirá Google.
                    </div>
                  )}

                  <label>
                    Nueva contraseña

                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(e.target.value)
                      }
                      placeholder="Mínimo 6 caracteres"
                      minLength={6}
                      required
                    />
                  </label>

                  <label>
                    Confirmar contraseña

                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(
                          e.target.value
                        )
                      }
                      placeholder="Repite la contraseña"
                      minLength={6}
                      required
                    />
                  </label>

                  {error && (
                    <div className="account-error">
                      {error}
                    </div>
                  )}

                  {message && (
                    <div className="account-success">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="account-primary-button"
                    disabled={loading}
                  >
                    {loading
                      ? "Actualizando..."
                      : "Cambiar contraseña →"}
                  </button>

                </form>

              </>
            )}


            {modal === "photo" && (
              <>

                <div className="account-modal-icon">
                  📷
                </div>

                <h2>Cambiar foto</h2>

                <p>
                  Selecciona una imagen para
                  utilizarla como foto de perfil.
                </p>

                <div className="account-photo-upload">

                  <div className="account-photo-preview">

                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Foto actual"
                      />
                    ) : (
                      <span>{initial}</span>
                    )}

                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    disabled={loading}
                  />

                  <p>
                    JPG, PNG, WEBP o GIF.
                    Máximo 5 MB.
                  </p>

                </div>

                {error && (
                  <div className="account-error">
                    {error}
                  </div>
                )}

                {message && (
                  <div className="account-success">
                    {message}
                  </div>
                )}

              </>
            )}

          </div>

        </div>
      )}

    </main>
  );
}
