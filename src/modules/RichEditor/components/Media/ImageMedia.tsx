interface ImageMediaProps {
  src: string;
  name: string;
  size: number;
}

const ImageMedia: React.FC<ImageMediaProps> = (props) => {
  const { src, name } = props;
  return <img src={src} alt={name} />;
};

export default ImageMedia;
