import { Machine } from '../../../types';
import MachineStatusTag from '../../MachineStatusTag';
import { formatDate } from '../../../utils/date';

type Props = {
  machine: Machine;
  onEventDetailBtnClick?: (machine: Machine) => void;
};

export default function MachineInfoTable({
  machine,
  onEventDetailBtnClick,
}: Props) {
  return (
    <table style={{ padding: 12, width: '100%' }}>
      <tbody>
        <tr>
          <td>Status</td>
          <td>
            <MachineStatusTag status={machine.status} />
          </td>
        </tr>
        <tr>
          <td>Install Date</td>
          <td>{machine.install_date}</td>
        </tr>
        <tr>
          <td>Last Maintenance</td>
          <td>{formatDate(machine.last_maintenance)}</td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button
              onClick={e => {
                e.preventDefault();
                onEventDetailBtnClick?.(machine);
              }}
            >
              Event Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
