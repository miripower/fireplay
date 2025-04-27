import { Monitor, Gamepad2, Smartphone, Apple, LaptopIcon as Linux, Globe } from "lucide-react"

interface GamePlatformsProps {
    platforms: { platform: { id: number; name: string; slug: string } }[]
}

export default function GamePlatforms({ platforms }: GamePlatformsProps) {
    if (!platforms || platforms.length === 0) {
        return <p className="text-gray-400">Plataformas no disponibles</p>
    }

    // Get unique platforms
    const uniquePlatforms = platforms.reduce(
        (acc, curr) => {
            const platform = curr.platform
            if (!acc.some((p) => p.id === platform.id)) {
                acc.push(platform)
            }
            return acc
        },
        [] as { id: number; name: string; slug: string }[],
    )

    const getPlatformIcon = (slug: string) => {
        switch (slug) {
            case "pc":
                return <Monitor size={20} />
            case "playstation":
            case "xbox":
            case "nintendo":
                return <Gamepad2 size={20} />
            case "ios":
            case "android":
                return <Smartphone size={20} />
            case "mac":
                return <Apple size={20} />
            case "linux":
                return <Linux size={20} />
            default:
                return <Globe size={20} />
        }
    }

    return (
        <div className="space-y-2">
            {uniquePlatforms.map((platform) => (
                <div key={platform.id} className="flex items-center gap-2">
                    <span className="text-gray-400">{getPlatformIcon(platform.slug)}</span>
                    <span>{platform.name}</span>
                </div>
            ))}
        </div>
    )
}
