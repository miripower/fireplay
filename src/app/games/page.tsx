import { getPopularGames } from "@/lib/api"
import GameCard from "@/components/game-card"
import GamesPagination from "@/components/games-pagination"
import GamesFilter from "@/components/games-filter"
import { Game } from "@/types/game.types"

interface GamesPageProps {
  searchParams: Promise<{
    page?: string
    ordering?: string
  }>
}

export default async function GamesPage({ searchParams }: GamesPageProps) {
  const resolvedSearchParams = await searchParams
  const params = {
    page: resolvedSearchParams?.page || "1",
    ordering: resolvedSearchParams?.ordering || "-rating",
  }

  const page = Number.parseInt(params.page, 10) || 1
  const ordering = params.ordering

  // Pasar el parámetro de ordenación a la API
  const gamesData = await getPopularGames(page, 12, ordering)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Catálogo de juegos</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <GamesFilter currentOrdering={ordering} />
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamesData.map((game: Game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          <div className="mt-8">
            <GamesPagination currentPage={page} />
          </div>
        </div>
      </div>
    </div>
  )
}