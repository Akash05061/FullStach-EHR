import api from "../api/axios.js";

export default function PatientForm() {
  const [form, setForm] = React.useState({
    name: "",
    age: "",
    gender: "",
    condition: "",
    phone: "",
    address: "",
  });

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/patients", form);
    alert("Patient created");
    window.location.href = "/patients";
  };

  return (
    <div className="container mt-4">
      <h2>Add New Patient</h2>

      <form className="mt-3" onSubmit={submit}>
        {["name", "age", "gender", "condition", "phone", "address"].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.toUpperCase()}</label>
            <input
              className="form-control"
              name={field}
              value={form[field]}
              onChange={update}
            />
          </div>
        ))}

        <button className="btn btn-success">Create Patient</button>
      </form>
    </div>
  );
}
