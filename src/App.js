import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./container/Landing Page/LandingPage";
import ConsumerDashboard from "./component/consumer/Dashboard";
import ShowMoreRestaurants from "./component/consumer/restaurant/ShowMoreRestaurants";
import MenuPage from "./component/consumer/MenuPage/MenuPages";
import DeliveryDashboard from "./component/delivery agent/Dashboard";
import PartnerDashboard from "./component/partner/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import CheckoutPage from "./component/consumer/CheckoutPage/CheckoutPage";
import Confirmation from "./component/consumer/CheckoutPage/Customer/Confirmation";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/restaurants" element={<ConsumerDashboard />} />
        <Route path="/showMoreRes" element={<ShowMoreRestaurants />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <Confirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery-dashboard"
          element={
            <ProtectedRoute>
              <DeliveryDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner-dashboard"
          element={
            <ProtectedRoute>
              <PartnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
