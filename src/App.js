import View from "./component/View";
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
    </Routes>
  </BrowserRouter>
  </div>
 
 );
}

export default App;
