import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  role: "ADMIN" | "USER" | string; 
  exp: number;
  iat: number;
}

interface AuthContextType {
  user: DecodedToken | null;
  token: string | null;
  role: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);

        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setToken(storedToken);
          setUser(decoded);
          setRole(decoded.role);
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (authToken: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(authToken);

      setToken(authToken);
      setUser(decoded);
      setRole(decoded.role);

      localStorage.setItem("token", authToken);

      if (decoded.role === "ADMIN") {
        navigate("/enquiries");
      } else {
        navigate("/products");
      }
    } catch (error) {
      console.error("Login failed: Invalid Token");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
