// Array para almacenar la lista de amigos
let amigos = [];

// Función para actualizar la lista visual (ul) en el HTML
function actualizarLista() {
  const listaElement = document.getElementById("listaAmigos");
  listaElement.innerHTML = ""; // Limpia la lista antes de volverla a renderizar

  amigos.forEach((amigo) => {
    const li = document.createElement("li");
    li.textContent = amigo;
    listaElement.appendChild(li);
  });
}

// Función para agregar un nuevo amigo
function agregarAmigo() {
  const input = document.getElementById("amigo");
  const nombre = input.value.trim();

  // Evitar agregar cadenas vacías o con solo espacios
  if (nombre !== "") {
    amigos.push(nombre);
    actualizarLista();
    input.value = ""; // Limpia el input
  } else {
    alert("Por favor, ingresa un nombre válido.");
  }
}

// Función para generar una permutación aleatoria (Fisher-Yates)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Función para crear una permutación sin puntos fijos (nadie se asigna a sí mismo)
// La forma sencilla de hacerlo es 'rebarajar' hasta que no haya coincidencias de índice.
function generarDerangement(indices) {
  let valido = false;
  while (!valido) {
    shuffle(indices);
    valido = indices.every((val, idx) => val !== idx);
  }
  return indices;
}

// Función principal para sortear amigo secreto
function sortearAmigo() {
  const n = amigos.length;
  
  // Debe haber al menos 2 personas para sortear
  if (n < 2) {
    alert("Se necesitan al menos 2 amigos para poder hacer un sorteo.");
    return;
  }
  
  // Limpiamos la zona de resultados
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.innerHTML = "";

  // Generamos un arreglo de índices [0, 1, 2, ... , n-1]
  let indices = Array.from({ length: n }, (_, i) => i);
  // Obtenemos un derangement de esos índices
  indices = generarDerangement(indices);

  // Creamos la asignación: amigo[i] -> amigo[indices[i]]
  for (let i = 0; i < n; i++) {
    // Ejemplo de texto: "El amigo secreto de Carlos es Ana"
    const li = document.createElement("li");
    li.textContent = `El amigo secreto de ${amigos[i]} es ${amigos[indices[i]]}`;
    resultadoElement.appendChild(li);
  }
}
