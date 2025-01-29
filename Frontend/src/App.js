import Navbar from "./Components/Navbar/Navbar";
import Home from './Components/Home/Home'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import AddExpense from "./Components/AddExpense/AddExpense";
import RemoveExpense from './Components/RemoveExpense/RemoveExpense'
import Auth from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
const apiUrl = process.env.REACT_APP_FRONTEND_URL_PRODUCTION || "http://localhost:5000";



const App = () => {

  return (
    <>
<BrowserRouter>
      <Appf />
      </BrowserRouter>
    </>
  );
}

const Appf = () => {
  const location = useLocation();
  const hidepath = ["/login", "/register"]
  const hidecomponents = hidepath.includes(location.pathname);
  return(
  <>
    {
    !hidecomponents &&
      <Navbar />
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Add" element={<AddExpense />} />
        <Route path="/Remove-Expense" element={<RemoveExpense />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    {/* </BrowserRouter> */}
  </>
  )

}

export default App;
