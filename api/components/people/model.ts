import { FilterQuery } from "../purchases/types";
import { getAgeGroup } from "./helper";
import { PeopleType } from "./types";

class People {
    people: PeopleType[] = []

    constructor () {
        this.people = require("../../../data/people.json");
    }

    getPeople () {
        return this.people
    }

    getPeopleByBuyerId (buyerId: string) {
        return this.getPeople().find(({buyer_id}) => buyerId === buyer_id)
    }

    getFilteredPeople (query: FilterQuery) {
        const {ageGroup, ...restQuery} = query
        return this.getPeople()
        .filter((people) => {
            return Object.entries(restQuery).every(([key, value]) => {
                if (value === undefined) {
                    return true
                }
                const values = value.split(',')
                const peopleValue = people[key]
                return values.includes(`${peopleValue}`)
            }) && (!ageGroup || getAgeGroup(people.age) === ageGroup)
        })
    }
}

export default new People()

