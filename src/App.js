import LandingPage from "./component/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./component/Home";
import Header from './component/Header'
function App() {
  return (
    <div className = "app">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ 
        <div style={{height:'100vh'}}>
          <Header />
          <LandingPage/>
        </div>}  
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
