import { ABOVE_65, BW_18_24, BW_25_34, BW_35_44, BW_45_54, BW_55_64, UNDER_18 } from './constants';

export const getEmptyAgeGroups = (): {
    [key: string]: number
} => ({
    [UNDER_18]: 0,
    [BW_18_24]: 0,
    [BW_25_34]: 0,
    [BW_35_44]: 0,
    [BW_45_54]: 0,
    [BW_55_64]: 0,
    [ABOVE_65]: 0,
})

export const getAgeGroup = (age: number): string => {
    if (age >= 65) {
        return ABOVE_65
    }
    if (age >= 55) {
        return BW_55_64
    }
    if (age >= 45) {
        return BW_45_54
    }
    if (age >= 35) {
        return BW_35_44
    }
    if (age >= 25) {
        return BW_25_34
    }
    if (age >= 18) {
        return BW_18_24
    }

    return UNDER_18
}