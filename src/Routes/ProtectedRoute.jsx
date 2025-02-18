import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);

  return user && allowedRoles.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
