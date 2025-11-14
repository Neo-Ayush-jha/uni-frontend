const API_BASE = import.meta.env.VITE_API_BASE || "https://university-backend-pbmo.onrender.com/";

export async function fetchUniversities() {
  const res = await fetch(`${API_BASE}/universities/`);
  if (!res.ok) throw new Error("Failed to fetch universities");

  return res.json();
}

export default { fetchUniversities };