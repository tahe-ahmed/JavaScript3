const url = 'https://dog.ceo/api/breeds/image/random';

function addImg(imgSource) {
    const ul = document.getElementById("imgList");
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = imgSource;
    li.appendChild(img);
    ul.appendChild(li);
}
function getDataXML() {
    const xhr = new XMLHttpRequest();
    xhr.onload = function(){ 
        if (xhr.status < 400) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
            addImg(response.message);
        } else {
            // handling response error
            console.log(`Error: ${xhr.status}`);
            }
        };

    xhr.onerror = function(){
        //handling network error
        onsole.log('something went wrong');
    }
    xhr.open('GET', url);
    xhr.send();
}
function getDataAxios() {

    axios.get(url)
    .then(function (response) {
        // log the data received
        console.log(response.data);
        // add the img
        addImg(response.data.message);
        console.log(response.data.message);
    })
    .catch(function (error) {
        // log the error
        console.log(error);
    });
}

document.getElementById('buttonOne').addEventListener("click", getDataXML);
document.getElementById('buttonTwo').addEventListener("click", getDataAxios);

