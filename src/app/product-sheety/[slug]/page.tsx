import { notFound } from "next/navigation"
import { getGameDetails } from "@/lib/api"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import GameRating from "@/components/game-rating"
import AddToCartButton from "@/components/add-to-cart-button"
import GameReviews from "@/components/game-reviews"

interface ProductSheetyPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProductSheetyPage({ params }: ProductSheetyPageProps) {
    const resolvedParams = await params

    try {
        const game = await getGameDetails(resolvedParams.slug)

        // Calculate fictional price based on rating
        const price = (Math.floor(game.rating * 10) + 5).toFixed(2)

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href={`/game/${resolvedParams.slug}`} className="inline-flex items-center text-gray-400 hover:text-white">
                        <ArrowLeft size={16} className="mr-2" />
                        Volver a la página del juego
                    </Link>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{game.name} - Ficha técnica</h1>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left column - Image and price */}
                            <div>
                                <img
                                    src={game.background_image || "/placeholder.svg"}
                                    alt={game.name}
                                    className="w-full rounded-lg mb-4"
                                />

                                <div className="bg-gray-700 rounded-lg p-4">
                                    <div className="mb-4">
                                        <GameRating rating={game.rating} />
                                    </div>

                                    <div className="text-3xl font-bold text-green-400 mb-4">{price}€</div>

                                    <AddToCartButton game={game} />
                                </div>
                            </div>

                            {/* Middle column - Technical details */}
                            <div>
                                <h2 className="text-xl font-bold mb-4">Especificaciones técnicas</h2>

                                <div className="space-y-4">
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <h3 className="font-bold mb-2">Requisitos mínimos</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li>
                                                <span className="text-gray-400">Sistema:</span> Windows 10 64-bit
                                            </li>
                                            <li>
                                                <span className="text-gray-400">Procesador:</span> Intel Core i5-2500K / AMD Ryzen 3 1200
                                            </li>
                                            <li>
                                                <span className="text-gray-400">Memoria:</span> 8 GB RAM
                                            </li>
                                            <li>
                                                <span className="text-gray-400">Gráficos:</span> NVIDIA GTX 770 2GB / AMD Radeon R9 280 3GB
                                            </li>
                                            <li>
                                                <span className="text-gray-400">Almacenamiento:</span> 70 GB
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <h3 className="font-bold mb-2">Requisitos recomendados</h3>
                                        <ul className="space-y-2 text-sm">
                                            <li>
                                                <span className="text-gray-400">Sistema:</span> Windows 10 64-bit
                                            </li>
                                            <li>
                                                <span className="text-gray-400">Procesador:</span> Intel Core i7-4770K / AMD Ryzen 5 1500X
                                            </li>
                                            <li>
                                                <span className="text-gray-400">Memoria:</span> 16 GB RAM
                                            </li>
                                            <li>
                                                <span className="text-gray-400">Gráficos:</span> NVIDIA GTX 1060 6GB / AMD RX 580 8GB
                                            </li>
                                            <li>
                                                <span className="text-gray-400">Almacenamiento:</span> 70 GB SSD
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Right column - Additional info */}
                            <div>
                                <h2 className="text-xl font-bold mb-4">Información adicional</h2>

                                <div className="bg-gray-700 p-4 rounded-lg mb-4">
                                    <h3 className="font-bold mb-2">Idiomas disponibles</h3>
                                    <ul className="space-y-1 text-sm">
                                        <li>Inglés (Audio y Subtítulos)</li>
                                        <li>Español (Audio y Subtítulos)</li>
                                        <li>Francés (Audio y Subtítulos)</li>
                                        <li>Alemán (Audio y Subtítulos)</li>
                                        <li>Italiano (Audio y Subtítulos)</li>
                                        <li>Portugués (Subtítulos)</li>
                                        <li>Ruso (Audio y Subtítulos)</li>
                                        <li>Japonés (Audio y Subtítulos)</li>
                                    </ul>
                                </div>

                                <div className="bg-gray-700 p-4 rounded-lg">
                                    <h3 className="font-bold mb-2">Características</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="bg-gray-600 text-xs px-2 py-1 rounded">Un jugador</span>
                                        <span className="bg-gray-600 text-xs px-2 py-1 rounded">Multijugador</span>
                                        <span className="bg-gray-600 text-xs px-2 py-1 rounded">Logros</span>
                                        <span className="bg-gray-600 text-xs px-2 py-1 rounded">Control remoto</span>
                                        <span className="bg-gray-600 text-xs px-2 py-1 rounded">Guardado en la nube</span>
                                        {game.tags?.slice(0, 5).map((tag) => (
                                            <span key={tag.id} className="bg-gray-600 text-xs px-2 py-1 rounded">
                                                {tag.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews section */}
                    <div className="border-t border-gray-700 p-6">
                        <h2 className="text-2xl font-bold mb-6">Opiniones de usuarios</h2>
                        <GameReviews gameName={game.name} />
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error loading game:", error)
        notFound()
    }
}