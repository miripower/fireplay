export interface Game {
    docId: string
    id: number
    slug: string
    name: string
    background_image: string
    rating: number
    released?: string
    genres?: Genre[]
    platforms?: { platform: Platform }[]
}

export interface GameDetails extends Game {
    description: string
    description_raw: string
    background_image_additional?: string
    website?: string
    developers?: Developer[]
    publishers?: Publisher[]
    esrb_rating?: ESRBRating
    metacritic?: number
    playtime?: number
    ratings?: Rating[]
    tags?: Tag[]
    stores?: { store: Store }[]
    parent_platforms?: { platform: Platform }[]
}

export interface Genre {
    id: number
    name: string
    slug: string
}

export interface Platform {
    id: number
    name: string
    slug: string
}

export interface Developer {
    id: number
    name: string
}

export interface Publisher {
    id: number
    name: string
}

export interface ESRBRating {
    id: number
    name: string
    slug: string
}

export interface Rating {
    id: number
    title: string
    count: number
    percent: number
}

export interface Tag {
    id: number
    name: string
}

export interface Store {
    id: number
    name: string
}

export interface Screenshot {
    id: number
    image: string
    width: number
    height: number
}
