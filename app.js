import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAfmDczuEytmQCA_2-NRcGXdJwgCjlNBfE",
  authDomain: "medisuivi-de47a.firebaseapp.com",
  projectId: "medisuivi-de47a",
  storageBucket: "medisuivi-de47a.firebasestorage.app",
  messagingSenderId: "205914794813",
  appId: "1:205914794813:web:23748d04b1e614d66d7354",
  measurementId: "G-ZD39Q76S5L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

async function signInWithGoogle() {
  try { 
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    throw error;
  }
}

function hasUppercase(password) {
  return /[A-Z]/.test(password);
}

function hasSpecialChar(password) {
  return /[^A-Za-z0-9]/.test(password);
}

function setMessage(elementId, text, type = "") {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.textContent = text;
  element.classList.remove("error", "success");

  if (type) {
    element.classList.add(type);
  }
}

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function getFirebaseErrorMessage(error) {
  switch (error.code) {
    case "auth/invalid-email":
      return "L'adresse e-mail est invalide.";
    case "auth/missing-password":
      return "Le mot de passe est obligatoire.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "E-mail ou mot de passe incorrect.";
    case "auth/email-already-in-use":
      return "Un compte existe déjà avec cette adresse e-mail.";
    case "auth/weak-password":
      return "Le mot de passe est trop faible.";
    case "auth/too-many-requests":
      return "Trop de tentatives. Réessaie plus tard.";
    case "auth/popup-closed-by-user":
      return "La fenêtre de connexion Google a été fermée avant la fin.";
    case "auth/cancelled-popup-request":
      return "La demande de connexion Google a été annulée.";
    case "auth/popup-blocked":
      return "La fenêtre popup a été bloquée par le navigateur.";
    case "auth/account-exists-with-different-credential":
      return "Un compte existe déjà avec cette adresse e-mail via une autre méthode de connexion.";
    default:
      return `Erreur Firebase : ${error.message}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;

  // PAGE CONNEXION
if (page === "login") {
  const loginForm = document.getElementById("login-form");
  const googleLoginButton = document.getElementById("google-login-button");

  loginForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      setMessage("login-message", "Veuillez renseigner l'e-mail et le mot de passe.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setMessage("login-message", "L'adresse e-mail saisie n'est pas valide.", "error");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setMessage("login-message", `Connexion réussie : ${user.email}`, "success");
      window.location.href = "dashboard.html";
    } catch (error) {
      setMessage("login-message", getFirebaseErrorMessage(error), "error");
    }
  });

  googleLoginButton?.addEventListener("click", async () => {
    try {
      const user = await signInWithGoogle();
      setMessage("login-message", `Connexion Google réussie : ${user.email}`, "success");
      window.location.href = "dashboard.html";
    } catch (error) {
      setMessage("login-message", getFirebaseErrorMessage(error), "error");
    }
  });
}
  

  // PAGE INSCRIPTION
  if (page === "register") {
    const registerForm = document.getElementById("register-form");

    registerForm?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("register-name").value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value;
      const passwordConfirm = document.getElementById("register-password-confirm").value;

      if (!name || !email || !password || !passwordConfirm) {
        setMessage("register-message", "Tous les champs sont obligatoires.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        setMessage("register-message", "L'adresse e-mail saisie n'est pas valide.", "error");
        return;
      }

      if (password.length < 6) {
        setMessage("register-message", "Le mot de passe doit comporter au moins 6 caractères.", "error");
        return;
      }

      if (!hasUppercase(password)) {
        setMessage("register-message", "Le mot de passe doit contenir au moins une majuscule.", "error");
        return;
      }

      if (!hasSpecialChar(password)) {
        setMessage("register-message", "Le mot de passe doit contenir au moins un caractère spécial.", "error");
        return;
      }

      if (password !== passwordConfirm) {
        setMessage("register-message", "Les mots de passe ne correspondent pas.", "error");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(userCredential.user, {
          displayName: name
        });

        setMessage("register-message", "Compte créé avec succès.", "success");
        window.location.href = "dashboard.html";
      } catch (error) {
        setMessage("register-message", getFirebaseErrorMessage(error), "error");
      }
    });
  }

  // PAGE MOT DE PASSE OUBLIE
  if (page === "forgot-password") {
    const forgotForm = document.getElementById("forgot-password-form");

    forgotForm?.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("forgot-email").value.trim();

      if (!email) {
        setMessage("forgot-message", "Veuillez saisir votre adresse e-mail.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        setMessage("forgot-message", "L'adresse e-mail saisie n'est pas valide.", "error");
        return;
      }

      try {
        await sendPasswordResetEmail(auth, email);

        setMessage(
          "forgot-message",
          "E-mail de réinitialisation envoyé. Vérifiez votre boîte mail.",
          "success"
        );
      } catch (error) {
        setMessage("forgot-message", getFirebaseErrorMessage(error), "error");
      }
    });
  }

  // PAGE DASHBOARD
  if (page === "dashboard") {
    const userDisplay = document.getElementById("user-display");
    const logoutButton = document.getElementById("logout-button");
    const logoutLink = document.getElementById("logout-link");

    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (userDisplay) {
          userDisplay.textContent = user.displayName
            ? `${user.displayName} (${user.email})`
            : user.email;
        }
      } else {
        window.location.href = "index.html";
      }
    });

    const logoutHandler = async (event) => {
      event.preventDefault();

      try {
        await signOut(auth);
        setMessage("dashboard-message", "Déconnexion réussie.", "success");
        window.location.href = "index.html";
      } catch (error) {
        setMessage("dashboard-message", getFirebaseErrorMessage(error), "error");
      }
    };

    logoutButton?.addEventListener("click", logoutHandler);
    logoutLink?.addEventListener("click", logoutHandler);
  }
});