import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DraftBlockComponentProps } from '../types';
import RichTable from './RichTable';

/** Table */
const Table: React.FC<DraftBlockComponentProps> = (props) => {
  const { contentState, block } = props;

  // entity를 이용할 경우...
  // const entity = contentState.getEntity(block.getEntityAt(0));
  // console.log(block.getData().toJS(), entityKey, entity.getData());

  const blockData = block.getData().toJS();
  const [tableData, setTableData] = React.useState(blockData);

  return (
    <div className="public-DraftStyleDefault-ltr">
      <RichTable tableData={tableData} />
    </div>
  );
};

export default Table;
