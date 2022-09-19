import LandingPage from "./component/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./component/Home";
function App() {
  return (
    <div className = "app">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ 
        <>
          <LandingPage/>
        </>}  
      />
      <Route path="/home" element={ 
        <>
          <Home />
        </>}  
      />

    </Routes>
  </BrowserRouter>
  </div>
 
 );
}

export default App;
