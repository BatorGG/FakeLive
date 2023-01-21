var btn = document.getElementById("controls");

var video = document.getElementById("videoElement");

var camera = "user";

btn.addEventListener("click", () => {

    if (camera == "user"){
        camera = "environment";
    }
    else {
        camera = "user";
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

