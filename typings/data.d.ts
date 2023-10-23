/* ===============================================
 * Author: Epsilon DSVA Team
 * 
 * NOTE: This test and all associated code and data
 * are confidential and are not to be shared with 
 * anyone outside of the Epsilon DSVA team.
 * 
 =================================================*/

/**
 * A Purchase made by an individual.
 */
declare type Purchase = {
  /**
   * The ID of the individual who made the purchase
   */
  buyer_id: string;
  /**
   * The date of the purchase (string)
   */
  date: string;
  /**
   * The State where the purchase was made
   */
  location: string;

  /**
   * the high-level category of the item
   */
  category: string;
  /**
   * the subcategory of the item
   */
  subcategory: string;

  /**
   * The price of each item
   */
  unit_price: number;
  /**
   * The number of this item purchased
   */
  item_count: number;
};

declare type Person = {
  buyer_id: string;

  age: number;

  favorite_color: string;
  favorite_color_code: string;

  favorite_sport: string;
  favorite_hobby: string;
  favorite_food: string;
};
