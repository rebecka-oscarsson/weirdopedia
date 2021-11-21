//parametern callback kan vara vilken funktion som helst som man vill köra med datan

function Fetch(url, callback) {
   fetch(url)
   .then(response => response.json())
   .then(data => {
       callback(data);
   }) 
}

export default Fetch;