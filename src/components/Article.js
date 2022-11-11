import Spinner from "./Spinner";

const Article = ({ articleText, articleHeadline, error, searchWord }) => {
  if (error) {
    return (
      <article>
        <h2>Oh no!</h2>There was an error, please try again
      </article>
    );
  } else if (articleText) {
    return (
      <article>
        <h2>About the {articleHeadline}</h2>
        {articleText}
      </article>
    );
  } else if (searchWord.length)
    return (
      <article>
        <Spinner />
      </article>
    );
    return null //om ingen sökning gjorts
};

export default Article;
