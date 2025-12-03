import api from "../api/axios.js";

export default function PatientSearch() {
  const [patients, setPatients] = React.useState([]);

  React.useEffect(() => {
    api.get("/patients")
      .then((res) => setPatients(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patients</h2>

      {patients.length === 0 && <p>No patients yet.</p>}

      <ul>
        {patients.map((p) => (
          <li key={p.id} style={{ marginBottom: "10px" }}>
            <a href={`/patients/${p.id}`}>
              {p.name} — {p.condition}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
