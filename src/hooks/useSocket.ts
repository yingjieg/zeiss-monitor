import { useEffect, useRef } from 'react';
import { MachineStatus } from '../types';

export type MsgPayload = {
  timestamp: string;
  status: MachineStatus;
  machine_id: string;
  id: string;
};

function useSocket() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new WebSocket('ws://codingcase.zeiss.services/ws');
    }

    // TODO error handling

    // TODO handle reconnect

    return () => {
      // TODO cleanup
    };
  }, []);

  return {
    socket: socketRef.current,
  };
}

export default useSocket;
