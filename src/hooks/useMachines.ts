import { useEffect, useState } from 'react';

import { getMachines } from '../services';
import { Machine, MachineStatus } from '../types';
import useSocket, { MsgPayload } from './useSocket';

export type MachineState = Record<string, Record<string, Machine>>;

export default function useMachines() {
  const [measurements, setMeasurements] = useState<MachineState>({});
  const [microscopes, setMicroscopes] = useState<MachineState>({});
  const [loading, setLoading] = useState(false);

  const { socket } = useSocket();

  const handleMachineStatusUpdate = (
    machineId: string,
    status: MachineStatus,
  ) => {
    Object.entries(measurements).forEach(([floor, machines]) => {
      if (machineId in measurements[floor]) {
        setMeasurements({
          ...measurements,
          [floor]: {
            ...machines,
            [machineId]: {
              ...machines[machineId],
              status,
            },
          },
        });
      }
    });

    Object.entries(microscopes).forEach(([floor, machines]) => {
      if (machineId in microscopes[floor]) {
        setMicroscopes({
          ...microscopes,
          [floor]: {
            ...machines,
            [machineId]: {
              ...machines[machineId],
              status,
            },
          },
        });
      }
    });
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.onmessage = event => {
      const data = JSON.parse(event.data);
      const { machine_id, status } = data.payload as MsgPayload;
      handleMachineStatusUpdate(machine_id, status);
    };
  }, [socket, measurements, microscopes]);

  useEffect(() => {
    const _measurements: MachineState = {};
    const _microscopes: MachineState = {};
    setLoading(true);
    getMachines()
      .then(resp => {
        resp.data.data.forEach(machine => {
          if (machine.machine_type === 'measurement') {
            if (machine.floor in _measurements) {
              _measurements[machine.floor][machine.id] = machine;
            } else {
              _measurements[machine.floor] = {
                [machine.id]: machine,
              };
            }
          } else if (machine.machine_type === 'microscope') {
            if (machine.floor in _microscopes) {
              _microscopes[machine.floor][machine.id] = machine;
            } else {
              _microscopes[machine.floor] = {
                [machine.id]: machine,
              };
            }
          }
        });
        setMeasurements(_measurements);
        setMicroscopes(_microscopes);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    measurements,
    microscopes,
    loading,
    updateMachineStatus: handleMachineStatusUpdate,
  };
}
