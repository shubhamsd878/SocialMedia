import React from 'react'
import { Routes, Route } from "react-router-loading";
import Navbar_Home_Page from "./component/Home/Navbar_Home_Page";
import Home from "./component/Home";

const Layout = () => {
  return (
    <div className='home'>
        <Navbar_Home_Page />
        {/* <Routes> */}
            <Route index element={(<div> Hello wrold</div>)} />
            
        {/* </Routes> */}

    </div>
  )
}

export default Layout