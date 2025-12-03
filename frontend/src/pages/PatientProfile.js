import api from "../api/axios.js";

export default function PatientProfile() {
  const params = ReactRouterDOM.useParams();
  const patientId = params.id;

  const [patient, setPatient] = React.useState(null);

  React.useEffect(() => {
    api.get(`/patients/${patientId}`)
      .then((res) => setPatient(res.data))
      .catch((err) => console.log(err));
  }, [patientId]);

  if (!patient) return <p style={{ padding: "20px" }}>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patient Profile</h2>

      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Age:</strong> {patient.age}</p>
      <p><strong>Gender:</strong> {patient.gender}</p>
      <p><strong>Condition:</strong> {patient.condition}</p>
      <p><strong>Phone:</strong> {patient.phone}</p>
      <p><strong>Address:</strong> {patient.address}</p>

      <br />

      <a href="/patients">⬅ Back to Patients</a>
    </div>
  );
}
