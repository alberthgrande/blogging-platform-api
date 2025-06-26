import { useEffect, useState } from "react";
import { getPosts, refresh, logout } from "../api/auth";

export default function Dashboard({
  token,
  setToken,
}: {
  token: string;
  setToken: (t: string) => void;
}) {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await getPosts(token);
      setPosts(res.data);
    } catch {
      const res = await refresh();
      setToken(res.data.accessToken);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={fetchPosts}>Fetch Posts</button>
      <button
        onClick={async () => {
          await logout();
          setToken("");
        }}
      >
        Logout
      </button>

      <ul>
        {posts.map((p: any) => (
          <li key={p._id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
