import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useOnlineManager = () => {
  const [isConnected, setIsConnected] = useState(true);
  const netinfo = useNetInfo();

  useEffect(() => {
    setIsConnected(netinfo.isConnected);
  }, [netinfo]);

  return { isConnected };
};
