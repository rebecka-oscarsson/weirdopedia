const Image = ({
  imageUrl,
  setImageLoaded,
  imageLoaded,
  articleHeadline,
  error
}) => {

  const articleSubjects = articleHeadline.toLowerCase()+"s";
  const imageCaptions = [`Some prime specimens of ${articleSubjects}`, `A couple of particularly nasty looking ${articleSubjects}`, `Some typical ${articleSubjects} going about their business`]

  const imageCaption = imageCaptions[Math.floor(Math.random()*imageCaptions.length)];

  
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
        alt={articleHeadline}
        onLoad={() => setImageLoaded(true)}
      />
      <figcaption>{imageLoaded? imageCaption : null}</figcaption>
    </figure>
  )
  )
};

export default Image;
