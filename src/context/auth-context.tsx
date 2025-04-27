"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import {
    type User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from "firebase/auth"
import { auth } from "@/firebase/firebase"

interface AuthContextType {
    user: User | null
    loading: boolean
    error: string | null
    register: (email: string, password: string, displayName: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    error: null,
    register: async () => { },
    login: async () => { },
    logout: async () => { },
})

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const register = async (email: string, password: string, displayName: string) => {
        try {
            setError(null)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            // Update profile with display name
            if (userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName,
                })

                // Force refresh the user object
                setUser({ ...userCredential.user })
            }
        } catch (error: unknown) {
            setError((error as Error).message)
            throw error
        }
    }

    const login = async (email: string, password: string) => {
        try {
            setError(null)
            await signInWithEmailAndPassword(auth, email, password)
        } catch (error: unknown) {
            setError((error as Error).message)
            throw error
        }
    }

    const logout = async () => {
        try {
            setError(null)
            await signOut(auth)
        } catch (error: unknown) {
            setError((error as Error).message)
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>{children}</AuthContext.Provider>
    )
}
