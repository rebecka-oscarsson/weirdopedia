function Fetch(url, callback) {

   fetch(url)
   .then(response => response.json())
   .then(data => {
       callback(data);
   }) 

}

export default Fetch;