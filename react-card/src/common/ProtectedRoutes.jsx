import { useAuth } from "../context/auth-context";
import { Navigate } from "react-router-dom";

function ProtectedRoutes({ children, onlyBiz = false }) {
  const { user } = useAuth();
  if (!user || (onlyBiz && !user.biz)) {
    return <Navigate to="/signin"></Navigate>;
  }
  return children;
}

export default ProtectedRoutes;
