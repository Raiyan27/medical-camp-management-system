import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser, admin } = useContext(AuthContext);

  return currentUser && admin ? children : <Navigate to="/user-dashboard" />;
};

export default PrivateRoute;
