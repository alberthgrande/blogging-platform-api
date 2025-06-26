import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  if (!token) {
    return (
      <>
        {showRegister ? (
          <>
            <Register onRegister={setToken} />
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowRegister(false)}>Login</button>
            </p>
          </>
        ) : (
          <>
            <Login onLogin={setToken} />
            <p>
              Don't have an account?{" "}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </p>
          </>
        )}
      </>
    );
  }

  return <Dashboard token={token} setToken={setToken} />;
}

export default App;
