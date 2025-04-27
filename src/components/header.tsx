"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useCart } from "@/hooks/use-cart"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const pathname = usePathname()
    const router = useRouter()
    const { user, logout } = useAuth()
    const { cartItems } = useCart()
    const userMenuRef = useRef<HTMLDivElement>(null)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery("")
            setIsMenuOpen(false)
        }
    }

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false)
        setIsUserMenuOpen(false)
    }, [pathname])

    // Close user menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Fireplay Logo" className="h-10" />
                        <span className="text-2xl font-bold text-blue-400">Fireplay</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link href="/games" className="text-gray-300 hover:text-white">
                            Juegos
                        </Link>
                        <Link href="/info" className="text-gray-300 hover:text-white">
                            Información
                        </Link>
                        <Link href="/contact" className="text-gray-300 hover:text-white">
                            Contacto
                        </Link>
                    </nav>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-6">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Buscar juegos..."
                                className="w-full bg-gray-700 text-white rounded-sm pl-10 pr-4 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </form>

                    {/* Desktop User Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link href="/favorites" className="text-gray-300 hover:text-white">
                                    <Heart size={20} />
                                </Link>
                                <Link href="/cart" className="text-gray-300 hover:text-white relative">
                                    <ShoppingCart size={20} />
                                    {cartItems.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </Link>
                                <div className="relative" ref={userMenuRef}>
                                    <button
                                        className="text-gray-300 cursor-pointer hover:text-white flex items-center gap-2"
                                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    >
                                        <User size={20} />
                                        <span className="text-sm">{user.displayName || "Usuario"}</span>
                                    </button>
                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg py-1">
                                            <Link
                                                href="/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                Mi cuenta
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout()
                                                    setIsUserMenuOpen(false)
                                                }}
                                                className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                            >
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-300 hover:text-white">
                                    Iniciar sesión
                                </Link>
                                <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-sm">
                                    Registrarse
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-300 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800 border-t border-gray-700">
                    <div className="container mx-auto px-4 py-3">
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar juegos..."
                                    className="w-full bg-gray-700 text-white rounded-sm pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            </div>
                        </form>
                        <nav className="flex flex-col space-y-3">
                            <Link href="/games" className="text-gray-300 hover:text-white py-2">
                                Juegos
                            </Link>
                            <Link href="/info" className="text-gray-300 hover:text-white py-2">
                                Información
                            </Link>
                            <Link href="/contact" className="text-gray-300 hover:text-white py-2">
                                Contacto
                            </Link>
                            {user ? (
                                <>
                                    <Link href="/favorites" className="text-gray-300 hover:text-white py-2 flex items-center gap-2">
                                        <Heart size={18} /> Favoritos
                                    </Link>
                                    <Link href="/cart" className="text-gray-300 hover:text-white py-2 flex items-center gap-2">
                                        <ShoppingCart size={18} /> Carrito
                                        {cartItems.length > 0 && (
                                            <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {cartItems.length}
                                            </span>
                                        )}
                                    </Link>
                                    <Link href="/dashboard" className="text-gray-300 hover:text-white py-2 flex items-center gap-2">
                                        <User size={18} /> Mi cuenta
                                    </Link>
                                    <button onClick={logout} className="text-gray-300 hover:text-white py-2 text-left cursor-pointer">
                                        Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-gray-300 hover:text-white py-2">
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-sm text-center"
                                    >
                                        Registrarse
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    )
}
