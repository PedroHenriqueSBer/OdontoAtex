import useReactWebSocket from "react-use-websocket";
import { useOnlineStatus } from "../";

interface Props<T> {
  url: string;
  params?: { [key: string]: string };
  onMessage?: (message: T) => void;
  onOpen?: (event: Event) => void;
  onError?: (event: Event) => void;
  token?: string;
}

export const useWebSocket = <T>({
  url,
  params,
  onMessage,
  onOpen,
  onError,
}: Props<T>) => {
  const isOnline = useOnlineStatus();

  const { lastMessage, sendMessage } = useReactWebSocket(
    !isOnline || url.includes("undefined")
      ? null
      : `wss://${process.env.REACT_APP_API_BASE_URL?.split("//")[1].replace(
          "/api/",
          ""
        )}/${url}`,
    {
      onOpen,
      onError,
      onMessage: ({ data }) => onMessage?.(JSON.parse(data) as T),
      queryParams: { ...(params || {}) },
      reconnectAttempts: 1000,
      shouldReconnect: () => isOnline,
    }
  );

  return { lastMessage, sendMessage };
};
