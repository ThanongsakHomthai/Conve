var firebaseConfig = {
  apiKey: "AIzaSyC7YOypNq6-QzMzKTxuX7u1Kid3LqPkfAA",
  authDomain: "testt-1b37d.firebaseapp.com",
  projectId: "testt-1b37d",
  storageBucket: "testt-1b37d.appspot.com",
  messagingSenderId: "541261737583",
  appId: "1:541261737583:web:482a0bd973a92c7c16279a",
  measurementId: "G-PX7XF8KQPJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();

var TestV;
var On1 = 1;
var Off1 = 0;
var checkWork = 1;

var Servo = document.getElementById("selTcv");
var SpeedCon = document.getElementById("selTank");
var selTank;
let calServo;
let sumCalServo;

let btnselStart = document.querySelector("#selStart");

if (firebase != false) {
  //------ Show Value ---------//

  firebase
    .database()
    .ref("Speed/")
    .on("value", function (snapshot) {
      selTank = document.getElementById("selTank").value = snapshot.val().Conve;
      SpeedCon.innerHTML = selTank;
    });

  firebase
    .database()
    .ref("Speed/")
    .on("value", function (snapshot) {
      calServo = snapshot.val().Servo;
      sumCalServo = (calServo *60)/2;
      Servo.innerHTML = sumCalServo;
    });
}



//------ Send Value ---------//

var StartCon = document.getElementById("selStart");
var StopCon = document.getElementById("offStart");
var Plus = document.getElementById("plus");
var Drop = document.getElementById("drop");
var bgShow = document.getElementById("show1");
var bgShow1 = document.getElementById("selColL");
var bgShow2 = document.getElementById("selColR");
var bgnav = document.getElementById("navbg");

let timecount = 0;
let check = 0;

Plus.onclick = function(){
    
  firebase.database().ref("Plus/").update({
    btStart: Off1,
  });
  Plus.disabled = true;
  Drop.disabled = true;
  StartCon.disabled = true;
  Plus.style.background = 'rgb(41, 38, 38)';

  setTimeout(function () {
    firebase.database().ref("Plus/").update({
      btStart: On1,
    });
    Plus.disabled = false;
    Drop.disabled = false;
    StartCon.disabled = false;
    Plus.style.background = 'gray';
  }, 8000);
};

Drop.onclick = function(){
    
  firebase.database().ref("Drop/").update({
    btStart: Off1,
  });
  Plus.disabled = true;
  Drop.disabled = true;
  StartCon.disabled = true;
  Drop.style.background = 'rgb(41, 38, 38)';

  setTimeout(function () {
    firebase.database().ref("Drop/").update({
      btStart: On1,
    });
    Drop.disabled = false;
    Plus.disabled = false;
    StartCon.disabled = false;
    Drop.style.background = 'slategray';
  }, 8000);
};

///////--Start--///////
StartCon.onclick = function () {
  check = 1;
  console.log(check);
  firebase.database().ref("status/").update({
    CheckWork: On1,
  });
  bgShow.style.background = 'rgb(122, 204, 95)';
  bgShow1.style.background = 'rgb(66, 240, 95)';
  bgShow2.style.background = 'rgb(66, 240, 95)';
  bgnav.style.background = 'rgb(47, 123, 32)';
  Servo.style.color = 'darkred';
  SpeedCon.style.color = 'darkred';
  
  StartCon.style.display ='none';
  StopCon.style.display ='inline';
  StopCon.disabled = true;
  Plus.disabled = true;
  Drop.disabled = true;
  
  firebase.database().ref("StartCon/").update({
    btStart: Off1,
  });
  setTimeout(function () {
    firebase.database().ref("StartCon/").update({
      btStart: On1,
    });
    StopCon.disabled = false;

  }, 6000);
};

///////--Stop--///////
StopCon.onclick = function () {
  firebase.database().ref("status/").update({
    CheckWork: On1,
  });
  bgShow.style.background = 'white';
  bgShow1.style.background = 'skyblue';
  bgShow2.style.background = 'skyblue';
  bgnav.style.background = 'steelblue';
  Servo.style.color = 'black';
  SpeedCon.style.color = 'black';

  StartCon.style.display ='inline';
  StopCon.style.display ='none';
  StartCon.disabled = true;


  firebase.database().ref("StopCon/").update({
    btStart: Off1,
  });
  setTimeout(function () {
    firebase.database().ref("StopCon/").update({
      btStart: On1,
    });

    StartCon.disabled = false;
    Plus.disabled = false;
    Drop.disabled = false;
  }, 6000);
};

checkLogin();
function checkLogin() {
  document.getElementById("logout").onclick = function () {
    localStorage.clear();
    window.location = "index.html";
  };
}

// function Charttt(){
//   var chart = new CanvasJS.Chart("chartContainer", {
//     animationEnabled: true,
//     theme: "light2",
//     title:{
//       text: "Simple Line Chart"
//     },
//     data: [{        
//       type: "line",
//           indexLabelFontSize: 16,
//       dataPoints: [
//         { y: 450 },
//         { y: 414},
//         { y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
//         { y: 460 },
//         { y: 450 },
//         { y: 500 },
//         { y: 480 },
//         { y: 480 },
//         { y: 410 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
//         { y: 500 },
//         { y: 480 },
//         { y: 510 }
//       ]
//     }]
//   });
//   chart.render();
//   }