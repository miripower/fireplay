"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { Screenshot } from "@/types/game.types"

interface GameScreenshotsProps {
    screenshots: Screenshot[]
}

export default function GameScreenshots({ screenshots }: GameScreenshotsProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showLightbox, setShowLightbox] = useState(false)

    if (!screenshots || screenshots.length === 0) {
        return null
    }

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1))
    }

    const openLightbox = (index: number) => {
        setCurrentIndex(index)
        setShowLightbox(true)
    }

    const closeLightbox = () => {
        setShowLightbox(false)
    }

    return (
        <>
            <div className="relative">
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={screenshots[currentIndex].image || "/placeholder.svg"}
                        alt="Screenshot"
                        className="w-full h-[400px] object-cover cursor-pointer"
                        onClick={() => openLightbox(currentIndex)}
                    />

                    {/* Navigation buttons */}
                    <button
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                        onClick={handleNext}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Thumbnails */}
                <div className="flex mt-4 space-x-2 overflow-x-auto pb-2">
                    {screenshots.map((screenshot, index) => (
                        <div
                            key={screenshot.id}
                            className={`flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 ${index === currentIndex ? "border-blue-500" : "border-transparent"
                                }`}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <img
                                src={screenshot.image || "/placeholder.svg"}
                                alt={`Screenshot ${index + 1}`}
                                className="w-24 h-16 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {showLightbox && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
                    <button
                        className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
                        onClick={closeLightbox}
                    >
                        <X size={24} />
                    </button>

                    <button
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <img
                        src={screenshots[currentIndex].image || "/placeholder.svg"}
                        alt="Screenshot fullscreen"
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                    />

                    <button
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70"
                        onClick={handleNext}
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}
        </>
    )
}
