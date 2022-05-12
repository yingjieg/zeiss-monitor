import Modal, { ModalProps } from '../../../components/Modal';
import { useEffect, useState } from 'react';

import { getMachineWithEvents } from '../../../services';
import { MachineEvent } from '../../../types';
import MachineStatusTag from '../../../components/MachineStatusTag';
import { formatDate } from '../../../utils/date';

type Props = {
  machineId?: string;
} & ModalProps;

function EventDetailModal({ machineId, visible, ...rest }: Props) {
  const [events, setEvents] = useState<MachineEvent[]>([]);

  useEffect(() => {
    // TODO fetch event list
    if (!machineId || !visible) {
      return;
    }

    getMachineWithEvents(machineId).then(resp => {
      setEvents(resp.data.data.events);
    });
  }, [machineId]);

  return (
    <Modal visible={visible} {...rest}>
      <ul
        style={{
          listStyle: 'none',
          overflowY: 'scroll',
          paddingTop: 24,
          height: 260,
        }}
      >
        {events.map(evt => (
          <li
            key={evt.timestamp}
            style={{
              padding: 6,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ display: 'inline-block', width: 100 }}>
              <MachineStatusTag status={evt.status} />
            </span>

            <span>{formatDate(evt.timestamp, 'YYYY-MM-DD hh:mm:ss')}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}

export default EventDetailModal;
