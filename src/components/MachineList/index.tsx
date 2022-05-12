import React, { CSSProperties, Fragment } from 'react';

import { MachineState } from '../../hooks/useMachines';
import MachineInfoTable from './components/MachineInfoTable';

import './MachineList.less';
import { Machine } from '../../types';

type Props = {
  style?: CSSProperties;
  machines: MachineState;
  onEventDetailBtnClick?: (machine: Machine) => void;
};

const MachineList: React.FC<Props> = ({
  machines,
  style,
  onEventDetailBtnClick,
}) => {
  return (
    <div style={style}>
      {Object.keys(machines).map(floor => (
        <Fragment key={floor}>
          <h4>Floor: {floor}</h4>
          <div className="machine-list-container">
            {Object.values(machines[floor]).map(machine => (
              <div key={machine.id} className="machine-list-item">
                <MachineInfoTable
                  machine={machine}
                  onEventDetailBtnClick={onEventDetailBtnClick}
                />
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default MachineList;
