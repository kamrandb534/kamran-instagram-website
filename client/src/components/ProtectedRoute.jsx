import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
