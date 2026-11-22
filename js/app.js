// --------- Variables ----------
const URL_PRODUCTOS = "data/productos.json";
const CLAVE_CARRITO = "carrito-iron-design";

const contenedorProductos = document.querySelector("#lista-productos");
const listaCarrito = document.querySelector("#lista-carrito");
const totalCarrito = document.querySelector("#total-carrito");
const contadorCarrito = document.querySelector("#contador-carrito");
const carritoVacio = document.querySelector("#carrito-vacio");
const accionesCarrito = document.querySelector("#acciones-carrito");
const btnVaciar = document.querySelector("#vaciar-carrito");

let productos = [];
let carrito = leerCarrito();

// --------- 1. Traer los datos con fetch ----------
async function cargarProductos() {
  try {
    const respuesta = await fetch(URL_PRODUCTOS);

    // fetch no tira error con 404: hay que chequearlo a mano
    if (!respuesta.ok) {
      throw new Error(`Error HTTP ${respuesta.status}`);
    }

    productos = await respuesta.json();
    renderizarProductos();
  } catch (error) {
    console.error("No se pudieron cargar los productos:", error);
    contenedorProductos.innerHTML =
      '<p class="mensaje-error">No pudimos cargar los productos. Probá recargar la página</p>';
  }
}

// ---------- 2. Dibujar las tarjetas ----------
function renderizarProductos() {
  contenedorProductos.innerHTML = "";

  productos.forEach((producto) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
        <a href="${producto.imagen}" target="_blank" rel="noopener" class="foto-link">
        <img src="${producto.imagen}" alt="${producto.alt}"  />
        </a>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
              <p class="precio">${formatearPrecio(producto.precio)}</p>
      <div class="botones-producto">
        <button type="button" class="btn-agregar" data-id="${producto.id}">
          Agregar al carrito
        </button>
        <a href="pages/contacto.html" class="btn-consultar">Consultar</a>
      </div>
      `;

    contenedorProductos.appendChild(tarjeta);
  });
}

// Formatea a pesos arg
function formatearPrecio(numero) {
  return numero.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

function leerCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado ? JSON.parse(guardado) : [];
}

function guardarCarrito() {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// --------- 3. Carrito ----------

function agregarAlCarrito(id) {
  const enCarrito = carrito.find((item) => item.id === id);

  if (enCarrito) {
    enCarrito.cantidad++;
  } else {
    const producto = productos.find((p) => p.id === id);
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
  }

  actualizarCarrito();
}

function cambiarCantidad(id, cambio) {
  const item = carrito.find((item) => item.id === id);
  if (!item) return;

  item.cantidad += cambio;

  //si llega a 0, se saca del carro
  if (item.cantidad <= 0) {
    elimidarDelCarrito(id);
    return;
  }

  actualizarCarrito();
}

function elimidarDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

// cada cambio pasa por acá: guarda y vuelve a dibujar
function actualizarCarrito() {
  guardarCarrito();
  renderizarCarrito();
}

function renderizarCarrito() {
  listaCarrito.innerHTML = "";

  carrito.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("item-carrito");

    li.innerHTML = `
        <span class="item-nombre">${item.nombre}</span>
        <div class="item-cantidad">
        <button type="button" data-accion="restar" data-id="${item.id}" aria-label="Restar uno">-</button>
        <span>${item.cantidad}</span>
        <button type="button" data-accion="sumar" data-id="${item.id}" aria-label="Sumar uno">+</button>
        </div>
        <span class="item-subtotal">${formatearPrecio(item.precio * item.cantidad)}</span>
      <button type="button" class="btn-eliminar" data-accion="eliminar" data-id="${item.id}" aria-label="Eliminar ${item.nombre}">✕</button>
    `;

    listaCarrito.appendChild(li);
  });

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0,
  );
  const unidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  totalCarrito.textContent = formatearPrecio(total);
  contadorCarrito.textContent = unidades;

  const estaVacio = carrito.length === 0;
  carritoVacio.hidden = !estaVacio;
  accionesCarrito.hidden = estaVacio;
}

// -------- 4. Eventos --------

// Un solo listener para todos los botones "Agregar" (delegación de eventos):
contenedorProductos.addEventListener("click", (evento) => {
  const boton = evento.target.closest(".btn-agregar");
  if (!boton) return;

  agregarAlCarrito(Number(boton.dataset.id));
});

listaCarrito.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button");
  if (!boton) return;

  const id = Number(boton.dataset.id);
  const accion = boton.dataset.accion;

  if (accion === "sumar") cambiarCantidad(id, 1);
  if (accion === "restar") cambiarCantidad(id, -1);
  if (accion === "eliminar") elimidarDelCarrito(id);
});

btnVaciar.addEventListener("click", vaciarCarrito);

// --------- 5. Arrancar ---------
renderizarCarrito();
cargarProductos();
