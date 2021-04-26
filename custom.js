// var firebaseConfig = {
//   apiKey: "AIzaSyDS5R9n2lX6KqlObrNvGtRiHXCEs3Vstig",
//   authDomain: "web-test-a08d6.firebaseapp.com",
//   projectId: "web-test-a08d6",
//   storageBucket: "web-test-a08d6.appspot.com",
//   messagingSenderId: "570420623193",
//   appId: "1:570420623193:web:3f9d47bc1ce76bf2e17e48",
//   measurementId: "G-2SRDM5QKX9",
// };
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

var selfCheckTCV = document.getElementById("selTcv");
var selfCheckTANK = document.getElementById("selTank");
var reprocessingTCV = document.getElementById("repTcv");
var reprocessingTANK = document.getElementById("repTank");
var selfTcv;
var selTank;
var repTcv;
var repTank;

let btnrepStart = document.querySelector("#repStart");
let btnselStart = document.querySelector("#selStart");

var check;


setInterval(function () {
  firebase
  .database()
  .ref("status/")
  .on("value", function (snapshot) {
    check = snapshot.val().CheckWork;
    console.log("เริ่มการทำงาน "+check);
  });
    if (check == 1) {
      document.getElementById("selStart").disabled = true ;
      document.getElementById("repStart").disabled = true ;
      // alert("Wait ! for the machine is working...");
    }else if(check == 0){
      document.getElementById("selStart").disabled = false ;
      document.getElementById("repStart").disabled = false ;
    }
  
}, 1000);


if (firebase != false) {
  //------ Show Value ---------//

  firebase
    .database()
    .ref("selfCheck/")
    .on("value", function (snapshot) {
      selTank = document.getElementById("selTank").value = snapshot.val().tank;
      selfCheckTANK.innerHTML = selTank;
    });

  firebase
    .database()
    .ref("selfCheck/")
    .on("value", function (snapshot) {
      selfTcv = document.getElementById("selTcv").value = snapshot.val().tcv;
      selfCheckTCV.innerHTML = selfTcv;
    });
  firebase
    .database()
    .ref("reprocessing/")
    .on("value", function (snapshot) {
      repTank = document.getElementById("repTank").value = snapshot.val().tank;
      reprocessingTANK.innerHTML = repTank;
    });
  firebase
    .database()
    .ref("reprocessing/")
    .on("value", function (snapshot) {
      repTcv = document.getElementById("repTcv").value = snapshot.val().tcv;
      reprocessingTCV.innerHTML = repTcv;
    });

  
}

//------ Send Value ---------//
///////--selStart--///////
document.getElementById("selStart").onclick = function () {
  firebase.database().ref("status/").update({
    CheckWork: On1,
  });

  firebase
  .database()
  .ref("status/")
  .on("value", function (snapshot) {
    check = snapshot.val().CheckWork;
    console.log("เริ่มการทำงาน "+check);
  });

  firebase.database().ref("selfCheck/").update({
    btStart: Off1,
  });
  setTimeout(function () {
    firebase.database().ref("selfCheck/").update({
      btStart: On1,
    });
    // firebase.database().ref("status/").update({
    //   CheckWork: Off1,
    // });
  }, 10000);
};

///////--repStart--///////
document.getElementById("repStart").onclick = function () {
  firebase.database().ref("reprocessing/").update({
    btStart: Off1,
  });

  setTimeout(function () {
    firebase.database().ref("reprocessing/").update({
      btStart: On1,
    });
  }, 10000);
};


//------ Count Down------//

function countDown(secs, elem) {
  var element = document.getElementById(elem);
  element.innerHTML = "Please wait for " + secs + " seconds";
  if (secs < 1) {
    clearTimeout(timer);
    element.innerHTML = "<h2>Countdown Complete!</h2>";
    element.innerHTML += '<a href="#">Click here now</a>';
  }
  secs--;
  var timer = setTimeout("countDown(" + secs + ',"' + elem + '")', 1000);
  countDown(100, "repStart");
}

$(".btn").on("click", function () {
  var $this = $(this);
  $this.button("loading");
  setTimeout(function () {
    $this.button("reset");
  }, 8000);
});

checkLogin();
function checkLogin() {
  document.getElementById("logout").onclick = function () {
    localStorage.clear();
    window.location = "index.html";
  };
}

var time = new Date().toLocaleString();
//---------------- countdown 1 ------------------//
var myTimer = document.getElementById("myTimer");


$("#selStart").click(function () {
  startTimer();
});

function startTimer() {
  var counter = 10;
  setInterval(function () {
    counter--;
    if (counter >= 0) {
      myTimer.innerHTML = "Please wait for ...  " + counter;
      +"  sec.";
      document.getElementById("myTimer").style.display = "inline";
      document.getElementById("selStart").style.display = "none";
      document.getElementById("inradio2").disabled = true;
      document.getElementById("inradio0").disabled = true;
    }
    if (counter === 0) {
      firebase.database().ref("status/").update({
        CheckWork: Off1,
      });
      firebase
        .database()
        .ref("status/")
        .on("value", function (snapshot) {
          check = snapshot.val().CheckWork;
          console.log("จบการทำงาน " + check);
        });
      document.getElementById("selStart").style.display = "none";
      document.getElementById("myTimer").style.display = "none";
      document.getElementById("selComp").style.display = "inline";
      clearInterval(counter);
    }
  }, 1000);
}

function clearCount() {

  setTimeout(function () {
    document.getElementById("selComp").style.display = "none";
    document.getElementById("inradio2").disabled = false;
    document.getElementById("inradio0").disabled = false;
    document.getElementById("selStart").style.display = "inline";
  }, 200);
    db.collection('user').add({
      date: time,
      status: "SelfCheck",
      value1: selfTcv,
      value2: selTank,
      delete:"x"
})
}

//---------------- countdown 2 ------------------//
var myTimer2 = document.getElementById("myTimer2");

$("#repStart").click(function () {
  startTimer2();
});

function startTimer2() {
  var counter = 10;
  setInterval(function () {
    counter--;
    if (counter >= 0) {
      myTimer2.innerHTML = "Please wait for ...  " + counter;
      +"  sec.";
      document.getElementById("myTimer2").style.display = "inline";
      document.getElementById("repStart").style.display = "none";
      document.getElementById("inradio1").disabled = true;
      document.getElementById("inradio0").disabled = true;
    }
    if (counter === 0) {
      document.getElementById("repStart").style.display = "none";
      document.getElementById("myTimer2").style.display = "none";
      document.getElementById("repComp").style.display = "inline";

      firebase.database().ref("status/").update({
        CheckWork: Off1,
      });
      firebase
        .database()
        .ref("status/")
        .on("value", function (snapshot) {
          check = snapshot.val().CheckWork;
          console.log("จบการทำงาน " + check);
        });
      clearInterval(counter);
    }
  }, 1000);
}

function clearCount2() {
  setTimeout(function () {
    document.getElementById("repComp").style.display = "none";
    document.getElementById("repStart").style.display = "inline";
    document.getElementById("inradio1").disabled = false;
    document.getElementById("inradio0").disabled = false;
  }, 200);
  db.collection('user').add({
    date: time,
    status: "Reprocessing",
    value1: selfTcv,
    value2: selTank,
    delete:"x"
})
}

// function onLoad() {
//   window.onload = document.getElementById("inradio0").onclick === true;
// }



let DATE = document.querySelector('#date');
let STATUS = document.querySelector('#status');
let TCV = document.querySelector('#tcv');
let TANK = document.querySelector('#tank');
let DEL = document.querySelector('#xx');

function renderUser1 (doc) {
  let li = document.createElement('li');
  let date = document.createElement('span');
  li.setAttribute('data-id',doc.id);
  date.textContent = doc.data().date;
  li.appendChild(date);
  DATE.appendChild(li);

}

function renderUser2 (doc) {
  let li = document.createElement('li');
  let status = document.createElement('span');
  li.setAttribute('data-id',doc.id);
  status.textContent = doc.data().status;
  li.appendChild(status);
  STATUS.appendChild(li);

}

function renderUser3 (doc) {
  let li = document.createElement('li');
  let tcv = document.createElement('span');
  li.setAttribute('data-id',doc.id);
  tcv.textContent = doc.data().value1;
  li.appendChild(tcv);
  TCV.appendChild(li);

}

function renderUser4 (doc) {
  let li = document.createElement('li');
  let tank = document.createElement('span');
  li.setAttribute('data-id',doc.id);
  tank.textContent = doc.data().value2;
  li.appendChild(tank);
  TANK.appendChild(li);

}
function renderUser5 (doc) {
  let li = document.createElement('li');
  let del = document.createElement('span');
  del.className = 'del';
  li.setAttribute('data-id',doc.id);
  del.textContent = doc.data().delete;
  li.appendChild(del);
  DEL.appendChild(li);
  //delete data 
  del.addEventListener('click',(e) =>{
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('user').doc(id).delete();
});
}
// real-time database

db.collection('user').orderBy('date').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges ();
    changes.forEach(change => {
        //console.log(change);
        if(change.type == 'added') {
            renderUser1(change.doc);
            renderUser2(change.doc);
            renderUser3(change.doc);
            renderUser4(change.doc);
            renderUser5(change.doc);
        }else if(change.type =='removed') {
            let deDATE = DATE.querySelector(`[data-id =${change.doc.id}]`);
            let deSTATUS = STATUS.querySelector(`[data-id =${change.doc.id}]`);
            let deTCV = TCV.querySelector(`[data-id =${change.doc.id}]`);
            let deTANK = TANK.querySelector(`[data-id =${change.doc.id}]`);
            let deDEL = DEL.querySelector(`[data-id =${change.doc.id}]`);
            DATE.removeChild(deDATE);
            STATUS.removeChild(deSTATUS);
            TCV.removeChild(deTCV);
            TANK.removeChild(deTANK);
            DEL.removeChild(deDEL);
        }
    
    })
})