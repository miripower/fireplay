"use client"

import { useState } from "react"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/hooks/use-cart"
import type { Game } from "@/types/game.types"

interface AddToCartButtonProps {
    game: Game
}

export default function AddToCartButton({ game }: AddToCartButtonProps) {
    const { addToCart, cartItems } = useCart()
    const [added, setAdded] = useState(false)

    const isInCart = cartItems.some((item) => item.game.id === game.id)

    const handleAddToCart = () => {
        if (!isInCart) {
            addToCart(game)
            setAdded(true)

            // Reset the added state after 2 seconds
            setTimeout(() => {
                setAdded(false)
            }, 2000)
        }
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={isInCart}
            className={`w-full py-3 px-4 rounded-sm flex items-center justify-center gap-2 transition-colors ${isInCart
                    ? "bg-green-600 text-white cursor-not-allowed"
                    : added
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 hover:bg-blue-500 text-white"
                }`}
        >
            {isInCart || added ? (
                <>
                    <Check size={20} />
                    Añadido al carrito
                </>
            ) : (
                <>
                    <ShoppingCart size={20} />
                    Añadir al carrito
                </>
            )}
        </button>
    )
}
