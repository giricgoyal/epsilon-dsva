import { Request, Response } from 'express'
import purchaseModel from './model'
import { getFilterQuery } from '../../helper'
import { metricFnMap } from './helper'
import peopleModel from '../people/model'

export const getAllPurchases = async (req: Request, res: Response): Promise<void> => {
    try {
        res.status(200).json(purchaseModel.getPurchases())
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'An error occured',
            error
        })
    }
}

export const getMetricDataBySegment =async (req: Request, res: Response): Promise<void> => {
    try {
        const segment = req.params.segment
        const metric = req.params.metric
        const query = req.query
        
        const filterQuery = getFilterQuery(query)
        const totalsBySegment = purchaseModel.getTotalMetricBySegment(metric, segment, filterQuery)
        const total = purchaseModel.getTotalMetric(metric, filterQuery)

        res.status(200).json({
            data: totalsBySegment,
            total
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'An error occured',
            error
        })
    }
}

export const getMetricDataByMonth = async (req:Request, res: Response): Promise<void> => {
    try {
        const metric = req.params.metric
        const dataByMonth: {
            [key: number]: number
        } = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0,
            10: 0,
            11: 0,
            12: 0
        }

        const query = req.query
        const filterQuery = getFilterQuery(query)
        const purchases = purchaseModel.getFilteredPurchases(filterQuery)

        purchases.forEach(purchase => {
            const value = metricFnMap[metric](purchase)
            const date = new Date(purchase.date)
            const month = date.getMonth() + 1
            dataByMonth[month] = dataByMonth[month] + value
        })

        res.status(200).json({
            data: dataByMonth
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: 'An error occured',
            error
        })
    }
}

export const getMetricDataBySegmentAndDemographic = async (req: Request, res: Response): Promise<void> => {
    try {
        const metric = req.params.metric
        const segment = req.params.segment
        const demographic = req.params.demographic
        const query = req.query
        const filterQuery = getFilterQuery(query)
        const purchases = purchaseModel.getFilteredPurchases(filterQuery)

        const data: {
            [key: string]: {
                [key: string]: number
            }
        } = {}

        purchases.forEach(purchase => {
            const value = metricFnMap[metric](purchase)
            const segmentKey = purchase[segment];
            const {buyer_id} = purchase
            const buyer = peopleModel.getPeopleByBuyerId(buyer_id)
            const demographicKey = buyer?.[demographic]
            if (demographicKey) {
                data[segmentKey] = {
                    ...(data[segmentKey] || {}),
                    [demographicKey]: data?.[segmentKey]?.[demographicKey] ? data?.[segmentKey]?.[demographicKey] + value : value
                }
            }
        })

        res.status(200).json({
            data
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({
            message: 'An error occured',
            error
        })
    }
}