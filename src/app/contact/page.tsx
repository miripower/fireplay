"use client"

import type React from "react"

import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { useAuth } from "@/hooks/use-auth"
import { Loader2, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
    const { user } = useAuth()
    const [formData, setFormData] = useState({
        name: user?.displayName || "",
        email: user?.email || "",
        subject: "",
        message: "",
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }

    const validate = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio"
        }

        if (!formData.email.trim()) {
            newErrors.email = "El email es obligatorio"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El email no es válido"
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "El asunto es obligatorio"
        }

        if (!formData.message.trim()) {
            newErrors.message = "El mensaje es obligatorio"
        } else if (formData.message.length < 10) {
            newErrors.message = "El mensaje debe tener al menos 10 caracteres"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validate()) {
            return
        }

        try {
            setLoading(true)

            // Save to Firestore
            await addDoc(collection(db, "messages"), {
                ...formData,
                userId: user?.uid || "anonymous",
                createdAt: new Date(),
            })

            // Reset form and show success message
            setFormData({
                name: user?.displayName || "",
                email: user?.email || "",
                subject: "",
                message: "",
            })
            setSuccess(true)

            // Hide success message after 5 seconds
            setTimeout(() => {
                setSuccess(false)
            }, 5000)
        } catch (error) {
            console.error("Error sending message:", error)
            setErrors({ submit: "Error al enviar el mensaje. Inténtalo de nuevo." })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Contacto</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-6">Envíanos un mensaje</h2>

                        {success && (
                            <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded mb-6">
                                ¡Mensaje enviado correctamente! Nos pondremos en contacto contigo lo antes posible.
                            </div>
                        )}

                        {errors.submit && (
                            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
                                {errors.submit}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className={`input-field ${errors.name ? "border border-red-500" : ""}`}
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className={`input-field ${errors.email ? "border border-red-500" : ""}`}
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                                    Asunto
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className={`input-field ${errors.subject ? "border border-red-500" : ""}`}
                                    value={formData.subject}
                                    onChange={handleChange}
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                            </div>

                            <div className="mb-6">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                                    Mensaje
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={6}
                                    className={`input-field ${errors.message ? "border border-red-500" : ""}`}
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary w-full flex justify-center items-center">
                                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                                Enviar mensaje
                            </button>
                        </form>
                    </div>
                </div>

                <div>
                    <div className="bg-gray-800 rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-6">Información de contacto</h2>

                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-gray-700 p-3 rounded-full mr-4">
                                    <MapPin size={20} className="text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium mb-1">Dirección</h3>
                                    <p className="text-gray-400">
                                        Carrer de Monlau, 6
                                        <br />
                                        Sant Andreu, 08027, Barcelona
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-gray-700 p-3 rounded-full mr-4">
                                    <Phone size={20} className="text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium mb-1">Teléfono</h3>
                                    <p className="text-gray-400">+34 933 40 82 04</p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-gray-700 p-3 rounded-full mr-4">
                                    <Mail size={20} className="text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-medium mb-1">Email</h3>
                                    <p className="text-gray-400">polmivi@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="font-medium mb-3">Horario de atención</h3>
                            <div className="bg-gray-700 rounded-lg p-4 text-sm">
                                <div className="flex justify-between mb-2">
                                    <span>Lunes - Viernes:</span>
                                    <span>9:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span>Sábado:</span>
                                    <span>10:00 - 14:00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Domingo:</span>
                                    <span>Cerrado</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
