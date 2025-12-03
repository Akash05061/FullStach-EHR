const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = React.useState(
    localStorage.getItem("token") || null
  );

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", jwt);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
