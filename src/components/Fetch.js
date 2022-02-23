//parametern callback kan vara vilken funktion som helst som man vill köra med datan

function Fetch(url, callback, setError) {
   fetch(url)
   .then(handleErrors)
   .then(response => response.json())
   .then(data => {
       callback(data);
   })
   .catch ((error) => {console.log("Nääjj, dä blev fel på wikipedia! ", error); setError(true)});
}

export default Fetch;

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}