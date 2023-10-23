import express from 'express'
import { getAllPeople, getAmountSpentGroupByAgeGroup, getCountGroupByAgeGroup, getDataBySegment, getNewReturningStats } from './controller'
export const peopleRouter = express.Router()

peopleRouter.get('/group-by-age-group/count', getCountGroupByAgeGroup)
peopleRouter.get('/group-by-age-group/amount-spent', getAmountSpentGroupByAgeGroup)
peopleRouter.get('/new-returning-stats', getNewReturningStats)
peopleRouter.get('/:segment', getDataBySegment)

peopleRouter.get('/', getAllPeople)