import { createContext, Dispatch, SetStateAction } from "react";

// Define the context type
interface UserContextType {
  user: User | null; 
  setUser: Dispatch<SetStateAction<User | null>>;
  login: (id: string, name: string) => void;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
