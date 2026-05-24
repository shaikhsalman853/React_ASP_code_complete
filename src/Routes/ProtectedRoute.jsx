import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const loginInfo = sessionStorage.getItem("loginInfo");

  // if not logged in
  if (!loginInfo) {
    return <Navigate to="/" replace />;
  }

  // if logged in
  return children;
};

export default ProtectedRoute;