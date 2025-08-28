import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/Home";
import PropertyDetail from "../components/ui/PropertyDetail";
import AboutUs from "../pages/About";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Appartements from "../pages/Appartements";
import Favoris from "../pages/Favoris";
import Proprietaire from "../pages/Proprietaire";
import { MaintenanceWrapper } from "../components/ui/MaintenancePage";

function AppRoutes() {
  return (
    <MaintenanceWrapper>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/appartements" replace />}
        ></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/appartements" element={<Appartements />}></Route>
        <Route path="/apropos" element={<AboutUs />}></Route>
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="favoris" element={<Favoris />}></Route>
        <Route path="proprietaire" element={<Proprietaire />}></Route>
      </Routes>
    </MaintenanceWrapper>
  );
}

export default AppRoutes;
