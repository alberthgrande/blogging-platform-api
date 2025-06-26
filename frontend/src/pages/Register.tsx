import { useState } from "react";
import { register } from "../api/auth";

export default function Register({
  onRegister,
}: {
  onRegister: (token: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await register(email, password);
      // If your backend returns accessToken after registration:
      const token = response.data.accessToken;
      onRegister(token); // call the prop to set token or navigate
      alert("Registered successfully!");
    } catch (err) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
