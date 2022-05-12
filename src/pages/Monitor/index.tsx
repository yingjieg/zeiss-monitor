import { useState } from 'react';

import MachineList from '../../components/MachineList';
import useMachines from '../../hooks/useMachines';
import Spinner from '../../components/Spinner';
import EventDetailModal from './components/EventDetailModal';

export default function Monitor() {
  const { measurements, microscopes, loading } = useMachines();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMachineId, setSelectedMachineId] = useState<string>();

  return (
    <div>
      <h3>Measurements</h3>
      <Spinner loading={loading} />
      <MachineList
        machines={measurements}
        onEventDetailBtnClick={machine => {
          setModalVisible(true);
          setSelectedMachineId(machine.id);
        }}
      />
      <h3>Microscopes</h3>
      <MachineList
        machines={microscopes}
        onEventDetailBtnClick={machine => {
          setModalVisible(true);
          setSelectedMachineId(machine.id);
        }}
      />
      <EventDetailModal
        machineId={selectedMachineId}
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </div>
  );
}
