// Item-related types
export interface Item {
    id: number
    title: string
    description: string
    condition: string
    image: string
    owner: string
    tradable: boolean
    offers: Offer[]
}

export interface Offer extends Item {
    id: number
    itemId: number
    offerer: string
    offeredItemId: number
    status: 'pending' | 'accepted' | 'rejected'
}

export interface User {
    id: number
    username: string
    password: string
    contact: string
}