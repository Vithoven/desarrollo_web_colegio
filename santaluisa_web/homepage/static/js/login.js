// Importar las funciones necesarias desde Firebase SDK
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Inicializa Firebase (esto ya se debe haber hecho en firebase-config.js)
import { app } from "./firebase-config.js";

// Obtener la instancia de auth
const auth = getAuth(app);

// Función para manejar el inicio de sesión
async function login() {
  event.preventDefault();  // Evitar el envío del formulario por defecto
  console.log("Botón de login presionado");

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Limpiar mensajes de error previos
  document.getElementById("email-error").textContent = "";
  document.getElementById("password-error").textContent = "";

  // Validar que los campos no estén vacíos
  if (!email || !password) {
    document.getElementById("email-error").textContent = "El correo y la contraseña son obligatorios.";
    return;
  }

  try {
    // Intentar iniciar sesión
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuario autenticado:", userCredential.user);
    window.location.href = "/administrador/";  // Aquí cambiaste a la ruta correcta
  } catch (error) {
    console.error("Error de autenticación:", error.code, error.message);

    switch (error.code) {
      case "auth/wrong-password":
        document.getElementById("password-error").textContent = "Contraseña incorrecta.";
        break;
      case "auth/user-not-found":
        document.getElementById("email-error").textContent = "Usuario no encontrado.";
        break;
      case "auth/too-many-requests":
        document.getElementById("email-error").textContent = "Demasiados intentos. Inténtelo más tarde.";
        break;
      case "auth/network-request-failed":
        document.getElementById("email-error").textContent = "Error de conexión. Verifique su red.";
        break;
      default:
        document.getElementById("email-error").textContent = "Error: " + error.message;
    }
  }
}
// Hacer accesible la función desde el HTML
window.login = login;