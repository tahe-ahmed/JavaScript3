const url = "https://xkcd.now.sh/?comic=latest";
const img = document.getElementById("image");

function getImgXHR() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.onload = function () {
        if (xhr.status < 400) {
            // img.setAttribute("src", "userData.month");
            img.src = xhr.response.img;
            console.log(xhr.response);
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
function getImgAxios(){
    axios.get(url)
  .then(function (response) {
    // log the dara received
    console.log(response.data);
    // console.log(response.data.img);
    img.src = response.data.img;
  })
  .catch(function (error) {
    // log the error
    console.log(error);
  });
}
window.onload = function(){
    getImgXHR();
    getImgAxios();
}
