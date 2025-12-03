import { AuthContext } from "../context/AuthContext.js";

export default function Navbar() {
  const { user, logout, token } = React.useContext(AuthContext);

  if (!token) return null;

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <a className="navbar-brand" href="/dashboard">EHR System</a>

      <button
        className="navbar-toggler"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div id="nav" className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item"><a className="nav-link" href="/dashboard">Dashboard</a></li>
          <li className="nav-item"><a className="nav-link" href="/patients">Patients</a></li>
          <li className="nav-item"><a className="nav-link" href="/patients/new">Add Patient</a></li>
        </ul>

        <span className="navbar-text me-3">
          {user?.name}
        </span>

        <button className="btn btn-light" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
