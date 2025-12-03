import { AuthContext } from "../context/AuthContext.js";

export default function Navbar() {
  const { user, logout, token } = React.useContext(AuthContext);

  // Hide navbar if not logged in
  if (!token) return null;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "12px 20px",
        background: "#1976d2",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px"
      }}
    >
      {/* Left side links */}
      <div>
        <a href="/dashboard" style={{ color: "white", marginRight: "20px" }}>
          Dashboard
        </a>
        <a href="/patients" style={{ color: "white", marginRight: "20px" }}>
          Patients
        </a>
        <a href="/patients/new" style={{ color: "white" }}>
          Add Patient
        </a>
      </div>

      {/* Right side user + logout */}
      <div>
        <span style={{ marginRight: "20px" }}>
          Logged in as <strong>{user?.name}</strong>
        </span>

        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            background: "white",
            color: "#1976d2",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
