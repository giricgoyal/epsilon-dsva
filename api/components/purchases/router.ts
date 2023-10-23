import express from 'express'
import { getAllPurchases, getMetricDataByMonth, getMetricDataBySegment, getMetricDataBySegmentAndDemographic } from './controller'
export const purchasesRouter = express.Router()

purchasesRouter.get('/by-month/:metric', getMetricDataByMonth)
purchasesRouter.get('/:metric/:segment/:demographic', getMetricDataBySegmentAndDemographic)
purchasesRouter.get('/:metric/:segment', getMetricDataBySegment)
purchasesRouter.get('/', getAllPurchases)