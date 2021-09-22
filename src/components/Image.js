const Image = ({ imageUrl, onLoad }) => {
  return <img src= {imageUrl} alt="the thing you looked up" onLoad = {onLoad} />
}
export default Image;
