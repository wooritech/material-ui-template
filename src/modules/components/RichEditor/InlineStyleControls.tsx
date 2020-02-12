import StyleButton from './StyleButton';
import { StyleControlsProps } from './types';
import { controlStyles } from './styles';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls: React.FC<StyleControlsProps> = (props) => {
  const { editorState, onToggle } = props;
  const classes = controlStyles();
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className={classes.controls}>
      {INLINE_STYLES.map((type) => (
        <StyleButton
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
