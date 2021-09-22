const Searchbox = ({ setSearchWord , setPlaceholder , placeholder, setImageLoaded }) => {
  // const [placeholderText, setPlaceholder] = useState("type a word");
  const search = (evt) => {
    evt.preventDefault();
    setSearchWord(document.querySelector("input").value);
    document.querySelector("input").value = "";
    setPlaceholder("searching...");
    setImageLoaded(false)
  };

  return (
    <form onSubmit={search}>
      <input type="text" maxLength="20" placeholder={placeholder}></input>
      <button type="submit">look it up</button>
    </form>
  );
};

export default Searchbox;
