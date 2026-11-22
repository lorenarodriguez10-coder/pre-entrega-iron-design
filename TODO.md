# Iron Design · Talento Tech

- Para subir cambios: git add . → git commit -m "..." → git push
- Links de entrega:
  - Repo: https://github.com/lorenarodriguez10-coder/pre-entrega-iron-design
  - Sitio: https://lorenarodriguez10-coder.github.io/pre-entrega-iron-design/

---

# Entrega final (en curso)

## Consigna

### Entrega mínima

- [x] Productos consultados vía HTTP con fetch (JSON local)
- [x] Tarjetas de productos renderizadas desde JavaScript

### Entrega completa

- [x] Todo lo anterior
- [x] Carrito funcionando con localStorage

### Al entregar

- [ ] Commit + push
- [ ] Probar en GitHub Pages (no solo en Live Server)
- [ ] Entregar en el campus y tocar "Enviar tarea" (no dejar en borrador)

## Tareas

- [x] Paso 1: data/productos.json con los 6 productos
- [x] Paso 2: vaciar los article del index, dejar div#lista-productos y conectar js/app.js
- [x] Paso 3: fetch al JSON + renderizar las tarjetas desde JS
- [x] Paso 4: carrito (agregar, sumar/restar, eliminar, vaciar, total) + localStorage
- [ ] Paso 5: estilos del carrito
- [ ] Corregir `.marca { font-size: 2.2 }` → falta la unidad: `2.2rem`
- [ ] Sacar TODO.md del repo: `git rm --cached TODO.md` (el .gitignore no saca lo que ya estaba subido)

## Bitácora

- 16/11: productos.json creado. Errores encontrados: faltaban `:` en los id
  y sobraba una coma después del último campo de un objeto.
- 22/11: app.js conectado. Productos con fetch desde data/productos.json y
  tarjetas renderizadas con JS (entrega mínima). Precio formateado con
  toLocaleString es-AR. Carrito con localStorage: agregar, sumar/restar,
  eliminar, vaciar, total y contador en el nav (entrega completa).
  Errores del día: backtick vs tilde, "prducto", comilla sin cerrar en
  item-nombre, data-accion "sumar" en el botón de restar.
  Pendiente: paso 5 (CSS del carrito).

---

# Pre-entrega (entregada ✓)

## Consigna

- [x] Estructura de carpetas (css, img, pages)
- [x] CSS enlazado por archivo externo
- [x] Repo en GitHub + GitHub Pages
- [x] index.html con los productos
- [x] pages/contacto.html con formulario (Formspree)
- [x] Etiquetas semánticas
- [x] Flex para el posicionamiento
- [x] Sin desbordes en pantallas chicas (probar con el inspector)
- [x] Sin CSS inline ni <style>

## Tareas

- [x] Header con nav
- [x] Tarjetas de productos
- [x] Footer
- [x] Footer en contacto.html (con div.contenedor)
- [x] Formulario de contacto
- [x] Cambiar los src de cada producto (todos usan mesa-ratona)
- [x] Fotos de los productos (nombres en minúscula, sin espacios)
- [x] Paleta de colores
- [x] Tipografía

## Bitácora

- 25/09: repo creado, estructura inicial, Pages activo.
- 26/09: header, productos y footer terminados. Responsive probado a 375px.
- 01/10: contacto.html con formulario Formspree y estilos. Media query
  para header/footer. focus-visible en links y botones. Conversión
  a 62.5% (pedido de la profe). CSS organizado y brevemente comentado.
- 03/10: fotos reales de los 6 productos (object-fit: contain para que
  se vean enteras). Cada foto abre en pestaña nueva (link con target="\_blank").
  Botón Consultar pasa a clase .btn-consultar. Nombre "Iron Design" en el
  header junto al logo. Tipografía: Oswald (títulos) + Inter (texto) con
  Google Fonts. "Productos" pasa a h1.
