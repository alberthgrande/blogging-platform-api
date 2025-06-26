import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState("");

  return (
    <>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
        <Dashboard token={token} setToken={setToken} />
      )}
    </>
  );
}

export default App;
