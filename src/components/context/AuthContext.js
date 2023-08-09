import { createContext } from "react"

export const AuthContext = createContext(1)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUser = () => {
    return useContext(UserContext);
  };
