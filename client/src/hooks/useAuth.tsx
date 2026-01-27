import { useEffect, useState, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
interface ProviderProps {
    isAuthenticated: boolean;
    logining(accessToken: string, username: string): void;
    logout(): void;
}
const AuthContext = createContext<ProviderProps>({
    isAuthenticated: false,
    logining: () => {},
    logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");
        const username = sessionStorage.getItem("username");
        setIsAuthenticated(!!accessToken && !!username);
        setLoading(false);
    }, []);

    const logining = (accessToken: string, username: string) => {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("username", username);
        setIsAuthenticated(true);
        navigate("/chat");
    };

    const logout = () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("username");
        setIsAuthenticated(false);
        navigate("/");
    };

    const value = useMemo(() => ({ isAuthenticated, logining, logout }), [isAuthenticated]);

    if (loading) return <div>Loading...</div>;
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext)!;
}
