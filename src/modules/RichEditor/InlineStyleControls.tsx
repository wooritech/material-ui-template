import { makeStyles, Theme } from '@material-ui/core/styles';
import ToolButton from './ToolButton';
import { EditorControlsProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginTop: theme.spacing(0),
  },
}));

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onToggle } = props;
  const classes = useStyles();
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className={classes.controls}>
      {INLINE_STYLES.map((type) => (
        <ToolButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
