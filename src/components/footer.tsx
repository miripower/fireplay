import Link from "next/link"
import { Github, Linkedin } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-gray-800 border-t border-gray-700">
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-lg font-bold mb-4">Fireplay</h3>
                        <p className="text-gray-400 mb-4">
                            Tu tienda de videojuegos online con los mejores precios y ofertas exclusivas.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.linkedin.com/in/pol-miret-vidal/" target="blank" className="text-gray-400 hover:text-white">
                                <Linkedin size={20} />
                            </a>
                            <a href="https://github.com/miripower" target="blank" className="text-gray-400 hover:text-white">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Navegación</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-400 hover:text-white">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/games" className="text-gray-400 hover:text-white">
                                    Juegos
                                </Link>
                            </li>
                            <li>
                                <Link href="/info" className="text-gray-400 hover:text-white">
                                    Información
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Mi cuenta</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/login" className="text-gray-400 hover:text-white">
                                    Iniciar sesión
                                </Link>
                            </li>
                            <li>
                                <Link href="/register" className="text-gray-400 hover:text-white">
                                    Registrarse
                                </Link>
                            </li>
                            <li>
                                <Link href="/favorites" className="text-gray-400 hover:text-white">
                                    Mis favoritos
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-gray-400 hover:text-white">
                                    Mi carrito
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-4">Información legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Términos y condiciones
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Política de privacidad
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Política de cookies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    Aviso legal
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>© {currentYear} Fireplay. Todos los derechos reservados.</p>
                    <p className="mt-2 text-sm">Desarrollado por Pol Miret</p>
                </div>
            </div>
        </footer>
    )
}
