import "./App.css";
import { useState, useEffect } from "react";
import Searchbox from "./components/Searchbox";
import Image from "./components/Image";
import Spinner from "./components/Spinner";
import Fetch from "./components/Fetch";
import Article from "./components/Article";
import Footer from "./components/Footer";

require('dotenv').config();
const deepaiKey = process.env.REACT_APP_API_KEY_DEEPAI;

function App() {
  const [placeholder, setPlaceholder] = useState("type a word");
  const [searchWord, setSearchWord] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoaded, setImageLoaded] = useState(true);
  const [wiki, setWiki] = useState("");
  const [articleText, setArticleText] = useState("");
  const [articleHeadline, setArticleHeadline] = useState("");

  const deepai = require("deepai");
  deepai.setApiKey(deepaiKey);

  useEffect(() => {async function fetchData() {if(articleHeadline){
    var resp = await deepai.callStandardApi("text2img", {
            text: articleHeadline,
    });
    setImageUrl(resp.output_url)}};
    fetchData();
}, [articleHeadline]);

  useEffect(() => {
    if (searchWord) {
      Fetch(
        "https://en.wikipedia.org/api/rest_v1/page/summary/" +
          searchWord +
          "?origin=*",
          //origin här är för att det inte ska bli cors-error
        (data) => {
          setWiki(data.extract);
          setArticleHeadline(data.displaytitle);
        }
      );
    }
  }, [searchWord]);

  useEffect(() => {
    if (wiki) {
      askAI(wiki);
    }
  }, [wiki]);

  // useEffect(() => {
  //   if (imageLoaded) {
  //     setCaption(getCaption());
  //   }
  // }, [imageLoaded]);

  // async function getCaption() {
  //   let resp = await deepai.callStandardApi("nsfw-detector", {
  //     image: document.getElementById("image"),
  //   });
  //   console.log(resp);
  //   return resp;
  // }
  // här behövs felhantering

  async function askAI(wikiText) {
    let resp = await deepai.callStandardApi("text-generator", {
      text: wikiText,
    });
    //tar bort wikipedia från början av texten
    const article = resp.output.substr(
      wikiText.length,
      wikiText.length + resp.output.length
    );
    console.log("wikipedia:", wikiText);
    setArticleText(article);
  }

  return (
    <>
      <Searchbox
        setSearchWord={setSearchWord}
        setPlaceholder={setPlaceholder}
        placeholder={placeholder}
        setImageLoaded={setImageLoaded}
      />
      {searchWord ? (
        <Image
          imageUrl={imageUrl}
          onLoad={() => {
            setImageLoaded(true);
            setPlaceholder("type a word");
          }}
            caption={articleHeadline}
        />
      ) : (
        ""
      )}
      {imageLoaded ? "" : <Spinner />}
      {searchWord ? (
        <Article articleText={articleText} articleHeadline={articleHeadline} />
      ) : (
        ""
      )}
      {/* tror jag ska göra articleLoaded istället och en switch för det ska bli spinner först när man sökt */}
      <Footer />
    </>
  );
}

export default App;
