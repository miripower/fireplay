"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { useAuth } from "@/hooks/use-auth"
import type { Game } from "@/types/game.types"

interface FavoritesContextType {
    favorites: Game[]
    loading: boolean
    error: string | null
    addToFavorites: (game: Game) => Promise<void>
    removeFromFavorites: (gameId: number) => Promise<void>
}

export const FavoritesContext = createContext<FavoritesContextType>({
    favorites: [],
    loading: false,
    error: null,
    addToFavorites: async () => { },
    removeFromFavorites: async () => { },
})

export function FavoritesProvider({ children }: { children: ReactNode }) {
    const [favorites, setFavorites] = useState<Game[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    // Load favorites when user changes
    useEffect(() => {
        if (user) {
            loadFavorites()
        } else {
            setFavorites([])
        }
    }, [user])

    const loadFavorites = async () => {
        if (!user) return

        try {
            setLoading(true)
            setError(null)

            const q = query(collection(db, "favorites"), where("userId", "==", user.uid))
            const querySnapshot = await getDocs(q)

            const favoritesData: Game[] = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                favoritesData.push({
                    ...data.game,
                    docId: doc.id, // Store Firestore document ID for easy deletion
                } as Game)
            })

            setFavorites(favoritesData)
        } catch (error: any) {
            setError("Error loading favorites: " + error.message)
            console.error("Error loading favorites:", error)
        } finally {
            setLoading(false)
        }
    }

    const addToFavorites = async (game: Game) => {
        if (!user) return

        try {
            setError(null)

            // Check if already in favorites
            if (favorites.some((fav) => fav.id === game.id)) {
                return
            }

            // Add to Firestore
            await addDoc(collection(db, "favorites"), {
                userId: user.uid,
                game,
                createdAt: new Date(),
            })

            // Update local state
            setFavorites((prev) => [...prev, game])
        } catch (error: any) {
            setError("Error adding to favorites: " + error.message)
            console.error("Error adding to favorites:", error)
        }
    }

    const removeFromFavorites = async (gameId: number) => {
        if (!user) return

        try {
            setError(null)

            // Find the favorite with this game ID
            const favorite = favorites.find((fav) => fav.id === gameId)
            if (!favorite || !(favorite as any).docId) {
                // If not found or no docId, try to find it in Firestore
                const q = query(collection(db, "favorites"), where("userId", "==", user.uid), where("game.id", "==", gameId))
                const querySnapshot = await getDocs(q)

                if (!querySnapshot.empty) {
                    await deleteDoc(doc(db, "favorites", querySnapshot.docs[0].id))
                }
            } else {
                // If we have the docId, delete directly
                await deleteDoc(doc(db, "favorites", (favorite as any).docId))
            }

            // Update local state
            setFavorites((prev) => prev.filter((fav) => fav.id !== gameId))
        } catch (error: any) {
            setError("Error removing from favorites: " + error.message)
            console.error("Error removing from favorites:", error)
        }
    }

    return (
        <FavoritesContext.Provider value={{ favorites, loading, error, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    )
}
