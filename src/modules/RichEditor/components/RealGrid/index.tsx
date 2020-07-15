/* eslint-disable global-require */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { LocalDataProvider, GridView } from 'realgrid';
import Button from '@material-ui/core/Button';
import { BlockComponentProps } from '../types';

const useStyles = makeStyles(() => ({
  root: {
    outline: 'none',
    width: '100%',
    height: '220px',
    border: '0.12rem dashed #a0a0a0',
  },
  grid: {
    width: '100%',
    height: '100%',
  },
  toolbar: {
    marginTop: '8px',
    height: '30px',
    backgroundColor: '#fff',
  },
  focused: {
    backgroundColor: '#eee',
  },
}));

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

const RichRealGrid: React.FC<BlockComponentProps> = (props) => {
  const classes = useStyles();
  const { block, blockProps } = props;
  const [focused, setFocused] = React.useState('blur');

  const realgridRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    // if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const RealGridClass = require('realgrid');

    // const container = document.createElement('');
    // realgridRef.current?.appendChild(con);

    // container.id = 'realgrid';
    const ds: LocalDataProvider = new RealGridClass.LocalDataProvider(false);
    const grid: GridView = new RealGridClass.GridView(realgridRef.current);
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
    // tabindex를 제거하면 해당 이슈 해결
    // https://github.com/realgrid/realgriddom/issues/1100
    console.log((realgridRef.current?.firstChild as HTMLDivElement).removeAttribute('tabIndex'));

    // grid.container.disabled = true;
    // }
  }, []);

  const handleFocused = (e: React.FocusEvent) => {
    console.log(e.currentTarget, e.type);
    const fType = e.type;
    if (focused !== fType) setFocused(fType);
    /** 포커스로 하는게 아니라 block type을 가지고 해야 겠다. */
    // if (fType === 'blur') blockProps.onRichCommand('change-ext-mode', undefined);
    if (fType === 'focus') blockProps.onRichCommand('select-block', { block });
  };

  // const handleShowExt = () => {
  //   blockProps.onRichCommand('change-ext-mode', { mode: 'realgrid' });
  //   // blockProps.onRichCommand('select-block', block);
  // };

  // const handleRemoveClick = () => {
  //   blockProps.onRichCommand('remove-realgrid', { block });
  // };

  return (
    <div
      className={`public-DraftStyleDefault-ltr ${classes.root} ${
        focused === 'focus' ? classes.focused : ''
      }`}
    >
      <div
        onFocus={handleFocused}
        onBlur={handleFocused}
        tabIndex={0}
        ref={realgridRef}
        className={classes.grid}
        contentEditable={false}
      />
      {/* {focused === 'focus' ? (
        <div className={classes.toolbar}>
          <Button onClick={handleShowExt}>RealGrid</Button>
          <Button onClick={handleRemoveClick}>Remove Grid</Button>{' '}
        </div>
      ) : null} */}
    </div>
  );
};

export default RichRealGrid;
