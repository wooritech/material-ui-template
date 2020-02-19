import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { ComponentBaseProps } from './types';

// 행에 대한 정의
interface Row {
  username: string;
  email: string;
}

// 테이블 상태 정의
interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

interface SystemSettingsAdminListProps extends ComponentBaseProps {}

const createData = (username: string, email: string) => {
  return { username, email };
};

const SystemSettingsAdminList: React.FC<SystemSettingsAdminListProps> = () => {
  const rows = [
    createData('onlydel', 'onlydel@wooritech.com'),
    createData('call-of-duty', 'cod@wooritech.com'),
  ];

  // 테이블 상태 적용
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: '사용자 아이디', field: 'username' },
      { title: '이메일 주소', field: 'email' },
    ],
    data: rows,
  });

  return (
    <MaterialTable
      title=""
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
};

export default SystemSettingsAdminList;
