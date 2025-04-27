"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface GamesPaginationProps {
    currentPage: number
}

export default function GamesPagination({ currentPage }: GamesPaginationProps) {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Create a new URLSearchParams object to manipulate
    const createPageURL = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageNumber.toString())
        return `${pathname}?${params.toString()}`
    }

    return (
        <div className="flex justify-center items-center space-x-2">
            <Link
                href={currentPage > 1 ? createPageURL(currentPage - 1) : "#"}
                className={`p-2 rounded-md ${currentPage <= 1 ? "text-gray-500 cursor-not-allowed" : "text-gray-300 hover:bg-gray-700"
                    }`}
                aria-disabled={currentPage <= 1}
            >
                <ChevronLeft size={20} />
            </Link>

            {[...Array(5)].map((_, i) => {
                const pageNumber = currentPage - 2 + i
                if (pageNumber < 1) return null

                return (
                    <Link
                        key={i}
                        href={createPageURL(pageNumber)}
                        className={`w-10 h-10 flex items-center justify-center rounded-md ${currentPage === pageNumber ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
                            }`}
                    >
                        {pageNumber}
                    </Link>
                )
            })}

            <Link href={createPageURL(currentPage + 1)} className="p-2 rounded-md text-gray-300 hover:bg-gray-700">
                <ChevronRight size={20} />
            </Link>
        </div>
    )
}
