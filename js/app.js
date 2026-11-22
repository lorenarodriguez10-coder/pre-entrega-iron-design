// --------- Variables ----------
const URL_PRODUCTOS = "data/productos.json";
const contenedorProductos = document.querySelector("#lista-productos");

let productos = [];

// --------- 1. Treaer los datos con fetch ----------
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
      '<p class="mensaje-error">No pudimos cargar los producotos. Probá recargar la página</p>';
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
        <p class="precio">$${producto.precio}</p> 
        <a href="pages/contacto.html" class="btn-consultar">consultar</a>
        `;

    contenedorProductos.appendChild(tarjeta);
  });
}

// --------- 3. Arrancar ---------
cargarProductos();
