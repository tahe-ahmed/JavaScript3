const url = "https://www.randomuser.me/api";
function getUserxhr() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.onload = function () {
        if (xhr.status < 400) {
            let userData = xhr.response;
            console.log(userData);
        } else {
            console.log("HTTP Error", xhr.status);
        }
    }
    xhr.onerror = function () {
        console.log("Something wrong!");
    };
  
    xhr.open("GET", url);
    xhr.send();
}
function getUserAxios(){
    axios.get(url)
  .then(function (response) {
    // log the dara received
    console.log(response.data);
  })
  .catch(function (error) {
    // log the error
    console.log(error);
  });
}
window.onload = function(){
    // getUserxhr();
    getUserAxios();
}
