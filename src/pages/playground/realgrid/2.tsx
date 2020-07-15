/* eslint-disable global-require */
import * as React from 'react';

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
  let grid: any;
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RealGrid = require('realgrid');
    const ds = new RealGrid.LocalDataProvider(false);
    grid = new RealGrid.GridView(realgridRef.current);
    ds.setFields(fields);

    grid.displayOptions.emptyMessage = '데이터가 없어요.';
    grid.header.height = 40;
    grid.displayOptions.rowHeight = 36;
    grid.footer.height = 40;
    grid.stateBar.width = 10;

    grid.setDataSource(ds);
    grid.setColumns(columns);

    ds.setRows(data);

    grid.editOptions.insertable = false;
    grid.editOptions.appendable = false;

    // }
  }, []);

  // console.log(grid?.container);
  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<{}>, v: any) => {
    setValue(v);
  };

  const handleFocus = (e: React.FocusEvent) => {
    console.log(e.type, e.currentTarget);
  };

  return (
    <>
      {/* <div
        style={{ width: '500px', height: '500px' }}
        tabIndex={0}
        onFocus={handleFocus}
        onBlur={handleFocus}
      > */}
      <div
        id="grid"
        tabIndex={1}
        onFocus={handleFocus}
        onBlur={handleFocus}
        style={{ width: '500px', height: '500px' }}
        ref={realgridRef}
        className="App"
      />
      {/* </div> */}
    </>
  );
};

export default RealGridSamplePage;
