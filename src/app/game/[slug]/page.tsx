import { notFound } from "next/navigation"
import { getGameDetails, getGameScreenshots } from "@/lib/api"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import GameScreenshots from "@/components/game-screenshots"
import GamePlatforms from "@/components/game-platforms"
import GameRating from "@/components/game-rating"
import AddToCartButton from "@/components/add-to-cart-button"

interface GamePageProps {
    params: {
        slug: string
    }
}

export default async function GamePage({ params }: GamePageProps) {
    try {
        const game = await getGameDetails(params.slug)
        const screenshots = await getGameScreenshots(game.id)

        // Calculate fictional price based on rating
        const price = (Math.floor(game.rating * 10) + 5).toFixed(2)

        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/games" className="inline-flex items-center text-gray-400 hover:text-white">
                        <ArrowLeft size={16} className="mr-2" />
                        Volver al catálogo
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main content - 2/3 width on desktop */}
                    <div className="lg:col-span-2">
                        <h1 className="text-3xl font-bold mb-4">{game.name}</h1>

                        {/* Game screenshots */}
                        <GameScreenshots screenshots={screenshots} />

                        {/* Game description */}
                        <div className="mt-8">
                            <h2 className="text-xl font-bold mb-4">Descripción</h2>
                            <div className="text-gray-300 space-y-4" dangerouslySetInnerHTML={{ __html: game.description }} />
                        </div>

                        {/* Game details */}
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-bold mb-4">Detalles</h2>
                                <div className="bg-gray-800 rounded-lg p-4 space-y-3">
                                    {game.released && (
                                        <div>
                                            <span className="text-gray-400">Fecha de lanzamiento:</span>
                                            <span className="block">{new Date(game.released).toLocaleDateString()}</span>
                                        </div>
                                    )}

                                    {game.developers && game.developers.length > 0 && (
                                        <div>
                                            <span className="text-gray-400">Desarrollador:</span>
                                            <span className="block">{game.developers.map((d) => d.name).join(", ")}</span>
                                        </div>
                                    )}

                                    {game.publishers && game.publishers.length > 0 && (
                                        <div>
                                            <span className="text-gray-400">Editor:</span>
                                            <span className="block">{game.publishers.map((p) => p.name).join(", ")}</span>
                                        </div>
                                    )}

                                    {game.genres && game.genres.length > 0 && (
                                        <div>
                                            <span className="text-gray-400">Géneros:</span>
                                            <span className="block">{game.genres.map((g) => g.name).join(", ")}</span>
                                        </div>
                                    )}

                                    {game.esrb_rating && (
                                        <div>
                                            <span className="text-gray-400">Clasificación:</span>
                                            <span className="block">{game.esrb_rating.name}</span>
                                        </div>
                                    )}

                                    {game.website && (
                                        <div>
                                            <span className="text-gray-400">Sitio web:</span>
                                            <a
                                                href={game.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 hover:text-blue-400"
                                            >
                                                {game.website.replace(/(^\w+:|^)\/\//, "").replace(/\/$/, "")}
                                                <ExternalLink size={14} />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold mb-4">Plataformas</h2>
                                <div className="bg-gray-800 rounded-lg p-4">
                                    <GamePlatforms platforms={game.parent_platforms || game.platforms || []} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - 1/3 width on desktop */}
                    <div>
                        <div className="bg-gray-800 rounded-lg p-6 sticky top-20">
                            <div className="mb-4">
                                <img
                                    src={game.background_image || "/placeholder.svg"}
                                    alt={game.name}
                                    className="w-full h-48 object-cover rounded-md"
                                />
                            </div>

                            <div className="mb-6">
                                <GameRating rating={game.rating} />
                            </div>

                            <div className="mb-6">
                                <div className="text-3xl font-bold text-green-400 mb-2">{price}€</div>
                                <AddToCartButton game={game} />
                            </div>

                            <Link
                                href={`/product-sheety/${game.slug}`}
                                className="text-blue-400 hover:text-blue-300 flex items-center justify-center gap-2 mt-4"
                            >
                                Ver ficha técnica completa
                                <ExternalLink size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        console.error("Error loading game:", error)
        notFound()
    }
}
