/** ===============================================
 * 
 * NOTE: This test and all associated code and data
 * are confidential and are not to be shared with 
 * anyone outside of the Epsilon DSVA team.
 * 
 =================================================*/

import { PAGE_CUSTOMERS, PAGE_SALES } from "../../constants";
import Customers from "../customers";
import { NavContext } from "../navigation/context";
import Sales from "../sales";

 const Content = () => {
    return <NavContext.Consumer>
      {(({selectedTab}) => (
        <main>
          {selectedTab === PAGE_SALES && <Sales /> }
          {selectedTab === PAGE_CUSTOMERS && <Customers /> }   
        </main>
      ))}
    </NavContext.Consumer>
  };

  export default Content
  