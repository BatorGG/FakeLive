var btn = document.getElementById("controls");

var video = document.getElementById("videoElement");

var camera = "front";

var devices = navigator.mediaDevices.enumerateDevices();

btn.addEventListener("click", () => {

    console.log(devices);

    if (camera == "front"){
        camera = "back";
    }
    else {
        camera = "front";
    }

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ 
            video: {
                facingMode: {
                    exact: camera
                }
            } 
        })
          .then(function (stream) {
            video.srcObject = stream;
          })
          .catch(function (error) {
            console.log("Something went wrong!\n" + error);
          });
      }

});

