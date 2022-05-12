import { MachineStatus } from '../types';
import { useEffect, useState } from 'react';

type Props = {
  status: MachineStatus;
};

const ColorMap = {
  [MachineStatus.IDLE]: '#FDB314',
  [MachineStatus.RUNNING]: '#3366FF',
  [MachineStatus.FINISHED]: '#52C41A',
  [MachineStatus.ERRORED]: '#F56C6C',
  [MachineStatus.REPAIRED]: '#7A869A',
};

export default function MachineStatusTag({ status }: Props) {
  const [displayStatus, setDisplayStatus] = useState(status);

  useEffect(() => {
    if (status === MachineStatus.REPAIRED) {
      setTimeout(() => {
        setDisplayStatus(MachineStatus.IDLE);
      }, 1000);
    }
  }, [status]);

  return (
    <span style={{ display: 'flex' }}>
      <i
        style={{
          margin: 2,
          borderRadius: '50%',
          width: 12,
          height: 12,
          display: 'inline-block',
          backgroundColor: ColorMap[status],
        }}
      />
      <span style={{ display: 'inline-block', lineHeight: '16px' }}>
        {displayStatus}
      </span>
    </span>
  );
}
