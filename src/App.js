import LandingPage from "./component/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./component/Home";
// import Header from './component/Navbar_Landing_Page'
import Navbar_Landing_Page from "./component/Navbar_Landing_Page";
import Navbar_Home_Page from "./component/Home/Navbar_Home_Page";
import UserProfile from "./component/userProfile/UserProfile";

function App() {
  return (
    <div className = "app">
    <BrowserRouter>
    <Routes>
      { localStorage.getItem('auth') ? 
        (<Route path="/" element={ 
          <div className='home'>
            <Navbar_Home_Page />
            <Home />
          </div>}  
        />)
        :
        (<Route path="/" element={ 
          <div className='landing' style={{height:'100vh'}}>
            <Navbar_Landing_Page />
            <LandingPage/>
          </div>}  
        />)
      }
      {/* // route for userProfile page */}
      {/* <Route path='/userProfile' elemtent={<userProfile /> } /> */}
      <Route path='/userProfile' element={<UserProfile /> } />
    </Routes>
  </BrowserRouter>
  </div>
 
 );
}


export default App;
