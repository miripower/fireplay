"use client"

import { useContext } from "react"
import { FavoritesContext } from "@/context/favorites-context"

export function useFavorites() {
    return useContext(FavoritesContext)
}
