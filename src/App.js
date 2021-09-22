import "./App.css";
import { useState, useEffect} from "react";
import Searchbox from "./components/Searchbox";
import Image from "./components/Image";
import Spinner from "./components/Spinner";

function App() {
  const [placeholder, setPlaceholder] = useState("type a word");
  const [searchWord, setSearchWord] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoaded, setImageLoaded]= useState(false);

useEffect(()=> setImageUrl("https://loremflickr.com/320/240/" + searchWord + "?random=" + Math.floor(Math.random() * 10) + 1), [searchWord])
// useEffect(()=> showLoadingMessage(imageLoaded), [imageLoaded])





// function showLoadingMessage(imageLoaded) {if (!imageLoaded) {setImageUrl("./loading.gif")}}

  return (
    <>
      <Searchbox
        setSearchWord={setSearchWord}
        setPlaceholder={setPlaceholder}
        placeholder={placeholder}
        setImageLoaded ={setImageLoaded}
      />
      {searchWord ? <Image imageUrl = {imageUrl} onLoad = {()=>{setImageLoaded(true); setPlaceholder("type a word")}}/> : ""}
      {imageLoaded ? "" : <Spinner />}
    </>
  );
}

export default App;
