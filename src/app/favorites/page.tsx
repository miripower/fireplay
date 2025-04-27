"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useFavorites } from "@/hooks/use-favorites"
import { useAuth } from "@/hooks/use-auth"
import GameCard from "@/components/game-card"
import { Heart, Loader2 } from "lucide-react"

export default function FavoritesPage() {
    const { favorites, loading, error } = useFavorites()
    const { user, loading: authLoading } = useAuth()
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)

        // Redirect to login if not authenticated
        if (!authLoading && !user) {
            router.push("/login")
        }
    }, [user, authLoading, router])

    // Don't render anything on the server to prevent hydration mismatch
    if (!isClient) {
        return null
    }

    if (authLoading) {
        return (
            <div className="container mx-auto px-4 py-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                <p>Cargando...</p>
            </div>
        )
    }

    if (!user) {
        return null // Will redirect to login
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Mis favoritos</h1>

            {loading ? (
                <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                    <p>Cargando tus juegos favoritos...</p>
                </div>
            ) : error ? (
                <div className="text-center py-12 text-red-500">
                    <p>{error}</p>
                </div>
            ) : favorites.length === 0 ? (
                <div className="text-center py-12">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                        <Heart size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">No tienes favoritos</h2>
                    <p className="text-gray-400 mb-6">Añade juegos a tus favoritos para verlos aquí</p>
                    <a href="/games" className="btn-primary">
                        Explorar juegos
                    </a>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((game) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            )}
        </div>
    )
}
