import api from "../api/axios.js";

export default function PatientSearch() {
  const [patients, setPatients] = React.useState([]);

  React.useEffect(() => {
    api.get("/patients").then(res => setPatients(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Patients</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {patients.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.condition}</td>
              <td>
                <a className="btn btn-primary btn-sm" href={`/patients/${p.id}`}>
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
