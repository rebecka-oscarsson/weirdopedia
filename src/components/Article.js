const Article = ({ articleText, articleHeadline }) => {
  // let searchWord="";
  // if(articleHeadline){searchWord=articleHeadline.toLowerCase()}
  return <article><h2>Let me tell you about the {articleHeadline}:</h2>{articleText}</article>
}
export default Article;
