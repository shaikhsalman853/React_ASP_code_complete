import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../Pages/LoginPage";
import NotFound from "../Pages/NotFound";
import BooksPage from "../Pages/BooksPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Book Page */}
        <Route path="/bookPage" element={<BooksPage />} />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;