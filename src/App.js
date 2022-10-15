import View from "./component/View";
import Signup from "./component/authentication/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
function App() {
  return (
    <div className = "app">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ 
        <>
          <View/>
        </>}  
        />
      <Route path="/signup" element={ 
        <>
       <Signup/>
        </>}  
        />
    </Routes>
  </BrowserRouter>
  </div>
 
 );
}


export default App;
