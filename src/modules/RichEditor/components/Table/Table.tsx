/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DraftBlockComponentProps } from '../types';
import RichTable from './RichTable';

/** Table */
const Table: React.FC<DraftBlockComponentProps> = (props) => {
  const { contentState, block, blockProps } = props;

  // entity를 이용할 경우...
  // const entity = contentState.getEntity(block.getEntityAt(0));
  // console.log('render table:', block.getData().toJS());

  const blockData = block.getData().toJS();
  const [tableData, setTableData] = React.useState(blockData);

  return (
    <div className="public-DraftStyleDefault-ltr">
      <RichTable tableData={blockData} {...props} />
    </div>
  );
};

export default Table;
