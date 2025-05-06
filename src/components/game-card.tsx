"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Check } from "lucide-react"
import type { Game } from "@/types/game.types"
import { useAuth } from "@/hooks/use-auth"
import { useFavorites } from "@/hooks/use-favorites"
import { useCart } from "@/hooks/use-cart"

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {
  const { user } = useAuth()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()
  const { cartItems, addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const isFavorite = favorites.some((fav) => fav.id === game.id)
  const isInCart = cartItems.some((item) => item.game.id === game.id)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      // Redirect to login or show a message
      alert("Inicia sesión para añadir a favoritos")
      return
    }

    if (isFavorite) {
      removeFromFavorites(game.id)
    } else {
      addToFavorites(game)
    }
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isInCart) {
      addToCart(game)
      setAddedToCart(true)

      // Reset the added state after 2 seconds
      setTimeout(() => {
        setAddedToCart(false)
      }, 2000)
    }
  }

  // Calculate fictional price based on rating
  const price = (Math.floor(game.rating * 10) + 5).toFixed(2)

  return (
    <Link href={`/game/${game.slug}`}>
      <div
        className="card group relative h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          {/* Darkening overlay on hover */}
          <div
            className={`absolute inset-0 bg-black transition-opacity duration-300 ${isHovered ? "opacity-40" : "opacity-0"}`}
          ></div>

          {/* Game image */}
          <img
            src={game.background_image || "/placeholder.svg?height=200&width=400"}
            alt={game.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            disabled={!user} // Disable the button if the user is not logged in
            className={`absolute top-2 right-2 p-2 rounded-full ${
              isFavorite ? "bg-red-500" : "bg-gray-800"
            } transition-all cursor-pointer ${
              !user ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <Heart size={16} className={isFavorite ? "fill-white text-white" : "text-white"} />
          </button>

          {/* Rating */}
          {game.rating > 0 && (
            <div className="absolute bottom-2 left-2 bg-gray-900/80 text-white text-xs px-2 py-1 rounded">
              ★ {game.rating.toFixed(1)}
            </div>
          )}
        </div>

        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-bold text-lg mb-1 line-clamp-1">{game.name}</h3>

          {/* Genres */}
          {game.genres && game.genres.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {game.genres.slice(0, 2).map((genre) => (
                <span key={genre.id} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Price and Add to Cart button */}
          <div className="mt-auto pt-2 flex justify-between items-center">
            <span className="text-lg font-bold text-green-400">{price}€</span>
            {user ? (
              <button
                onClick={handleAddToCart}
                disabled={isInCart || addedToCart}
                className={`px-2 py-1 rounded-sm flex items-center gap-1 text-sm transition-colors ${
                  isInCart || addedToCart
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                }`}
              >
                {isInCart || addedToCart ? (
                  <>
                    <Check size={14} />
                    Añadido
                  </>
                ) : (
                  <>
                    <ShoppingCart size={14} />
                    Añadir
                  </>
                )}
              </button>
            ) : (
              <span className="text-sm text-gray-400">
                <a href="/login" className="text-blue-400 hover:text-blue-300">
                  Inicia sesión para añadir al carrito
                </a>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}