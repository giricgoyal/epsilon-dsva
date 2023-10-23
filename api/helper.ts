import { FilterQuery } from "./types";

export const getFilterQuery = (query: FilterQuery) => ({
    location: query.location,
    category: query.category,
    subcategory: query.subcategory
})