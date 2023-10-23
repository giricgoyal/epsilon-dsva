import React from "react";
import { PAGE_SALES } from "../../constants";

export const NavContext = React.createContext({
    selectedTab: PAGE_SALES,
    setSelectedTab: (page: string) => {}
})