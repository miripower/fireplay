# Fireplay

**Fireplay** es una aplicación web moderna para explorar un catálogo de videojuegos, ver detalles de cada juego, añadir juegos a favoritos, gestionar un carrito de compra y mucho más. Este proyecto utiliza tecnologías modernas como **Next.js**, **Firebase** y la **API de RAWG** para ofrecer una experiencia de usuario atractiva y funcional. 

Ha sido diseñada por **Pol Miret**.

---

## Descripción del proyecto

Fireplay permite a los usuarios:

- Explorar un catálogo de videojuegos.
- Ver detalles de cada juego, incluyendo capturas de pantalla y descripciones.
- Añadir juegos a favoritos para un acceso rápido.
- Gestionar un carrito de compra y realizar compras simuladas.
- Buscar juegos por nombre o género.
- Autenticarse y guardar datos de usuario utilizando Firebase.

El proyecto está diseñado para ser **responsive** y ofrecer una experiencia fluida en dispositivos móviles y de escritorio.

---

## Instrucciones de instalación

Sigue estos pasos para instalar y ejecutar el proyecto en tu entorno local:

1. **Clona el repositorio**:
   ```
   git clone https://github.com/tu-usuario/fireplay.git
   cd fireplay
   ```

2. **Instala las dependencias**: Asegúrate de tener Node.js instalado en tu sistema. Luego, ejecuta:
   ```
   npm install
   ```

3. **Configura las variables de entorno**: Crea un archivo `.env.local` en la raíz del proyecto y añade las siguientes variables:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
   NEXT_PUBLIC_FIREBASE_APP_ID=
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
   NEXT_PUBLIC_RAWG_API_KEY=
   NEXT_PUBLIC_RAWG_API_URL=https://api.rawg.io/api
   ```

4. **Inicia el servidor de desarrollo**:
   ```
   npm run dev
   ```

5. **Abre la aplicación en tu navegador**: Ve a `http://localhost:3000` para ver la aplicación en acción.

---

## Tecnologías utilizadas

- **Next.js**: Framework de React para renderizado en el servidor y generación de sitios estáticos.
- **React**: Biblioteca para construir interfaces de usuario.
- **Firebase**: Plataforma para autenticación y persistencia de datos.
- **RAWG API**: API externa para obtener datos de videojuegos.
- **Tailwind CSS**: Framework de CSS para estilos rápidos y personalizados.
- **TypeScript**: Superset de JavaScript para tipado estático.
- **ESLint**: Herramienta para mantener un código limpio y consistente.

---

## Características principales

- **Catálogo de videojuegos**: Explora una amplia variedad de juegos con detalles completos.
- **Autenticación**: Inicia sesión para guardar favoritos y gestionar el carrito.
- **Carrito de compra**: Añade juegos al carrito y simula compras.
- **Búsqueda avanzada**: Encuentra juegos por nombre o género.
- **Historial de compras**: Consulta tus compras anteriores en el dashboard.

---

¡Espero que disfrutes usando Fireplay tanto como yo disfruté construyéndola!
