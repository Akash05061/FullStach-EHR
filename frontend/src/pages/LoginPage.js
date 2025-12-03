import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext.js";

export default function LoginPage() {
  const { login } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user, res.data.token);
      alert("Login successful!");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label><br />
          <input
            type="text"
            value={email}
            placeholder="admin@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={{ marginTop: "15px" }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
