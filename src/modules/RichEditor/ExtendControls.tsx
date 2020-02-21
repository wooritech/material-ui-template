import { makeStyles, Theme } from '@material-ui/core/styles';
import StyleButton from './StyleButton';
import { StyleControlsProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginTop: theme.spacing(0),
  },
}));

const EXTEND_CONTROLS = [{ label: 'Image', style: 'image' }];

const ExtendControls: React.FC<StyleControlsProps> = (props) => {
  const { editorState, onToggle } = props;
  const classes = useStyles();
  // const current = editorState.getCurrentContent();

  return (
    <div className={classes.controls}>
      {EXTEND_CONTROLS.map((type) => (
        <StyleButton
          key={type.label}
          active={false}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default ExtendControls;
