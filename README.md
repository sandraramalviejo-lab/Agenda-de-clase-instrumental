# Tu Viaje Musical — sitio web

Sitio web de la marca de materiales educativos de música **Tu Viaje Musical**.
Dos páginas: **Inicio** (`index.html`) y la ficha de producto de la
**Agenda Instrumental** (`producto.html`).

Es HTML + CSS + JS "de toda la vida", sin frameworks ni instalación de
nada — puedes abrirlo y editarlo con cualquier editor de texto.

```
├── index.html              → Página de Inicio
├── producto.html            → Página de producto (Agenda Instrumental)
├── css/
│   └── style.css            → Todos los estilos (colores, tipografías, espaciados)
├── js/
│   └── main.js               → Un par de detalles pequeños (no imprescindible)
└── assets/
    └── images/                → Fotos y logo (ahora mismo son placeholders)
```

---

## 1. Cómo previsualizar el resultado

**Opción rápida:** haz doble clic en `index.html` y se abrirá en tu
navegador. Funciona para ver el diseño, pero algunos navegadores
restringen la carga de imágenes al abrir el archivo así.

**Opción recomendada (sin instalar nada raro):**
- Si usas **Visual Studio Code**: instala la extensión gratuita
  "Live Server", clic derecho sobre `index.html` → "Open with Live Server".
  Se abrirá en el navegador y se recargará solo cada vez que guardes un cambio.
- Si tienes Python instalado: abre una terminal en la carpeta del
  proyecto y ejecuta:
  ```
  python3 -m http.server 8000
  ```
  Luego visita `http://localhost:8000` en el navegador.

---

## 2. Qué archivos tocar según lo que quieras cambiar

Todo el contenido editable está marcado en el código con comentarios
`<!-- EDITAR: ... -->`. Busca ese texto (Ctrl+F / Cmd+F) en el archivo
para encontrar rápidamente qué tocar.

| Quiero cambiar... | Archivo | Dónde |
|---|---|---|
| Textos (títulos, descripciones, "Sobre mí", FAQ...) | `index.html` / `producto.html` | Busca `EDITAR` |
| El **precio** de la agenda | `producto.html` | Busca `[PRECIO]` (aparece 2 veces: botón del hero y sección "Comprar") |
| El **enlace de Lulu** | `producto.html` | Busca `Comprar en Lulu`, cambia el `href="#"` por tu URL de Lulu |
| **Email / Instagram** del footer | `index.html` y `producto.html` | Busca `PLACEHOLDER: email real` |
| **Fotos** (portada, galería, logo) | `assets/images/` | Ver punto siguiente ⬇️ |
| Colores, tipografías, espaciados | `css/style.css` | Los colores de marca están arriba del todo, en `:root` |

### Cómo sustituir las fotos

Ahora mismo las imágenes son placeholders (recuadros punteados con un
icono y una etiqueta) para que puedas ver el diseño completo sin tener
las fotos todavía. Hay dos formas de ponerlas reales:

1. **La más fácil:** cuando tengas la foto, renómbrala exactamente
   igual que el archivo que sustituye (por ejemplo, tu foto de portada
   pásala a `.jpg` y llámala `portada-agenda-placeholder.jpg`) y
   además cambia la extensión en el `src` del HTML correspondiente
   (busca `EDITAR` justo encima de cada `<img>`).
2. O simplemente sube tu foto a `assets/images/` con el nombre que
   quieras y cambia el `src="assets/images/..."` de esa imagen en el
   HTML para que apunte a tu archivo nuevo.

Imágenes a sustituir:
- `assets/images/logo-placeholder.svg` — logo de la marca (aparece en el menú de ambas páginas)
- `assets/images/portada-agenda-placeholder.svg` — portada de la agenda (Inicio y producto)
- `assets/images/galeria-1-placeholder.svg` a `galeria-4-placeholder.svg` — páginas interiores de la agenda (solo en producto.html)

---

## 3. Cómo publicar el sitio (GitHub Pages)

GitHub Pages es gratuito, funciona directamente desde este mismo
repositorio, y es la opción más sencilla si no tienes experiencia técnica.

1. Asegúrate de que tus cambios están subidos ("pusheados") a GitHub,
   en la rama que quieras publicar (normalmente `main`).
2. En GitHub, entra en tu repositorio → pestaña **Settings** (Ajustes).
3. En el menú lateral, entra en **Pages**.
4. En "Build and deployment" → "Source", elige **Deploy from a branch**.
5. En "Branch", elige la rama (`main`) y la carpeta **/ (root)** → **Save**.
6. Espera 1-2 minutos. GitHub te mostrará la URL pública, con esta forma:
   ```
   https://sandraramalviejo-lab.github.io/agenda-de-clase-instrumental/
   ```
7. Cada vez que subas cambios nuevos a esa rama, el sitio se actualiza solo
   (tarda uno o dos minutos en verse reflejado).

> Nota: este proyecto ya incluye un archivo `.nojekyll` en la raíz, que le
> dice a GitHub Pages que sirva los archivos tal cual (sin pasarlos por su
> generador de blogs Jekyll) — no necesitas hacer nada con ese archivo.

---

## 4. Cómo conectar tu propio dominio (Namecheap, nic.es, etc.)

Una vez el sitio ya funciona en la URL de `github.io` del paso anterior,
puedes apuntar tu propio dominio (el que compres en Namecheap, nic.es,
o donde sea) para que la web se vea en, por ejemplo, `tuviajemusical.com`.

### Paso A — Decide si quieres el dominio "raíz" (apex) o con "www"

- Dominio raíz / apex: `tuviajemusical.com`
- Subdominio www: `www.tuviajemusical.com`

Lo habitual es configurar **ambos**, y que uno redirija al otro. Abajo
tienes los registros DNS para los dos casos.

### Paso B — Añade estos registros DNS en tu proveedor del dominio

Entra en el panel de tu registrador (en Namecheap: "Domain List" → tu
dominio → **Manage** → pestaña **Advanced DNS**; en nic.es: la sección
de gestión de DNS de tu dominio) y añade estos registros:

**Para el dominio raíz** (`tuviajemusical.com`) — 4 registros tipo **A**,
todos apuntando al mismo "Host" (`@`), cada uno con una de estas IPs de
GitHub Pages:

| Tipo | Host | Valor |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**Para el subdominio www** (`www.tuviajemusical.com`) — 1 registro tipo
**CNAME**:

| Tipo | Host | Valor |
|---|---|---|
| CNAME | www | sandraramalviejo-lab.github.io. |

*(Nota: el punto final en `github.io.` es opcional según el proveedor;
si tu panel da error con el punto, quítalo.)*

Si tu proveedor también permite registros **AAAA** (IPv6) y quieres
añadirlos (opcional, no imprescindible), estos son los de GitHub Pages
para el dominio raíz:

| Tipo | Host | Valor |
|---|---|---|
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |

### Paso C — Dile a GitHub cuál es tu dominio

1. En GitHub: repositorio → **Settings** → **Pages**.
2. En "Custom domain", escribe tu dominio (por ejemplo
   `www.tuviajemusical.com` o `tuviajemusical.com`) y pulsa **Save**.
   Esto crea automáticamente un archivo `CNAME` en tu repositorio — no
   necesitas crearlo tú a mano.
3. Espera a que GitHub compruebe el DNS (puede tardar desde minutos
   hasta 24-48h mientras se propaga el cambio en internet). Verás un
   aviso verde de "DNS check successful" cuando esté listo.
4. Marca la casilla **Enforce HTTPS** en cuanto esté disponible, para
   que el sitio se sirva de forma segura (candado en el navegador).

### Resumen rápido

1. Compra el dominio (Namecheap, nic.es...).
2. En el panel DNS del dominio: añade los 4 registros **A** apuntando a
   las IPs de GitHub Pages (Paso B) y, si quieres `www`, el **CNAME**.
3. En GitHub → Settings → Pages: escribe tu dominio en "Custom domain" y
   guarda.
4. Espera a que se propague el DNS y activa "Enforce HTTPS".

---

## Pendiente de completar (marcado en el código)

- [ ] Precio real de la agenda (`[PRECIO]` en `producto.html`)
- [ ] Enlace real de Lulu (`href="#"` junto a "Comprar en Lulu")
- [ ] Email e Instagram reales (footer de ambas páginas)
- [ ] Fotos reales: portada, logo y las 4 imágenes de la galería "Por dentro"
- [ ] Tamaño/dimensiones exactas de la agenda (FAQ en `producto.html`)
- [ ] Zonas de envío y plazos (FAQ en `producto.html`)
