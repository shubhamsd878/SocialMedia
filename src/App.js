import LandingPage from "./component/LandingPage";
import { BrowserRouter} from "react-router-dom";
import { Routes, Route } from "react-router-loading";
import './App.css'
import Home from "./component/Home";
// import Header from './component/Navbar_Landing_Page'
import Navbar_Landing_Page from "./component/Navbar_Landing_Page";
import Navbar_Home_Page from "./component/Home/Navbar_Home_Page";
import UserProfile from "./component/userProfile/UserProfile";
// configuring topBar
import { topbar } from "react-router-loading";

topbar.config({
  autoRun: false,
  barThickness: 3,
  barColors: {
    0:'rgba(255, 196, 101, 1)',
    0.3:'rgba(255, 114, 0, 1)',
    1.0:'rgba(255, 0, 0, 0.7)'
  },
  shadowBlur: 5,
  shadowColor: 'red',
  className: 'topbar'
});


function App() {
  return (
    <div className = "app">
    <BrowserRouter>
    <Routes>
      { localStorage.getItem('authtoken') ? 
        (<Route path="/" element={ 
          <div className='home'>
            <Navbar_Home_Page />
            <Home />
          </div>}  
        loading
        />)
        :
        (<Route path="/" element={ 
          <div className='landing' style={{height:'100vh'}}>
            <Navbar_Landing_Page />
            <LandingPage/>
          </div>}  
        loading
        />)
      }
      <Route path='/userProfile/:id/*' element={<UserProfile />}  loading />
      {/* // route for userProfile page */}
    </Routes>
  </BrowserRouter>
  </div>
 
 );
}


export default App;
