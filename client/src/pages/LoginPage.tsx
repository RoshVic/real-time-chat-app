import { useState } from "react";
import { login } from "../api/authAPI";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../css/style.css";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { logining } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await login(email, password);
            logining(data.accessToken);
        } catch (err) {
            setError("Wrong email or password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-8 w-80">
                <form onSubmit={handleLogin}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

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
                        className="border rounded-lg p-2 w-full mb-5"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600"
                    >
                        {loading ? "Entering..." : "Enter"}
                    </button>
                </form>
                <button
                    className="bg-green-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>
            </div>
        </div>
    );
}
