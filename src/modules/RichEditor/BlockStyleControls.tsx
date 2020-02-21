import { makeStyles, Theme } from '@material-ui/core/styles';
import ToolButton from './ToolButton';
import { EditorControlsProps } from './types';

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginTop: theme.spacing(0),
  },
}));

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onToggle } = props;
  const classes = useStyles();

  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className={classes.controls}>
      {BLOCK_TYPES.map((type) => (
        <ToolButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
