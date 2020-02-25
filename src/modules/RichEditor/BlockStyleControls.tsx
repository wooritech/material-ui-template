import { makeStyles, Theme } from '@material-ui/core/styles';
import { RichUtils } from 'draft-js';
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
  { label: 'Blockquote', style: 'blockquote', icon: 'format_quote' },
  { label: 'UL', style: 'unordered-list-item', icon: 'format_list_bulleted' },
  { label: 'OL', style: 'ordered-list-item', icon: 'format_list_numbered' },
  { label: 'Code Block', style: 'code-block', icon: 'code' },
];

const BlockStyleControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange } = props;
  const classes = useStyles();

  const selection = editorState.getSelection();
  const isBlockType = (style: string): boolean => {
    return (
      editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType() === style
    );
  };

  const toggleBlockType = (blockType: string) => {
    if (onChange) onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div className={classes.controls}>
      {BLOCK_TYPES.map((type) => (
        <ToolButton
          key={type.label}
          active={isBlockType(type.style)}
          label={type.label}
          onToggle={toggleBlockType}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

export default BlockStyleControls;
