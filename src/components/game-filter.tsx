"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface GamesFilterProps {
    currentOrdering: string
}

export default function GamesFilter({ currentOrdering }: GamesFilterProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const handleOrderingChange = (ordering: string) => {
        const params = new URLSearchParams(searchParams)
        params.set("ordering", ordering)
        params.delete("page") // Reset to page 1 when changing filters
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-4">Filtros</h3>

            <div className="space-y-4">
                <div>
                    <h4 className="font-medium mb-2">Ordenar por</h4>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="ordering"
                                checked={currentOrdering === "-rating"}
                                onChange={() => handleOrderingChange("-rating")}
                                className="mr-2"
                            />
                            Mejor valorados
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="ordering"
                                checked={currentOrdering === "-released"}
                                onChange={() => handleOrderingChange("-released")}
                                className="mr-2"
                            />
                            Más recientes
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="ordering"
                                checked={currentOrdering === "name"}
                                onChange={() => handleOrderingChange("name")}
                                className="mr-2"
                            />
                            Alfabético (A-Z)
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="ordering"
                                checked={currentOrdering === "-name"}
                                onChange={() => handleOrderingChange("-name")}
                                className="mr-2"
                            />
                            Alfabético (Z-A)
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
