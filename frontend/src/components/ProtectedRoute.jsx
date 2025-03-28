import { Navigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  // Use memoization to optimize access checking
  const isAuthorized = useMemo(() => {
    if (!user) return false;
    if (adminOnly && !user.isAdmin) return false;
    return true;
  }, [user, adminOnly]);

  return isAuthorized ? children : <Navigate to={user ? "/" : "/login"} />;
};

export default ProtectedRoute;
