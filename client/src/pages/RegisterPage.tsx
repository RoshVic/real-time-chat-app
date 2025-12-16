import { useState } from "react";
import { register } from "../api/authAPI";
import { useNavigate } from "react-router-dom";
import "../css/style.css";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        try {
            await register(email, password, username);
            setMessage("Registration is successful! Now login.");
            setEmail("");
            setPassword("");
            setUsername("");
        } catch {
            setMessage("Registration error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-8 w-80">
                <form onSubmit={handleRegister}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Registration</h2>
                    {message && <p className="text-green-500 text-center mb-4 ">{message}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded-lg p-2 w-full mb-3"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border rounded-lg p-2 w-full mb-3"
                        required
                    />
                    <input
                        type="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border rounded-lg p-2 w-full mb-5"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg w-full hover:bg-green-600"
                    >
                        {loading ? "Creating..." : "Create an account"}
                    </button>
                </form>
                <button
                    className="bg-blue-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
            </div>
        </div>
    );
}
