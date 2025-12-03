import { AuthContext } from "../context/AuthContext.js";

export default function ProtectedRoute({ children }) {
  const { token } = React.useContext(AuthContext);

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  return children;
}
