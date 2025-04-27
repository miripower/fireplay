"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { collection, addDoc, query, where, getDocs, doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { useAuth } from "@/hooks/use-auth"
import type { Game } from "@/types/game.types"

interface CartItem {
    game: Game
    quantity: number
    price: number
}

interface CartContextType {
    cartItems: CartItem[]
    loading: boolean
    error: string | null
    addToCart: (game: Game, quantity?: number) => void
    removeFromCart: (gameId: number) => void
    updateQuantity: (gameId: number, quantity: number) => void
    clearCart: () => void
    getTotal: () => number
}

export const CartContext = createContext<CartContextType>({
    cartItems: [],
    loading: false,
    error: null,
    addToCart: () => { },
    removeFromCart: () => { },
    updateQuantity: () => { },
    clearCart: () => { },
    getTotal: () => 0,
})

export function CartProvider({ children }: { children: ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { user } = useAuth()

    // Load cart when user changes
    useEffect(() => {
        if (user) {
            loadCartFromFirestore()
        } else {
            loadCartFromLocalStorage()
        }
    }, [user])

    // Save cart when it changes
    useEffect(() => {
        if (user) {
            saveCartToFirestore()
        } else {
            saveCartToLocalStorage()
        }
    }, [cartItems, user])

    const loadCartFromLocalStorage = () => {
        try {
            const savedCart = localStorage.getItem("cart")
            if (savedCart) {
                setCartItems(JSON.parse(savedCart))
            }
        } catch (error) {
            console.error("Error loading cart from localStorage:", error)
        }
    }

    const saveCartToLocalStorage = () => {
        try {
            localStorage.setItem("cart", JSON.stringify(cartItems))
        } catch (error) {
            console.error("Error saving cart to localStorage:", error)
        }
    }

    const loadCartFromFirestore = async () => {
        if (!user) return

        try {
            setLoading(true)
            setError(null)

            const q = query(collection(db, "carts"), where("userId", "==", user.uid))
            const querySnapshot = await getDocs(q)

            if (!querySnapshot.empty) {
                const cartData = querySnapshot.docs[0].data()
                setCartItems(cartData.items || [])
            } else {
                setCartItems([])
            }
        } catch (error: any) {
            setError("Error loading cart: " + error.message)
            console.error("Error loading cart:", error)
        } finally {
            setLoading(false)
        }
    }

    const saveCartToFirestore = async () => {
        if (!user) return

        try {
            const q = query(collection(db, "carts"), where("userId", "==", user.uid))
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                // Create new cart
                if (cartItems.length > 0) {
                    await addDoc(collection(db, "carts"), {
                        userId: user.uid,
                        items: cartItems,
                        updatedAt: new Date(),
                    })
                }
            } else {
                // Update existing cart
                const cartDoc = querySnapshot.docs[0]
                await updateDoc(doc(db, "carts", cartDoc.id), {
                    items: cartItems,
                    updatedAt: new Date(),
                })
            }
        } catch (error) {
            console.error("Error saving cart to Firestore:", error)
        }
    }

    const addToCart = (game: Game, quantity = 1) => {
        setCartItems((prevItems) => {
            // Calculate price based on rating (fictional)
            const price = Math.floor(game.rating * 10) + 5

            // Check if item already exists in cart
            const existingItemIndex = prevItems.findIndex((item) => item.game.id === game.id)

            if (existingItemIndex >= 0) {
                // Update quantity if item exists
                const updatedItems = [...prevItems]
                updatedItems[existingItemIndex].quantity += quantity
                return updatedItems
            } else {
                // Add new item if it doesn't exist
                return [...prevItems, { game, quantity, price }]
            }
        })
    }

    const removeFromCart = (gameId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.game.id !== gameId))
    }

    const updateQuantity = (gameId: number, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(gameId)
            return
        }

        setCartItems((prevItems) => prevItems.map((item) => (item.game.id === gameId ? { ...item, quantity } : item)))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const getTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                loading,
                error,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}
