import axios from "axios"
import type { GameDetails } from "@/types/game.types"

const API_URL = process.env.NEXT_PUBLIC_RAWG_API_URL || "https://api.rawg.io/api"
const API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY

// Get popular games
export async function getPopularGames(page = 1, pageSize = 12, ordering = "-rating") {
  try {
    const response = await axios.get(`${API_URL}/games`, {
      params: {
        key: API_KEY,
        page,
        page_size: pageSize,
        ordering,
      },
    })
    return response.data.results
  } catch (error) {
    console.error("Error fetching popular games:", error)
    throw error
  }
}

// Get game details by slug
export async function getGameDetails(slug: string): Promise<GameDetails> {
  try {
    const response = await axios.get(`${API_URL}/games/${slug}`, {
      params: {
        key: API_KEY,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error fetching game details for ${slug}:`, error)
    throw error
  }
}

// Search games by query
export async function searchGames(query: string, page = 1, pageSize = 12) {
  try {
    const response = await axios.get(`${API_URL}/games`, {
      params: {
        key: API_KEY,
        search: query,
        page,
        page_size: pageSize,
      },
    })
    return response.data
  } catch (error) {
    console.error(`Error searching games for "${query}":`, error)
    throw error
  }
}

// Get game screenshots
export async function getGameScreenshots(gameId: number) {
  try {
    const response = await axios.get(`${API_URL}/games/${gameId}/screenshots`, {
      params: {
        key: API_KEY,
      },
    })
    return response.data.results
  } catch (error) {
    console.error(`Error fetching screenshots for game ${gameId}:`, error)
    throw error
  }
}
