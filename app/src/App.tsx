/** ===============================================
 * 
 * NOTE: This test and all associated code and data
 * are confidential and are not to be shared with 
 * anyone outside of the Epsilon DSVA team.
 * 
 =================================================*/
import React, {useState} from 'react'
import Header from "./components/header";
import Content from "./components/content";

import "../style/app.scss";
import { NavContext } from "./components/navigation/context";
import { PAGE_SALES } from './constants';

export function App() {
  const [selectedTab, setSelectedTab] = useState(PAGE_SALES)
  return (
    <NavContext.Provider value={{selectedTab, setSelectedTab}}>
      <Header />
      <Content />
    </NavContext.Provider>
  );
}
