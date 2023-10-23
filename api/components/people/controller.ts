import { Request, Response } from "express";
import { getAgeGroup, getEmptyAgeGroups } from "./helper";
import peopleModel from "./model";
import purchasesModel from "../purchases/model";

export const getAllPeople = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.status(200).json({ data: peopleModel.getPeople() });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured",
    });
  }
};

export const getCountGroupByAgeGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Define age groups and initialize count for each group
    const ageGroups: {
      [key: string]: number;
    } = getEmptyAgeGroups();

    // Loop through each
    for (const customer of peopleModel.getPeople()) {
      const { age } = customer;

      // Determine the age group
      const ageGroup = getAgeGroup(age);

      // Increment the count for the corresponding age group
      ageGroups[ageGroup]++;
    }
    res.status(200).json({
      data: ageGroups,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured",
    });
  }
};

export const getAmountSpentGroupByAgeGroup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Define age groups and initialize count for each group
    const ageGroups: {
      [key: string]: number;
    } = getEmptyAgeGroups();

    // Loop through each customer
    const people = peopleModel.getPeople();
    for (const customer of people) {
      const { age, buyer_id } = customer;
      const purchases = purchasesModel.getPurchasesByBuyerId(buyer_id);
      const totalAmountSpent = Number(
        purchases
          .reduce((accum, curr) => {
            accum = accum + curr.unit_price * curr.item_count;
            return accum;
          }, 0)
          .toFixed(2)
      );

      // Determine the age group
      const ageGroup = getAgeGroup(age);

      // Increment the count for the corresponding age group
      ageGroups[ageGroup] = Number(
        (ageGroups[ageGroup] + totalAmountSpent).toFixed(2)
      );
    }
    res.status(200).json({
      data: ageGroups,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured",
    });
  }
};

export const getNewReturningStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const query = req.query;
    const filterQuery = {
      ageGroup: query.agegroup,
    };

    const uniqueBuyersByMonth: {
      [key: string]: {
        [key: string]: boolean;
      };
    } = {};

    const resultsByMonth: {
      [key: string]: {
        totalCustomers: number;
        newCustomers: number;
        returningCustomers: number;
      };
    } = {};

    const filteredBuyerIds = peopleModel
      .getFilteredPeople(filterQuery)
      .map(({ buyer_id }) => buyer_id);
    purchasesModel.getPurchases().forEach((purchase) => {
      const buyerID = purchase.buyer_id;
      if (filteredBuyerIds.includes(buyerID)) {
        const purchaseDate = new Date(purchase.date);
        const monthKey = `${purchaseDate.getFullYear()}-${(
          purchaseDate.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;

        if (!resultsByMonth[monthKey]) {
          resultsByMonth[monthKey] = {
            totalCustomers: 0,
            newCustomers: 0,
            returningCustomers: 0,
          };
          uniqueBuyersByMonth[monthKey] = {};
        }

        // Increment the total customer count for the month
        resultsByMonth[monthKey].totalCustomers++;

        // Check if the buyer ID is already in the uniqueBuyers object for the current month
        if (uniqueBuyersByMonth[monthKey][buyerID]) {
          // If it exists, it's a returning customer
          resultsByMonth[monthKey].returningCustomers++;
        } else {
          // If it doesn't exist, it's a new customer
          uniqueBuyersByMonth[monthKey][buyerID] = true;
          resultsByMonth[monthKey].newCustomers++;
        }
      }
    });

    res.status(200).json({
      data: resultsByMonth,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured",
    });
  }
};

export const getDataBySegment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const segment: string = req.params.segment;
    const query = req.query;
    const filterQuery = {
      ageGroup: query.agegroup,
    };

    if (
      ![
        "favorite_food",
        "favorite_color",
        "favorite_sport",
        "favorite_hobby",
      ].includes(segment)
    ) {
      throw new Error("segment not available");
    }
    const countMap: {
      [key: string]: number;
    } = {};

    const customers = peopleModel.getFilteredPeople(filterQuery);
    customers.forEach((customer) => {
      const countMapKey = customer[segment];

      if (countMap[countMapKey]) {
        countMap[countMapKey] = countMap[countMapKey] + 1;
      } else {
        countMap[countMapKey] = 1;
      }
    });

    const totalCustomers = customers.length;

    res.status(200).json({
      data: countMap,
      total: totalCustomers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occured",
      error,
    });
  }
};
