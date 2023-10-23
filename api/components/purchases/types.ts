export type PurchaseType = {
    buyer_id: string
    item_count: number
    unit_price: number
    date: string
    location: string
    category: string
    sub_category: string,
    [key: string]: string | number
}

export type FilterQuery = {
    [key: string]: any
}