import { getData } from "./api";

export const getPeopleCountByAgeGroup = () => {
  return getData("people/group-by-age-group/count");
};

export const getAmountSpentByAgeGroup = () => {
  return getData("people/group-by-age-group/amount-spent");
};

export const getTotalNewReturningStats = () => {
  return getData("people/new-returning-stats");
};

export const getFavoriteFoodData = () => {
  return getData("people/favorite_food");
};

export const getFavoriteColorData = () => {
  return getData("people/favorite_color");
};

export const getFavoriteSportData = () => {
  return getData("people/favorite_sport");
};

export const getFavoriteHobbyData = () => {
  return getData("people/favorite_hobby");
};
