import { ReactNode, useContext, useEffect, useState } from "react";
import SocketContext from "./socketContext";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../apis";

interface SocketContextProviderProps {
    children: ReactNode;
}

// Define the provider component
export const SocketProvider: React.FC<SocketContextProviderProps> = ({
    children
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    const connectSocket = (userID: string) => {
        if (socket) return;

        const newSocket = io(SERVER_URL, {
            transports: ["websocket"],
            query: { userID },
        });

        newSocket.on("connect", () =>
            console.log("Socket connected:", newSocket.id)
        );
        newSocket.on("disconnect", () => console.log("Socket disconnected"));

        setSocket(newSocket);
    };

    const disconnectSocket = () => {
        if (socket) {
            socket.disconnect();
            setSocket(null);
        }
    };

    useEffect(() => {
        return () => {
            disconnectSocket();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

// Custom hook to use the socket context
export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};
