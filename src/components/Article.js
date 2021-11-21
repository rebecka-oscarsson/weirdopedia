const Article = ({ articleText, articleHeadline }) => {
  return <article><h2>Let me tell you about the {articleHeadline}:</h2>{articleText}</article>
}
export default Article;
