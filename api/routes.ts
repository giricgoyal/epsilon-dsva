/** ===============================================
 * 
 * NOTE: This test and all associated code and data
 * are confidential and are not to be shared with 
 * anyone outside of the Epsilon DSVA team.
 * 
 =================================================*/

import { app } from "./app";
import { peopleRouter } from "./components/people/router";
import { purchasesRouter } from "./components/purchases/router";



/**
 * Get all People
 */
app.use("/api/people", peopleRouter);

/**
 * Get all Purchases
 */
app.use("/api/purchases", purchasesRouter);

// OPTIONAL: Your Routes Go Here
