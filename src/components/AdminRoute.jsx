import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, isAdmin, loading } = useAuth();

  // Wait until auth loads
  if (loading) {
    return (
      <div style={{ padding: 80, textAlign: "center" }}>
        <h2>Checking permissions...</h2>
      </div>
    );
  }

  // If not logged in → login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not admin → home
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If admin → allow access
  return children;
}
