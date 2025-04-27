"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Loader2 } from "lucide-react"

export default function RegisterPage() {
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const { register, user, loading: authLoading } = useAuth()
    const router = useRouter()

    // Redirigir si el usuario ya está autenticado
    useEffect(() => {
        if (user && !authLoading) {
            router.push("/")
        }
    }, [user, authLoading, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!displayName || !email || !password || !confirmPassword) {
            setError("Por favor, completa todos los campos")
            return
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden")
            return
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres")
            return
        }

        try {
            setError(null)
            setLoading(true)
            await register(email, password, displayName)
            router.push("/")
        } catch (err: unknown) {
            console.error(err)
            if (err instanceof Error && "code" in err && (err as { code: string }).code === "auth/email-already-in-use") {
                setError("Este email ya está en uso. Por favor, utiliza otro o inicia sesión.")
            } else {
                setError("Error al crear la cuenta. Por favor, inténtalo de nuevo.")
            }
        } finally {
            setLoading(false)
        }
    }

    // Si está cargando o el usuario ya está autenticado, mostrar un loader
    if (authLoading || user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-lg shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Crear cuenta</h2>
                    <p className="mt-2 text-gray-400">Regístrate para acceder a todas las funciones</p>
                </div>

                {error && <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">{error}</div>}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Nombre
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="input-field mt-1"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="input-field mt-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="input-field mt-1"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                                Confirmar contraseña
                            </label>
                            <input
                                id="confirm-password"
                                name="confirm-password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="input-field mt-1"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <input
                            id="terms"
                            name="terms"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                        />
                        <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                            Acepto los{" "}
                            <a href="#" className="text-blue-400 hover:text-blue-300">
                                términos y condiciones
                            </a>
                        </label>
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center">
                            {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                            Crear cuenta
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-400">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
