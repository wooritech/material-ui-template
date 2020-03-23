import { makeStyles } from '@material-ui/core/styles';
import { CardMedia } from '@material-ui/core';

const defaultSize = {
  width: '300px',
  height: '300px',
};

const useStyles = makeStyles(() => ({
  img: {
    width: defaultSize.width,
    height: defaultSize.height,
  },
}));

interface ImageMediaProps {
  src: string;
  image: string;
}

const ImageMedia: React.FC<ImageMediaProps> = (props) => {
  const { src, image } = props;
  const classes = useStyles();
  return <CardMedia className={classes.img} src={src} image={image} />;
};

export default ImageMedia;
