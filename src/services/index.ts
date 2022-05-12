import request from '../utils/request';
import { BaseResponse, Machine, MachineWithEvents } from '../types';

export function getMachines() {
  return request.get<BaseResponse<Machine[]>>('/api/v1/machines');
}

export function getMachineWithEvents(machineId: string) {
  return request.get<BaseResponse<MachineWithEvents>>(
    `/api/v1/machines/${machineId}`,
  );
}
