// Importar las funciones necesarias desde Firebase SDK
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Inicializa Firebase (esto ya se debe haber hecho en firebase-config.js)
import { app } from "./firebase-config.js";

// Función para manejar el inicio de sesión
document.getElementById("login-btn").addEventListener("click", function(event) {
  event.preventDefault();  // Evitar el envío del formulario por defecto

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Obtener la instancia de auth
  const auth = getAuth(app);

  // Iniciar sesión con correo y contraseña
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Inicio de sesión exitoso
      const user = userCredential.user;
      console.log("Usuario autenticado:", user);

      // Redirigir a la página admin.html
      window.location.href = "/admin/";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error("Error de autenticación:", errorCode, errorMessage);

      // Mostrar errores en el formulario
      if (errorCode === "auth/wrong-password") {
        document.getElementById("password-error").textContent = "Contraseña incorrecta.";
      } else if (errorCode === "auth/user-not-found") {
        document.getElementById("email-error").textContent = "Usuario no encontrado.";
      } else {
        document.getElementById("email-error").textContent = "Error: " + errorMessage;
      }
    });
});