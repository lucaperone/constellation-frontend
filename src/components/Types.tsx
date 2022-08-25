export type Node = {
    id: number
    name: string
    features: {
        [key: string]: number
    }
}

export type List = {
    title: string
    ref?: {
        type: string
        id: number
        name: string
    }
    url: string
    items: {
        item: Node
        is_in_favourites: boolean
        rating: number | null
    }[]
}
