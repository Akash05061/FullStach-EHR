import { AuthContext } from "../context/AuthContext.js";

export default function Dashboard() {
  const { user } = React.useContext(AuthContext);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <p>Welcome, <strong>{user?.name}</strong></p>

      <div style={{ marginTop: "20px" }}>
        <a href="/patients">View Patients</a><br />
        <a href="/patients/new">Add New Patient</a>
      </div>
    </div>
  );
}
