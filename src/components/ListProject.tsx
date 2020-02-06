import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { ComponentBaseProps } from './types';

// 행에 대한 정의
interface Row {
  projectId: string;
  projectName: string;
  projectDescription: string;
  latestVersion: string;
  projectOwner: string;
  constructorCount: number;
}

// 테이블 상태 정의
interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

interface ListProjectProps extends ComponentBaseProps {}

const createData = (
  projectId: string,
  projectName: string,
  projectDescription: string,
  latestVersion: string,
  projectOwner: string,
  constructorCount: number,
) => {
  return {
    projectId,
    projectName,
    projectDescription,
    latestVersion,
    projectOwner,
    constructorCount,
  };
};

const ListProject: React.FC<ListProjectProps> = () => {
  const rows = [
    createData('ABCDEFG', 'realgrid docs v2', '', '2.0.1', '홍길동', 5),
    createData('GHFGDFG', '아이랩 도움말 v3', '', '3.0.1', '홍길동', 5),
  ];

  // 테이블 상태 적용
  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: '프로젝트 ID', field: 'projectId' },
      { title: '프로젝트 명', field: 'projectName' },
      { title: '프로젝트 설명', field: 'projectDescription' },
      { title: '최신 문서 버전', field: 'latestVersion' },
      { title: '소유자', field: 'projectOwner' },
      { title: '참여자 수', field: 'constructorCount', type: 'numeric' },
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

export default ListProject;
