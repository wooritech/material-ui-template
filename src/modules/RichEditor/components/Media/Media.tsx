/* eslint-disable react/jsx-props-no-spreading */
import ImageMedia from './ImageMedia';
import { DraftBlockComponentProps } from './types';

/** Media */
const Media: React.FC<DraftBlockComponentProps> = (props) => {
  // console.log(props.selection.getAnchorKey());
  const { contentState, block } = props;

  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, name, size } = entity.getData();
  const type = entity.getType();

  return (
    <div className="public-DraftStyleDefault-ltr">
      {type === 'image' ? <ImageMedia src={src} name={name} size={size} {...props} /> : null}
    </div>
  );
};

export default Media;
