import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  role: string;
  id: string;
};

export default function AdminPanel({ token }: { token: string }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const decoded = jwtDecode<JwtPayload>(token);
    setIsAdmin(decoded.role === "admin");
  }, [token]);

  if (!isAdmin) return <p>Access denied. Admins only.</p>;

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Only visible to admins.</p>
      {/* Add admin tools here */}
    </div>
  );
}
