const Image = ({ imageUrl, onLoad, caption }) => {
  return <figure><img src={imageUrl} alt={caption} onLoad={onLoad} id="image"/><figcaption>A typical {caption} going about its business</figcaption></figure>;
}
export default Image;
