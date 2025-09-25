import { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../contexts/AuthContext";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  // const { login } = useContext(AuthContext);
  const login = useSelector((state) => state.auth.login);

  if (!login) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
