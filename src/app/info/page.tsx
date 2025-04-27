import { Code, Database, Globe, Layers, Palette, Server } from "lucide-react"

export default function InfoPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Información del proyecto</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Sobre Fireplay</h2>
                    <p className="text-gray-300 mb-4">
                        Esta aplicación web es un proyecto desarrollado por Pol Miret.
                    </p>
                    <p className="text-gray-300 mb-4">
                        Fireplay es una aplicación web moderna que simula una tienda de videojuegos online. Ha sido desarrollada
                        como proyecto educativo para demostrar el uso de tecnologías modernas en el desarrollo web.
                    </p>
                    <p className="text-gray-300">
                        La aplicación permite a los usuarios explorar un catálogo de videojuegos, ver detalles de cada juego, añadir
                        juegos a favoritos, gestionar un carrito de compra y mucho más.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Objetivos del proyecto</h2>
                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                        <li>Desarrollar una aplicación web completa con tecnologías modernas</li>
                        <li>Implementar autenticación y persistencia de datos con Firebase</li>
                        <li>Crear una interfaz de usuario atractiva y responsive</li>
                        <li>Integrar una API externa (RAWG) para obtener datos de videojuegos</li>
                        <li>Aplicar buenas prácticas de desarrollo y arquitectura</li>
                        <li>Implementar funcionalidades como favoritos, carrito y búsqueda</li>
                        <li>Desarrollar una Progressive Web App (PWA) con manifest.json y service worker</li>
                    </ul>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Tecnologías utilizadas</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                            <Code size={24} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold">Next.js 15</h3>
                    </div>
                    <p className="text-gray-300">
                        Framework de React que permite crear aplicaciones web modernas con renderizado en el servidor, generación
                        estática y mucho más. Se ha utilizado el App Router para la gestión de rutas.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                            <Globe size={24} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold">React 19</h3>
                    </div>
                    <p className="text-gray-300">
                        Biblioteca JavaScript para construir interfaces de usuario. Se han utilizado características modernas como
                        hooks, context y componentes funcionales.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                            <Palette size={24} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold">Tailwind CSS 4</h3>
                    </div>
                    <p className="text-gray-300">
                        Framework CSS utilitario que permite crear diseños personalizados sin salir del HTML. Se ha utilizado para
                        crear una interfaz moderna y responsive.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                            <Database size={24} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold">Firebase</h3>
                    </div>
                    <p className="text-gray-300">
                        Plataforma de desarrollo de aplicaciones que proporciona autenticación, base de datos en tiempo real y
                        almacenamiento. Se ha utilizado para la autenticación de usuarios y para almacenar datos como favoritos y
                        mensajes.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                            <Server size={24} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold">RAWG API</h3>
                    </div>
                    <p className="text-gray-300">
                        API externa que proporciona información sobre videojuegos. Se ha utilizado para obtener datos como títulos,
                        imágenes, descripciones y valoraciones.
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                            <Layers size={24} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold">Axios</h3>
                    </div>
                    <p className="text-gray-300">
                        Librería de cliente HTTP utilizada para realizar peticiones a APIs de forma sencilla y eficiente. Permite enviar y recibir datos
                        con soporte para Promesas, manejo de errores y configuración de cabeceras personalizadas.
                    </p>
                </div>

            </div>
        </div>
    )
}
