/* eslint-disable react/jsx-props-no-spreading */
import { Card } from '@material-ui/core';
import ImageMedia from './ImageMedia';
import { DraftBlockComponentProps } from './types';

/** Media */
const Media: React.FC<DraftBlockComponentProps> = (props) => {
  const { contentState, block } = props;

  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  return (
    <Card variant="outlined">
      {type === 'image' ? <ImageMedia src={src} image={src} {...props} /> : null}
    </Card>
  );
};

export default Media;
