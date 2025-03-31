import { useState } from "react";

export default function Home() {
  const [traderId, setTraderId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ traderId }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/signal"; // Redirect to signal page
      } else {
        setError(data.message || "Invalid Trader ID");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Login / Register</h1>
      <form onSubmit={handleSubmit}>
        <label>Quotex Trader ID:</label>
        <input
          type="text"
          value={traderId}
          onChange={(e) => setTraderId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Submit"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
