import api from "../api/axios.js";
const { useParams } = ReactRouterDOM;

export default function PatientProfile() {
  const { id } = useParams();
  const [patient, setPatient] = React.useState(null);

  React.useEffect(() => {
    api.get(`/patients/${id}`).then(res => setPatient(res.data));
  }, []);

  if (!patient) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h2>Patient Details</h2>

      <ul className="list-group mt-3">
        <li className="list-group-item"><strong>Name:</strong> {patient.name}</li>
        <li className="list-group-item"><strong>Age:</strong> {patient.age}</li>
        <li className="list-group-item"><strong>Gender:</strong> {patient.gender}</li>
        <li className="list-group-item"><strong>Condition:</strong> {patient.condition}</li>
        <li className="list-group-item"><strong>Phone:</strong> {patient.phone}</li>
        <li className="list-group-item"><strong>Address:</strong> {patient.address}</li>
      </ul>

      <a href="/patients" className="btn btn-secondary mt-3">Back</a>
    </div>
  );
}
