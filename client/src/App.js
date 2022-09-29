import {BrowserRouter,Routes, Route} from "react-router-dom"
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import Home from "./components/Home"

function App() {
  return (
   <BrowserRouter>
   
   <Routes>
    <Route path="/" element ={<Home />} />
    <Route path="/new" element ={<AddBook />} />
    <Route path="/edit" element ={<EditBook />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
