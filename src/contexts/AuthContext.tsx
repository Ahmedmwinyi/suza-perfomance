import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User, UserRole } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo purposes
const mockUsers: User[] = [
  {
    id: "1",
    email: "employee@suza.ac.tz",
    firstName: "Amina",
    lastName: "Hassan",
    role: "employee",
    department: "Computer Science",
    position: "Lecturer",
    employeeId: "EMP001",
    supervisorId: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    email: "appraiser@suza.ac.tz",
    firstName: "Dr. Mohamed",
    lastName: "Ali",
    role: "appraiser",
    department: "Computer Science",
    position: "Senior Lecturer",
    employeeId: "EMP002",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    email: "hod@suza.ac.tz",
    firstName: "Prof. Fatma",
    lastName: "Omar",
    role: "hod",
    department: "Computer Science",
    position: "Head of Department",
    employeeId: "EMP003",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    email: "hr@suza.ac.tz",
    firstName: "Khadija",
    lastName: "Mwalimu",
    role: "hr",
    department: "Human Resources",
    position: "HR Manager",
    employeeId: "EMP004",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    email: "head@suza.ac.tz",
    firstName: "Prof. Salim",
    lastName: "Rashid",
    role: "institution_head",
    department: "Administration",
    position: "Vice Chancellor",
    employeeId: "EMP005",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("suza_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, ): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("suza_user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("suza_user");
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
