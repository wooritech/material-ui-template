/* eslint-disable global-require */
import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const data = [
  {
    KorName: '박영호',
    SexLabel: '남',
    Age: '71',
    Phone: '(025)6563-2802',
    StartDate: '2018-02-25',
    EndDate: '2021-08-12',
  },
  {
    KorName: '조일형',
    SexLabel: '남',
    Age: '62',
    Phone: '(093)8809-8696',
    StartDate: '2019-10-21',
    EndDate: '2022-12-11',
  },
  {
    KorName: '김덕중',
    SexLabel: '여',
    Age: '53',
    Phone: '(064)5483-6874',
    StartDate: '2018-12-30',
    EndDate: '2022-01-16',
  },
];

const fields = [
  {
    fieldName: 'KorName',
    dataType: 'text',
  },
  {
    fieldName: 'SexLabel',
    dataType: 'text',
  },
  {
    fieldName: 'Age',
    dataType: 'number',
  },
  {
    fieldName: 'Phone',
    dataType: 'text',
  },
  {
    fieldName: 'StartDate',
    dataType: 'datetime',
    datetimeFormat: 'yyyy-MM-dd',
    amText: '오전',
    pmText: '오후',
  },
  {
    fieldName: 'EndDate',
    dataType: 'datetime',
    datetimeFormat: 'yyyy-MM-dd',
    amText: '오전',
    pmText: '오후',
  },
];

const columns = [
  {
    name: 'KorName',
    fieldName: 'KorName',
    type: 'data',
    width: '60',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: '이름',
    },
    renderer: {
      type: 'text',
    },
  },
  {
    name: 'SexLabel',
    fieldName: 'SexLabel',
    type: 'data',
    width: '40',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: '성별',
    },
    renderer: {
      type: 'text',
    },
  },
  {
    name: 'Age',
    fieldName: 'Age',
    type: 'data',
    width: '40',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: '나이',
    },
    renderer: {
      type: 'text',
    },
  },

  {
    name: 'StartDate',
    fieldName: 'StartDate',
    type: 'data',
    width: '100',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: '최초납입일',
      showTooltip: true,
      tooltip: '납입일의 툴팁입니다.',
    },
  },
  {
    name: 'EndDate',
    fieldName: 'EndDate',
    type: 'data',
    width: '100',
    styles: {
      textAlignment: 'center',
    },
    header: {
      text: '종료일',
    },
  },
];

const RealGridSamplePage = () => {
  const realgridRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    // if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RealGrid = require('realgrid');

    // const container = document.createElement('');
    // realgridRef.current?.appendChild(con);

    // container.id = 'realgrid';
    const ds = new RealGrid.LocalDataProvider(false);
    const grid = new RealGrid.GridView(realgridRef.current);
    ds.setFields(fields);

    grid.displayOptions.emptyMessage = '데이터가 없어요.';
    grid.header.height = 40;
    grid.displayOptions.rowHeight = 36;
    grid.footer.height = 40;
    grid.stateBar.width = 10;

    grid.setDataSource(ds);
    grid.setColumns(columns);

    ds.setRows(data);

    grid.editOptions.insertable = true;
    grid.editOptions.appendable = true;
    // }
  }, []);

  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<{}>, v: any) => {
    setValue(v);
  };

  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="필드" />
          <Tab label="컬럼" />
          <Tab label="데이터" />
        </Tabs>
      </Paper>

      <div style={{ width: '500px', height: '500px' }} ref={realgridRef} className="App" />
    </>
  );
};

export default RealGridSamplePage;
