
function getImgXHR(xkcdUrl, imageElement) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.onload = function () {
        if (xhr.status < 400) {
            // img.setAttribute("src", "userData.month");
            imageElement.src = xhr.response.img;
            console.log(xhr.response);
        } else {
            console.log("HTTP Error", xhr.status);
        }
    }
    xhr.onerror = function () {
        console.log("Something wrong!");
    };
  
    xhr.open("GET", xkcdUrl);
    xhr.send();
}
function getImgAxios(xkcdUrl, imageElement){
    axios.get(xkcdUrl)
  .then(function (response) {
    // log the dara received
    console.log(response.data);
    // console.log(response.data.img);
    imageElement.src = response.data.img;
  })
  .catch(function (error) {
    // log the error
    console.log(error);
  });
}
window.onload = function(){
    const url = "https://xkcd.now.sh/?comic=latest";
    const imageElement = document.getElementById("image");
    getImgXHR(xkcdUrl, imageElement);
    getImgAxios(xkcdUrl, imageElement);
}



