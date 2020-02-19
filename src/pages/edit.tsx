import { NextPage } from 'next';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import RichEditor from '~/modules/components/RichEditor';
import EditLayout from '~/layouts/EditLayout';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      background: '#fff',
      overflow: 'hidden',
      boxShadow: '0px 0px 5px 3px #ddd',
      borderRadius: '5px',
    },
  }),
);
const EditPage: NextPage = () => {
  const classes = useStyles();
  return (
    <EditLayout pageTitle="">
      <div className={classes.root}>
        <RichEditor />
      </div>
    </EditLayout>
  );
};

export default EditPage;
