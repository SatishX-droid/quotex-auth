import { useState } from "react";

export default function Login() {
    const [traderId, setTraderId] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ traderId }),
        });

        const data = await res.json();
        setMessage(data.message || data.error);
    };

    return (
        <div>
            <h2>Login / Register</h2>
            <form onSubmit={handleSubmit}>
                <label>Quotex Trader ID:</label>
                <input
                    type="text"
                    value={traderId}
                    onChange={(e) => setTraderId(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
}
