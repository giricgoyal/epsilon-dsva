import { PurchaseType } from "./types";

export const metricFnMap: {
    [key: string]: Function
} = {
    'no-of-orders': () => 1,
    'revenue': ({unit_price, item_count}: PurchaseType) => unit_price * item_count,
    'no-of-units': ({item_count}: PurchaseType) => item_count
}