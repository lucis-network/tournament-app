// components/layout.js
import React, { useState } from "react";

import AppHeader from "./Header/Header";
// import AppFooter from "./Footer";



function AppLayout(props) {
  const { children } = props;

  return (
    <div className="app-layout">
      <AppHeader />
      <div id="app-main">{children}</div>
      {/*<AppFooter />*/}
    </div>
  )
}

export default AppLayout

