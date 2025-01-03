import {
    createContext,
} from "react";
import { Socket } from "socket.io-client";

// Define the shape of the context value
interface SocketContextValue {
    socket: Socket | null;
    connectSocket: (userID: string) => void;
    disconnectSocket: () => void;
}


// Create the context
const SocketContext = createContext<SocketContextValue | undefined>(undefined);

export default SocketContext;