import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import Location from "../pages/Location";
import PropertyDetail from "../components/ui/PropertyDetail";
import AboutUs from "../pages/About";
import Register from "../pages/Register";
import Login from "../pages/Login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/maisons" element={<Location />}></Route>
      <Route path="/apropos" element={<AboutUs />}></Route>
      <Route path="/properties/:id" element={<PropertyDetail />} />
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
  );
}

export default AppRoutes;
