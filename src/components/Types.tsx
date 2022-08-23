export type Item = {
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
    items: Item[]
}
