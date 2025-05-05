"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, ShoppingCart, Trash2, ArrowRight } from "lucide-react"

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, getTotal, clearCart, savePurchase } = useCart()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Don't render anything on the server to prevent hydration mismatch
    if (!isClient) {
        return null
    }

    const handleQuantityChange = (gameId: number, newQuantity: number) => {
        if (newQuantity < 1) return
        updateQuantity(gameId, newQuantity)
    }

    const handleRemove = (gameId: number) => {
        removeFromCart(gameId)
    }

    const handleCheckout = async () => {
        try {
            await savePurchase() // Guarda la compra en Firebase
            alert("¡Gracias por tu compra!")
        } catch (error) {
            console.error("Error al finalizar la compra:", error)
            alert("Hubo un error al procesar tu compra. Por favor, inténtalo de nuevo.")
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Mi carrito</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-12">
                    <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-800 mb-4">
                        <ShoppingCart size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Tu carrito está vacío</h2>
                    <p className="text-gray-400 mb-6">Añade juegos a tu carrito para comprarlos</p>
                    <Link href="/games" className="btn-primary">
                        Explorar juegos
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-700">
                                    <tr>
                                        <th className="text-left p-4">Producto</th>
                                        <th className="text-center p-4">Precio</th>
                                        <th className="text-center p-4">Cantidad</th>
                                        <th className="text-center p-4">Total</th>
                                        <th className="text-center p-4">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.game.id} className="border-t border-gray-700">
                                            <td className="p-4">
                                                <div className="flex items-center">
                                                    <img
                                                        src={item.game.background_image || "/placeholder.svg?height=60&width=100"}
                                                        alt={item.game.name}
                                                        className="w-20 h-12 object-cover rounded mr-4"
                                                    />
                                                    <div>
                                                        <Link href={`/game/${item.game.slug}`} className="font-medium hover:text-blue-400">
                                                            {item.game.name}
                                                        </Link>
                                                        {item.game.genres && item.game.genres.length > 0 && (
                                                            <div className="text-xs text-gray-400 mt-1">{item.game.genres[0].name}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center">{item.price.toFixed(2)}€</td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.game.id, item.quantity - 1)}
                                                        className="p-1 rounded-sm cursor-pointer bg-gray-700 hover:bg-gray-600"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="mx-3 w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.game.id, item.quantity + 1)}
                                                        className="p-1 rounded-sm cursor-pointer bg-gray-700 hover:bg-gray-600"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center font-medium">{(item.price * item.quantity).toFixed(2)}€</td>
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => handleRemove(item.game.id)}
                                                    className="p-2 text-red-400 cursor-pointer hover:text-red-300 hover:bg-gray-700 rounded-full"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex justify-between">
                            <button onClick={clearCart} className="text-gray-400 hover:text-white cursor-pointer">
                                Vaciar carrito
                            </button>
                            <Link href="/games" className="text-blue-400 hover:text-blue-300">
                                Seguir comprando
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Resumen del pedido</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Subtotal</span>
                                    <span>{getTotal().toFixed(2)}€</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Impuestos (21%)</span>
                                    <span>{(getTotal() * 0.21).toFixed(2)}€</span>
                                </div>
                                <div className="border-t border-gray-700 pt-3 flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>{(getTotal() * 1.21).toFixed(2)}€</span>
                                </div>
                            </div>

                            <button onClick={handleCheckout} className="btn-primary w-full flex items-center justify-center gap-2">
                                Finalizar compra
                                <ArrowRight size={18} />
                            </button>

                            <div className="mt-4 text-xs text-gray-400 text-center">
                                Al finalizar la compra, aceptas nuestros términos y condiciones
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}