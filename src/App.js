import Footer from "./component/Footer";
import Header from "./component/Header";
import View from "./component/View";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formfordev from "./component/Formfordev";
import Upper from "./component/Upper";
import './App.css'
function App() {
  return (
    <div className = "app">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={ 
        <>
          <Header name="Document" procs="Development" link="/dev" />
          <Upper name="Document"/> 
          <View/>
          <Footer/>
        </>}  
        />
    </Routes>
  </BrowserRouter>
  </div>
 
 );
}

export default App;
