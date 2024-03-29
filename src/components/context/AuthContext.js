import { createContext, useState, useContext } from "react"


export const AuthContext = createContext(1)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    return (
      <AuthContext.Provider value={{ user, setUser }}>
        {children }
      </AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    return useContext(AuthContext);
  };
