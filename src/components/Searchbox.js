import { useState } from "react";

const Searchbox = ({
  setSearchWord,
  setImageUrl,
  setImageLoaded,
  setArticleHeadline,
  setArticleText,
  error,
  imageLoaded
}) => {
  const [inputText, setInputText] = useState([]);

  const search = (evt) => {
    evt.preventDefault();
    setArticleHeadline(""); //för att den förra artikelns rubrik ej ska stå kvar under sökning
    setArticleText(null);
    // searchWord är en array med ett värde, om jag har en sträng omrenderas ej komponenterna om man söker på samma ord
    setSearchWord([inputText]);
    setInputText("");
    setImageUrl(null);
    setImageLoaded(false); //den här gör så att det blir en spinner på bilden
  };

  return (
    <form onSubmit={search}>
      <label htmlFor="searchword">Type a word</label>
      <input
        type="text"
        min-width="20px"
        maxLength="20"
        placeholder={(imageLoaded || error)? "": "searching..."}
        id="searchword"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button type="submit">look it up</button>
    </form>
  );
};

export default Searchbox;
