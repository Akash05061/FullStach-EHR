import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.js";

export default function LoginPage() {
  const { login } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Email</label>
          <input className="form-control"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input className="form-control" type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
          />
        </div>

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
