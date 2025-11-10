import { useEffect, useState } from "react";
import SocketService from "../utils/socket";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = SocketService.connect();
    setSocket(socketInstance);

    socketInstance.on("connect", () => setIsConnected(true));
    socketInstance.on("disconnect", () => setIsConnected(false));

    return () => {
      SocketService.disconnect();
    };
  }, []);

  return { socket, isConnected };
};