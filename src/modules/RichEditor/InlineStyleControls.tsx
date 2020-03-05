import { RichUtils } from 'draft-js';
import ToolButton from './ToolButton';
import { EditorControlsProps } from './types';

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD', icon: 'format_bold' },
  { label: 'Italic', style: 'ITALIC', icon: 'format_italic' },
  { label: 'Underline', style: 'UNDERLINE', icon: 'format_underline' },
  { label: 'Monospace', style: 'CODE', icon: 'code' },
];

const InlineStyleControls: React.FC<EditorControlsProps> = (props) => {
  const { editorState, onChange } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  const toggleBlockType = (blockType: string) => {
    if (onChange) onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  return (
    <div>
      {INLINE_STYLES.map((type) => (
        <ToolButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={toggleBlockType}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

export default InlineStyleControls;
