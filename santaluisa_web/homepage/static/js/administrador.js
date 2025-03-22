// Inicializa la app de Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para cargar los datos en la tabla
async function cargarDatos() {
  // Referencia a las colecciones
  const usuariosRef = collection(db, "usuarios");
  const asistenciaRef = collection(db, "asistencia");
  const claseRef = collection(db, "clase");

  // Obtener los datos de cada colección
  const usuariosSnapshot = await getDocs(usuariosRef);
  const asistenciaSnapshot = await getDocs(asistenciaRef);
  const claseSnapshot = await getDocs(claseRef);

  // Recorrer los documentos de cada colección y almacenarlos
  const usuarios = usuariosSnapshot.docs.map(doc => doc.data());
  const asistencia = asistenciaSnapshot.docs.map(doc => doc.data());
  const clases = claseSnapshot.docs.map(doc => doc.data());

  // Llamar a la función que va a llenar la tabla con los datos
  mostrarDatosEnTabla(usuarios, asistencia, clases);
}

// Función para insertar los datos en la tabla
function mostrarDatosEnTabla(usuarios, asistencia, clases) {
  // Obtener el cuerpo de la tabla donde se agregarán las filas
  const tablaTalleres = document.getElementById("tabla-talleres");

  // Limpiar la tabla antes de agregar los nuevos datos
  tablaTalleres.innerHTML = "";

  // Recorrer las asistencias y agregar las filas
  asistencia.forEach(asistenciaItem => {
    // Buscar el usuario correspondiente a la asistencia
    const usuario = usuarios.find(u => u.id === asistenciaItem.usuarioId);
    const clase = clases.find(c => c.id === asistenciaItem.claseId);

    if (usuario && clase) {
      // Crear una nueva fila para la tabla
      const fila = document.createElement("tr");

      // Crear las celdas de la fila
      const celdaTaller = document.createElement("td");
      celdaTaller.textContent = clase.nombre; // Nombre del taller (clase)
      fila.appendChild(celdaTaller);

      const celdaFecha = document.createElement("td");
      celdaFecha.textContent = asistenciaItem.fecha; // Fecha de la asistencia
      fila.appendChild(celdaFecha);

      const celdaAsistentes = document.createElement("td");
      celdaAsistentes.textContent = asistenciaItem.asistentes.join(", "); // Lista de asistentes
      fila.appendChild(celdaAsistentes);

      const celdaAcciones = document.createElement("td");
      celdaAcciones.innerHTML = '<button class="btn btn-danger">Eliminar</button>'; // Acción de eliminar
      fila.appendChild(celdaAcciones);

      // Agregar la fila a la tabla
      tablaTalleres.appendChild(fila);
    }
  });
}

// Llamar a la función para cargar los datos cuando se carga la página
cargarDatos();