import { metricFnMap } from "./helper";
import { FilterQuery, PurchaseType } from "./types";

class Purchases {
    purchases: PurchaseType[] = []

    constructor () {
        this.purchases = require("../../../data/purchases.json");
    }

    getPurchases () {
        return this.purchases
    }

    getPurchasesByBuyerId (buyerId: string) {
        return this.purchases.filter(({buyer_id}) => buyerId === buyer_id)
    }

    getFilteredPurchases (query: FilterQuery) {
        return this.purchases
        .filter((purchase) => {
            return Object.entries(query).every(([key, value]) => {
                if (value === undefined) {
                    return true
                }
                const values = value.split(',')
                const purchaseValue = purchase[key]
                return values.includes(`${purchaseValue}`)
            })
        })
    }

    getTotalMetric (metric: string, query: FilterQuery) {
        return this.getFilteredPurchases(query)
            .reduce((total, purchase) => total +  metricFnMap[metric](purchase), 0);
    }

    getTotalMetricBySegment (metric: string, segment: string, query: FilterQuery) {
        const totalsBySegment: {
            [key: string]: number
        } = {};

        this.getFilteredPurchases(query).forEach(purchase => {
            const segmentKey = purchase[segment];

            if (totalsBySegment[segmentKey]) {
                totalsBySegment[segmentKey] += metricFnMap[metric](purchase);
            } else {
                totalsBySegment[segmentKey] = metricFnMap[metric](purchase);
            }
        });

        return totalsBySegment
    }
}

export default new Purchases()

