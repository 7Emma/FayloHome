import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/Home";
import MaisonsALouer from "../pages/Lacotion";
import AboutUs from "../pages/About";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/maisons" element={<MaisonsALouer />}></Route>
      <Route path="/apropos" element={<AboutUs />}></Route>
    </Routes>
  );
}

export default AppRoutes;
