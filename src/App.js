import "./App.css";
import { useState, useEffect } from "react";
import Searchbox from "./components/Searchbox";
import Image from "./components/Image";
import Spinner from "./components/Spinner";
import Fetch from "./components/Fetch";
import Article from "./components/Article";
import Footer from "./components/Footer";

//hämtar variabel från env-filen
require("dotenv").config();
const deepAiKey = process.env.REACT_APP_API_KEY_DEEPAI;

function App() {
  const [searchWord, setSearchWord] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(true);
  const [articleText, setArticleText] = useState("");
  const [articleHeadline, setArticleHeadline] = useState(""); //kommer från wikipedia, om det blir redirect är den ej samma som searchword
  const [error, setError] = useState(false);

  //npm-paket för att deepai ska funka
  const deepai = require("deepai");
  deepai.setApiKey(deepAiKey);

  //körs när articleheadline ändras, det gör den när wikipedia-api:et har hämtats klar
  //det är bra så bilden ej hämtas om artikeln ej gör det, samt för rätt bildtext
  useEffect(() => {
    fetchImage();
  }, [articleHeadline]);

  useEffect(() => {
    if (searchWord.length !== 0) {
      setError(false);
      Fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
          searchWord +
          "?origin=*",
        //origin här är för att det inte ska bli cors-error
        (data) => {
          console.log("wikipedia: ", data.extract);
          askAI(data.extract);
          setArticleHeadline(data.title);
        },
        setError
      );
    }
  }, [searchWord]);

  //hämtningar från deepAI

  //det här är ett api som gör en bild från mitt sökord
  async function fetchImage() {
    if (articleHeadline) {
      let resp = await deepai.callStandardApi("text2img", {
        text: articleHeadline,
      });
      setImageUrl(resp.output_url);
    }
  }

  //det här är api:et som hittar på mer text utifrån en inskickad
  async function askAI(wikiText) {
    try {
      let resp = await deepai.callStandardApi("text-generator", {
        text: wikiText,
      });
      //tar bort wikipedia från början av texten för den returnerar bägge ihopklistrade
      const article = resp.output.substr(
        wikiText.length,
        wikiText.length + resp.output.length
      );
      setArticleText(article);
    } catch (err) {
      console.log("Attans, fel på AI:n! ", err);
      setError(true);
    }
  }

  return (
    <>
      <Searchbox
        setSearchWord={setSearchWord}
        setImageUrl={setImageUrl}
        setImageLoaded={setImageLoaded}
        setArticleHeadline={setArticleHeadline}
        articleText={articleText}
        setArticleText={setArticleText}
        error={error}
        imageLoaded={imageLoaded}
      />
      {(imageUrl || error) ? (
        <Image
          imageUrl={imageUrl}
          setImageLoaded={setImageLoaded}
          imageLoaded={imageLoaded}
          articleHeadline={articleHeadline}
          error={error}
        />
      ) : null}
      {(!imageLoaded && searchWord.length && !error) ? <Spinner /> : null}

      <Article
        articleText={articleText}
        articleHeadline={articleHeadline}
        error={error}
        searchWord={searchWord}
      />
      <Footer />
    </>
  );
}

export default App;
