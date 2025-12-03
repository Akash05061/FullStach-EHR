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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/patients", form);
      alert("Patient created successfully!");
      window.location.href = "/patients";
    } catch (err) {
      console.log(err);
      alert("Error creating patient");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Patient</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name:</label><br />
          <input name="name" value={form.name} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Age:</label><br />
          <input name="age" value={form.age} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Gender:</label><br />
          <input name="gender" value={form.gender} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Condition:</label><br />
          <input name="condition" value={form.condition} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Phone:</label><br />
          <input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Address:</label><br />
          <input name="address" value={form.address} onChange={handleChange} />
        </div>

        <button type="submit">Create Patient</button>
      </form>

      <br />
      <a href="/patients">⬅ Back to Patients</a>
    </div>
  );
}
