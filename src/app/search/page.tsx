import { searchGames } from "@/lib/api"
import GameCard from "@/components/game-card"
import GamesPagination from "@/components/games-pagination"
import { Search } from "lucide-react"
import { Game } from "@/types/game.types"

interface SearchPageProps {
    searchParams: Promise<{
        query?: string
        page?: string
    }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const resolvedSearchParams = await searchParams
    const query = resolvedSearchParams.query || ""
    const page = resolvedSearchParams.page ? Number.parseInt(resolvedSearchParams.page) : 1

    const gamesData = query ? await searchGames(query, page, 12) : { results: [], count: 0 }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Resultados de búsqueda</h1>

            {query ? (
                <p className="text-gray-400 mb-8">
                    Se encontraron {gamesData.count} resultados para &quot;{query}&quot;
                </p>
            ) : (
                <p className="text-gray-400 mb-8">Introduce un término de búsqueda para encontrar juegos</p>
            )}

            {query && gamesData.results.length === 0 ? (
                <div className="text-center py-12">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                        <Search size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">No se encontraron resultados</h2>
                    <p className="text-gray-400">
                        No hemos encontrado juegos que coincidan con &quot;{query}&quot;. Intenta con otros términos.
                    </p>
                </div>
            ) : query ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gamesData.results.map((game: Game) => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>

                    {gamesData.count > 12 && (
                        <div className="mt-8">
                            <GamesPagination currentPage={page} />
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-12">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                        <Search size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Busca tus juegos favoritos</h2>
                    <p className="text-gray-400">
                        Utiliza la barra de búsqueda para encontrar juegos por título, género o plataforma.
                    </p>
                </div>
            )}
        </div>
    )
}