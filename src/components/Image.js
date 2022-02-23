const Image = ({
  imageUrl,
  setImageLoaded,
  imageLoaded,
  caption,
  error
}) => {
  // let counter = 0;
  // const imageText

  let imageText = "A typical " + caption + " going about its business"
  
  return (error ? (
    <figure>
      <img
        src="the-holler.svg"
        alt="cartoonish drawing of a screaming person"
        className="errorImage"
      />
    </figure>
  ) : (
    <figure>
      <img
        src={imageUrl}
        alt={caption}
        onLoad={() => setImageLoaded(true)}
      />
      <figcaption>{imageLoaded? imageText : null}</figcaption>
    </figure>
  )
  )
};

export default Image;
