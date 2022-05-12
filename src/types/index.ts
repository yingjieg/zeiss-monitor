export type BaseResponse<T> = {
  data: T;
};

export enum MachineStatus {
  IDLE = 'idle',
  RUNNING = 'running',
  FINISHED = 'finished',
  ERRORED = 'errored',
  REPAIRED = 'repaired',
}

export type Machine = {
  id: string;
  status: MachineStatus;
  machine_type: 'microscope' | 'measurement';
  longitude: number;
  latitude: number;
  last_maintenance: string;
  install_date: string;
  floor: number;
};

export type MachineEvent = {
  timestamp: string;
  status: MachineStatus;
};

export type MachineWithEvents = Machine & { events: MachineEvent[] };
