import { useEffect, useState, createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
interface ProviderProps {
    isAuthenticated: boolean;
    logining(accessToken: string): void;
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
        setIsAuthenticated(!!accessToken);
        setLoading(false);
    }, []);

    const logining = (accessToken: string) => {
        sessionStorage.setItem("accessToken", accessToken);
        setIsAuthenticated(true);
        navigate("/chats");
    };

    const logout = () => {
        sessionStorage.removeItem("accessToken");
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
