import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "../Pages/LoginPage";
import NotFound from "../Pages/NotFound";
import BooksPage from "../Pages/BooksPage";
import SignupPage from "../Pages/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<LoginPage />}
        />
        <Route
          path="/signup"
          element={<SignupPage />}
        />
        {/* Protected Routes */}
        <Route
          path="/bookPage"
          element={
            <ProtectedRoute>
              <BooksPage />
            </ProtectedRoute>
          }
        />
        {/* Not Found */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;