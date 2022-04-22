// components/layout.js
import React, { useState } from "react";

import AppHeader from "./ui/header/Header";



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

