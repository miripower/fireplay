"use client"

import { useEffect, useState } from "react"
import { getPopularGames } from "@/lib/api"
import GameCard from "@/components/game-card"
import type { Game } from "@/types/game.types"
import { Loader2 } from "lucide-react"

export default function FeaturedGames() {
    const [games, setGames] = useState<Game[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchGames = async () => {
            try {
                setLoading(true)
                const data = await getPopularGames()
                setGames(data.slice(0, 6))
                setError(null)
            } catch (err) {
                setError("Error al cargar los juegos destacados")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchGames()
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((game) => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    )
}
