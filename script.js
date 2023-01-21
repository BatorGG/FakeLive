var btn = document.getElementById("controls");

var video = document.getElementById("videoElement");

var camera = "environment";

function getDevices() {
    return navigator.mediaDevices.enumerateDevices();
}

btn.addEventListener("click", () => {

    console.log(hasFrontBack());

    if (camera == "environment"){
        camera = "user";
    }
    else {
        camera = "environment";
    }

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video: {
                facingMode: {
                    ideal: camera
                }
            } 
        })
          .then(function (stream) {
            video.srcObject = stream;
            /*getDevices().then(function (result) {
                console.log(result);
            });*/
          })
          .catch(function (error) {
            console.log("Something went wrong!\n" + error);
          });
      }

});
