var switchbtn = document.getElementById("switch");
var stopbtn = document.getElementById("stop");

var video = document.getElementById("videoElement");

var camera = "environment";

function getDevices() {
    return navigator.mediaDevices.enumerateDevices();
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

        getDevices().then(function (result) {
            console.log(result);
        });

      })
      .catch(function (error) {
        console.log("Something went wrong!\n" + error);
        alert("Error");
      });
  }

switchbtn.addEventListener("click", () => {

    if (camera == "environment"){
        camera = "user";
        video.classList.toggle("mirrored");
    }
    else {
        camera = "environment";
    }

    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        let constraints = { 
            video: {
                facingMode: {
                    ideal: camera
                }
            } 
        };
        track.applyConstraints(constraints);
        console.log("Camera switched!");
    }

});

stopbtn.addEventListener("click", stop);

function stop(e) {
    try {
        var stream = video.srcObject;
        var tracks = stream.getTracks();
  
        for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
        }
  
        video.srcObject = null;
    }
    catch {
        console.log("No video running.");
    }
    

    postComment();
}

var commentTexts = ["Szia!", "Mizu?", "bro", "xddd"];
var viewerCount = 12.2; // *1000

function postComment(){
    var comments = document.getElementsByClassName("comment");


    var save = comments[0].innerHTML;

    comments[0].children[1].children[1].children[0].textContent = commentTexts[Math.floor(Math.random() * commentTexts.length)];

    for (var i = 0; i < comments.length-1; i++) {
        let savee = comments[i+1].innerHTML;
        comments[i+1].innerHTML = save;
        save = savee;
    }
    setTimeout(postComment, 3000);

    var change = (Math.floor(Math.random() * 11) - 5) / 10;
    viewerCount += Math.round(change*10)/10;

    document.getElementsByClassName("viewercount")[0].textContent = Math.round(viewerCount*10)/10 + "K";
}

setTimeout(postComment, 3000);