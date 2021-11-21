import { useState } from "react";

const Searchbox = ({ setSearchWord , setPlaceholder , placeholder, setImageLoaded, setArticleHeadline, setArticleText }) => {

  const [inputText, setInputText] = useState("");

  const search = (evt) => {
    evt.preventDefault();
    setArticleHeadline(""); //för att den förra artikelns rubrik ej ska stå kvar under sökning
    setArticleText("");
    setSearchWord(inputText);
    setInputText("");
    setPlaceholder("searching...");
    setImageLoaded(false); //den här gör så att det blir en spinner på bilden
  };

  return (
    <form onSubmit={search}>
      <label htmlFor="searchword">Please AI tell me about the:</label>
      <input type="text" maxLength="20" placeholder={placeholder} id="searchword" value={inputText} onChange={e => setInputText(e.target.value)} />
      <button type="submit">?</button>
    </form>
  );
};

export default Searchbox;
