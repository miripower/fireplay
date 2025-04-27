"use client"

import Link from "next/link"

import type React from "react"

import { useState } from "react"
import { Star, ThumbsUp, User } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

interface Review {
    id: string
    userId: string
    userName: string
    rating: number
    comment: string
    date: Date
    likes: number
}

// Mock reviews data
const mockReviews: Review[] = [
    {
        id: "1",
        userId: "user1",
        userName: "GamerPro84",
        rating: 5,
        comment:
            "Uno de los mejores juegos que he jugado en años. La historia es increíble y los gráficos son impresionantes.",
        date: new Date(2023, 5, 15),
        likes: 24,
    },
    {
        id: "2",
        userId: "user2",
        userName: "AdventureSeeker",
        rating: 4,
        comment:
            "Muy buen juego, aunque tiene algunos bugs menores. La jugabilidad es excelente y la banda sonora es increíble.",
        date: new Date(2023, 6, 2),
        likes: 12,
    },
    {
        id: "3",
        userId: "user3",
        userName: "CasualGamer",
        rating: 3,
        comment:
            "Es un juego decente, pero esperaba más. La historia es algo predecible y los controles pueden ser frustrantes a veces.",
        date: new Date(2023, 7, 10),
        likes: 5,
    },
    {
        id: "4",
        userId: "user4",
        userName: "HardcorePlayer",
        rating: 5,
        comment: "¡Obra maestra! Llevo más de 100 horas y todavía estoy descubriendo cosas nuevas. Totalmente recomendado.",
        date: new Date(2023, 8, 5),
        likes: 31,
    },
    {
        id: "5",
        userId: "user5",
        userName: "GameReviewer",
        rating: 4,
        comment:
            "Una experiencia sólida con una gran relación calidad-precio. El mundo abierto está muy bien diseñado y hay mucho contenido.",
        date: new Date(2023, 9, 20),
        likes: 18,
    },
]

interface GameReviewsProps {
    gameId: number
    gameName: string
}

export default function GameReviews({ gameId, gameName }: GameReviewsProps) {
    const [reviews, setReviews] = useState<Review[]>(mockReviews)
    const [newReview, setNewReview] = useState({ rating: 0, comment: "" })
    const [showReviewForm, setShowReviewForm] = useState(false)
    const { user } = useAuth()

    const handleRatingChange = (rating: number) => {
        setNewReview((prev) => ({ ...prev, rating }))
    }

    const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewReview((prev) => ({ ...prev, comment: e.target.value }))
    }

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault()

        if (newReview.rating === 0 || !newReview.comment.trim()) {
            return
        }

        const review: Review = {
            id: `user-${Date.now()}`,
            userId: user?.uid || "anonymous",
            userName: user?.displayName || "Usuario anónimo",
            rating: newReview.rating,
            comment: newReview.comment,
            date: new Date(),
            likes: 0,
        }

        setReviews((prev) => [review, ...prev])
        setNewReview({ rating: 0, comment: "" })
        setShowReviewForm(false)
    }

    const handleLike = (reviewId: string) => {
        setReviews((prev) =>
            prev.map((review) => (review.id === reviewId ? { ...review, likes: review.likes + 1 } : review)),
        )
    }

    return (
        <div>
            {/* Review summary */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl font-bold text-yellow-400">
                        {(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)}
                    </div>
                    <div>
                        <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={20}
                                    className={
                                        star <= Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-600"
                                    }
                                />
                            ))}
                        </div>
                        <div className="text-sm text-gray-400">Basado en {reviews.length} opiniones</div>
                    </div>
                </div>

                {user ? (
                    showReviewForm ? (
                        <form onSubmit={handleSubmitReview} className="bg-gray-700 p-4 rounded-lg mb-6">
                            <h3 className="font-bold mb-4">Escribe tu opinión sobre {gameName}</h3>

                            <div className="mb-4">
                                <label className="block mb-2">Tu puntuación</label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleRatingChange(star)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                size={24}
                                                className={
                                                    star <= newReview.rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-500 hover:text-yellow-400"
                                                }
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="comment" className="block mb-2">
                                    Tu comentario
                                </label>
                                <textarea
                                    id="comment"
                                    rows={4}
                                    className="w-full bg-gray-800 text-white rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Comparte tu experiencia con este juego..."
                                    value={newReview.comment}
                                    onChange={handleCommentChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="flex gap-2">
                                <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-sm">
                                    Publicar opinión
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowReviewForm(false)}
                                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-sm"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button
                            onClick={() => setShowReviewForm(true)}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-sm mb-6"
                        >
                            Escribir una opinión
                        </button>
                    )
                ) : (
                    <div className="bg-gray-700 p-4 rounded-lg mb-6 text-center">
                        <p className="mb-2">Inicia sesión para dejar tu opinión</p>
                        <Link href="/login" className="text-blue-400 hover:text-blue-300">
                            Iniciar sesión
                        </Link>
                    </div>
                )}
            </div>

            {/* Reviews list */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="bg-gray-600 rounded-full p-2">
                                    <User size={16} />
                                </div>
                                <span className="font-medium">{review.userName}</span>
                            </div>
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={16}
                                        className={star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="text-gray-300 mb-3">{review.comment}</p>

                        <div className="flex justify-between text-sm text-gray-400">
                            <span>{review.date.toLocaleDateString()}</span>
                            <button onClick={() => handleLike(review.id)} className="flex items-center gap-1 hover:text-white">
                                <ThumbsUp size={14} />
                                <span>{review.likes}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
