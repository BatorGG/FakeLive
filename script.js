var switchbtn = document.getElementById("switch");
var stopbtn = document.getElementById("stop");

var typeUsername = document.getElementById("typeUsername");
var startBtn = document.getElementById("startButton");

var video = document.getElementById("videoElement");

var camera = "environment";

function startStream(constraints) {

    typeUsername.classList.add("hidden");
    startBtn.classList.add("hidden");

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            video.srcObject = stream;
        })
        .catch(function (error) {
            console.log("Something went wrong!\n" + error);
            alert("Error");
        });
    }

}

var constraints = { 
    video: {
        facingMode: {
            ideal: camera
        }
    } 
}

startStream(constraints);

switchbtn.addEventListener("click", () => {

    
    

    if (camera == "environment"){
        //alert("switch to user");

        video.classList.add("mirrored");

        camera = "user";
        constraints = { 
            video: {
                facingMode: {
                    exact: "user"
                }
            } 
        };

        stop();
        startStream(constraints);
    }

    else {
        //alert("switch to environment");

        video.classList.remove("mirrored");
        
        camera = "environment";
        constraints = { 
            video: {
                facingMode: {
                    ideal: "environment"
                }
            } 
        };

        stop();
        startStream(constraints);
    }

});

stopbtn.addEventListener("click", stop);
startBtn.addEventListener("click", start);

var useUsername = "batorkarpathegyi";

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

    typeUsername.classList.remove("hidden");
    startBtn.classList.remove("hidden");

}

function start() {
    typeUsername.classList.add("hidden");
    startBtn.classList.add("hidden");

    if (typeUsername.value.length > 3) {
        useUsername = typeUsername.value;
    }

    document.getElementById("profilepicImg").src = useUsername + ".png";
    document.getElementById("username").innerHTML = useUsername + "<div class='downarrow'> <i class='arrow down'></i></div>";

    if (commentNames.includes(useUsername)) {
        let index = commentNames.indexOf(useUsername);
        if (index > -1) { // only splice array when item is found
            commentNames.splice(index, 1); // 2nd parameter means remove one item only
            console.log(commentNames);
        }
    }

    startStream(constraints);
}

var commentNames = ["botond.elek", "_dbogi", "triebnandor", "forgo_berci", "batta_benedek", "k_b_u_b_u_", "lberhanna", "_ramcsi_", "lucascheffler"];
var commentTexts = ["Szia", "Hali", "Mizu?", "Hogy vagy?", "Hol vagy?", "Meddig leszel liveban?", "Csa teso", "lol", "lolll", "teso", "bro", "broo", "xddd",  "Rég volt live", "Terv estére?", "cinge", "mizu bator", "Vegre livee", "lessgoo", "az ugy jo", "csao", "mehetnenk mar bulizni valamikor", "fasza a szett", "nem fázol?", "bazdmeeeg", "Nem fogod elhinni mi történt", "kurvajo xd"];
var viewerCount = 12.2; // *1000

function postComment(){
    var comments = document.getElementsByClassName("comment");


    //Save first comment
    var save = comments[0].innerHTML;

    //Change first comment
    var commentText = commentTexts[Math.floor(Math.random() * commentTexts.length)];
    comments[0].children[1].children[1].children[0].textContent = commentText;
    
    var commentName = commentNames[Math.floor(Math.random() * commentNames.length)];
    var fileName = commentName;

    while (fileName.charAt(0) == "_"){
        fileName = fileName.substring(1);
    }

    comments[0].children[0].children[0].src = fileName + ".png";
    comments[0].children[1].children[0].children[0].textContent = commentName;

    //Slide everything back by one
    for (var i = 0; i < comments.length-1; i++) {
        let savee = comments[i+1].innerHTML;
        comments[i+1].innerHTML = save;
        save = savee;
    }







    setTimeout(postComment, (Math.floor(Math.random() * 3000) + 3000));



    //Vierecount
    var change = (Math.floor(Math.random() * 10) - 4) / 10;
    if (viewerCount > 2) {
        viewerCount += Math.round(change*10)/10;
    }
    else {
        viewerCount += Math.abs(Math.round(change*10)/10);
    }
    

    document.getElementsByClassName("viewercount")[0].textContent = Math.round(viewerCount*10)/10 + "K";
}

postComment();
