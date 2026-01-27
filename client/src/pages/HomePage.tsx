import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";

import { useAuth } from "../hooks/useAuth";
import "../css/style.css";
import { LOGOUT_USER } from "../api/authAPI";

export default function HomePage() {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { logout } = useAuth();

    const [logoutMutate] = useMutation(LOGOUT_USER);

    const handleLogout = async () => {
        await logoutMutate();

        logout();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-8 w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Real-Time Chat App</h2>
                {!isAuthenticated ? (
                    <>
                        <button
                            className="bg-blue-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </button>
                        <button
                            className="bg-green-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-[#5AF] text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                            onClick={() => navigate("/chat")}
                        >
                            Tasks
                        </button>
                        <button
                            className="bg-gray-500 text-white text-center py-2 px-4 rounded-lg w-full hover:bg-gray-600 mt-2"
                            onClick={() => handleLogout()}
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
