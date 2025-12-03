import { AuthContext } from "../context/AuthContext.js";

export default function ProtectedRoute({ children }) {
  const { token } = React.useContext(AuthContext);

  if (!token) {
    // User is not logged in → redirect to login page
    window.location.href = "/login";
    return null;
  }

  return children;
}
