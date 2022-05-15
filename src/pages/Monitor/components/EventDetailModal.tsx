import Modal, { ModalProps } from '../../../components/Modal';
import { useEffect, useState } from 'react';

import { getMachineWithEvents } from '../../../services';
import { MachineEvent } from '../../../types';
import MachineStatusTag from '../../../components/MachineStatusTag';
import { formatDate } from '../../../utils/date';
import Spinner from '../../../components/Spinner';

type Props = {
  machineId?: string;
} & ModalProps;

function EventDetailModal({ machineId, visible, ...rest }: Props) {
  const [events, setEvents] = useState<MachineEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO fetch event list
    if (!machineId || !visible) {
      return;
    }

    setLoading(true);
    getMachineWithEvents(machineId)
      .then(resp => {
        setEvents(resp.data.data.events);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setEvents([]);
    };
  }, [machineId]);

  return (
    <Modal visible={visible} {...rest}>
      <>
        <Spinner loading={loading} />
        <ul
          style={{
            listStyle: 'none',
            overflowY: 'scroll',
            padding: 12,
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
      </>
    </Modal>
  );
}

export default EventDetailModal;
