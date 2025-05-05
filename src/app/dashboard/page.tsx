"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { useFavorites } from "@/hooks/use-favorites"
import { useCart } from "@/hooks/use-cart"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { Loader2, User, Heart, ShoppingCart, MessageSquare, History, LogOut } from "lucide-react"
import Link from "next/link"

interface Message {
    id: string
    subject: string
    message: string
    createdAt: Date
}

interface Purchase {
    id: string
    items: { id: string; name: string; price: number; quantity: number }[]
    total: number
    createdAt: Date
}

export default function DashboardPage() {
    const { user, loading: authLoading, logout } = useAuth()
    const { favorites } = useFavorites()
    const { cartItems } = useCart()
    const [messages, setMessages] = useState<Message[]>([])
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [messagesLoading, setMessagesLoading] = useState(true)
    const [purchasesLoading, setPurchasesLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("profile")
    const router = useRouter()
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)

        // Redirect to login if not authenticated
        if (!authLoading && !user) {
            router.push("/login")
        }

        // Load messages and purchases if user is authenticated
        if (user) {
            loadMessages()
            loadPurchases()
        }
    }, [user, authLoading, router])

    const loadMessages = async () => {
        try {
            setMessagesLoading(true)
            const q = query(collection(db, "messages"), where("userId", "==", user?.uid))
            const querySnapshot = await getDocs(q)

            const messagesData: Message[] = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                messagesData.push({
                    id: doc.id,
                    subject: data.subject,
                    message: data.message,
                    createdAt: data.createdAt.toDate(),
                })
            })

            setMessages(messagesData)
        } catch (error) {
            console.error("Error loading messages:", error)
        } finally {
            setMessagesLoading(false)
        }
    }

    const loadPurchases = async () => {
        try {
            setPurchasesLoading(true)
            const q = query(collection(db, "purchases"), where("userId", "==", user?.uid))
            const querySnapshot = await getDocs(q)

            const purchasesData: Purchase[] = []
            querySnapshot.forEach((doc) => {
                const data = doc.data()
                purchasesData.push({
                    id: doc.id,
                    items: data.items,
                    total: data.total,
                    createdAt: data.createdAt.toDate(),
                })
            })

            setPurchases(purchasesData)
        } catch (error) {
            console.error("Error loading purchases:", error)
        } finally {
            setPurchasesLoading(false)
        }
    }

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
            <h1 className="text-3xl font-bold mb-8">Mi cuenta</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                <User size={40} className="text-gray-400" />
                            </div>
                            <h2 className="text-xl font-bold">{user.displayName || "Usuario"}</h2>
                            <p className="text-gray-400">{user.email}</p>
                        </div>

                        <nav className="space-y-1">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`w-full cursor-pointer flex items-center p-3 rounded-md ${activeTab === "profile" ? "bg-blue-600" : "hover:bg-gray-700"
                                    }`}
                            >
                                <User size={18} className="mr-3" />
                                Perfil
                            </button>
                            <button
                                onClick={() => setActiveTab("favorites")}
                                className={`w-full cursor-pointer flex items-center p-3 rounded-md ${activeTab === "favorites" ? "bg-blue-600" : "hover:bg-gray-700"
                                    }`}
                            >
                                <Heart size={18} className="mr-3" />
                                Favoritos
                            </button>
                            <button
                                onClick={() => setActiveTab("cart")}
                                className={`w-full cursor-pointer flex items-center p-3 rounded-md ${activeTab === "cart" ? "bg-blue-600" : "hover:bg-gray-700"
                                    }`}
                            >
                                <ShoppingCart size={18} className="mr-3" />
                                Carrito
                            </button>
                            <button
                                onClick={() => setActiveTab("messages")}
                                className={`w-full cursor-pointer flex items-center p-3 rounded-md ${activeTab === "messages" ? "bg-blue-600" : "hover:bg-gray-700"
                                    }`}
                            >
                                <MessageSquare size={18} className="mr-3" />
                                Mensajes
                            </button>
                            <button
                                onClick={() => setActiveTab("history")}
                                className={`w-full cursor-pointer flex items-center p-3 rounded-md ${activeTab === "history" ? "bg-blue-600" : "hover:bg-gray-700"
                                    }`}
                            >
                                <History size={18} className="mr-3" />
                                Historial
                            </button>
                            <button
                                onClick={logout}
                                className="w-full cursor-pointer flex items-center p-3 rounded-md text-red-400 hover:bg-gray-700"
                            >
                                <LogOut size={18} className="mr-3" />
                                Cerrar sesión
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main content */}
                <div className="lg:col-span-3">
                    {activeTab === "profile" && (
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-6">Información personal</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Nombre</label>
                                    <div className="bg-gray-700 p-3 rounded-md">{user.displayName || "No especificado"}</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <div className="bg-gray-700 p-3 rounded-md">{user.email}</div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Fecha de registro</label>
                                    <div className="bg-gray-700 p-3 rounded-md">
                                        {user.metadata.creationTime
                                            ? new Date(user.metadata.creationTime).toLocaleDateString()
                                            : "No disponible"}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Último acceso</label>
                                    <div className="bg-gray-700 p-3 rounded-md">
                                        {user.metadata.lastSignInTime
                                            ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                                            : "No disponible"}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h3 className="font-bold mb-4">Estadísticas de uso</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Favoritos</span>
                                            <Heart size={18} className="text-red-400" />
                                        </div>
                                        <div className="text-2xl font-bold">{favorites.length}</div>
                                    </div>

                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Carrito</span>
                                            <ShoppingCart size={18} className="text-blue-400" />
                                        </div>
                                        <div className="text-2xl font-bold">{cartItems.length}</div>
                                    </div>

                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-gray-400">Mensajes</span>
                                            <MessageSquare size={18} className="text-green-400" />
                                        </div>
                                        <div className="text-2xl font-bold">{messages.length}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "favorites" && (
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-6">Mis favoritos</h2>

                            {favorites.length === 0 ? (
                                <div className="text-center py-8">
                                    <Heart size={40} className="mx-auto mb-4 text-gray-500" />
                                    <p className="text-gray-400 mb-4">No tienes juegos favoritos</p>
                                    <Link href="/games" className="btn-primary">
                                        Explorar juegos
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {favorites.map((game) => (
                                        <div key={game.id} className="bg-gray-700 rounded-lg overflow-hidden flex">
                                            <img
                                                src={game.background_image || "/placeholder.svg?height=80&width=120"}
                                                alt={game.name}
                                                className="w-20 h-20 object-cover"
                                            />
                                            <div className="p-4 flex-grow">
                                                <h3 className="font-medium">{game.name}</h3>
                                                <p className="text-sm text-gray-400">Rating: {game.rating.toFixed(1)}</p>
                                            </div>
                                            <div className="flex items-center p-4">
                                                <Link href={`/game/${game.slug}`} className="text-blue-400 hover:text-blue-300">
                                                    Ver detalles
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "cart" && (
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-6">Mi carrito</h2>

                            {cartItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <ShoppingCart size={40} className="mx-auto mb-4 text-gray-500" />
                                    <p className="text-gray-400 mb-4">Tu carrito está vacío</p>
                                    <Link href="/games" className="btn-primary">
                                        Explorar juegos
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <div className="space-y-4 mb-6">
                                        {cartItems.map((item) => (
                                            <div key={item.game.id} className="bg-gray-700 rounded-lg overflow-hidden flex">
                                                <img
                                                    src={item.game.background_image || "/placeholder.svg?height=80&width=120"}
                                                    alt={item.game.name}
                                                    className="w-20 h-20 object-cover"
                                                />
                                                <div className="p-4 flex-grow">
                                                    <h3 className="font-medium">{item.game.name}</h3>
                                                    <div className="flex justify-between mt-1">
                                                        <span className="text-sm text-gray-400">
                                                            {item.quantity} x {item.price.toFixed(2)}€
                                                        </span>
                                                        <span className="font-medium">{(item.quantity * item.price).toFixed(2)}€</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="bg-gray-700 p-4 rounded-lg">
                                        <div className="flex justify-between mb-2">
                                            <span>Total:</span>
                                            <span className="font-bold">
                                                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}€
                                            </span>
                                        </div>

                                        <Link href="/cart" className="btn-primary w-full text-center block mt-4">
                                            Ver carrito completo
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "messages" && (
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-6">Mis mensajes</h2>

                            {messagesLoading ? (
                                <div className="text-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                                    <p>Cargando mensajes...</p>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-8">
                                    <MessageSquare size={40} className="mx-auto mb-4 text-gray-500" />
                                    <p className="text-gray-400 mb-4">No has enviado ningún mensaje</p>
                                    <Link href="/contact" className="btn-primary">
                                        Contactar
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div key={message.id} className="bg-gray-700 rounded-lg p-4">
                                            <div className="flex justify-between mb-2">
                                                <h3 className="font-medium">{message.subject}</h3>
                                                <span className="text-sm text-gray-400">{message.createdAt.toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-300 text-sm line-clamp-2">{message.message}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === "history" && (
                        <div className="bg-gray-800 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-6">Historial de compras</h2>

                            {purchasesLoading ? (
                                <div className="text-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
                                    <p>Cargando historial de compras...</p>
                                </div>
                            ) : purchases.length === 0 ? (
                                <div className="text-center py-8">
                                    <History size={40} className="mx-auto mb-4 text-gray-500" />
                                    <p className="text-gray-400 mb-4">No has realizado ninguna compra</p>
                                    <Link href="/games" className="btn-primary">
                                        Explorar juegos
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {purchases.map((purchase) => (
                                        <div key={purchase.id} className="bg-gray-700 rounded-lg p-4">
                                            <div className="flex justify-between mb-2">
                                                <span className="text-sm text-gray-400">{purchase.createdAt.toLocaleDateString()}</span>
                                                <span className="font-bold">{purchase.total.toFixed(2)}€</span> {/* Total con impuestos */}
                                            </div>
                                            <ul className="text-gray-300 text-sm space-y-1">
                                                {purchase.items.map((item, index) => (
                                                    <li key={`${item.id}-${index}`}>
                                                        {item.quantity} x {item.name} ({item.price.toFixed(2)}€)
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
