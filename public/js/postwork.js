function generateRandomString() {
    let randomString = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 11; i++ ) {
      randomString += characters.charAt(Math.floor(Math.random()*characters.length));
   }
   return randomString;
}

function showHideOptions(){
    if (document.getElementById("advanceoption").innerHTML == "Advance Options"){
        document.getElementById("textfields").style = "display: grid";
        document.getElementById("advanceoption").innerHTML = "Hide Options";
    }
    else if (document.getElementById("advanceoption").innerHTML == "Hide Options"){
        document.getElementById("textfields").style = "display: none";
        document.getElementById("advanceoption").innerHTML = "Advance Options";
    }
}

function pwdMatch(){
    var pwd = document.getElementById("manualpwd").value;
    var repwd = document.getElementById("remanualpwd").value;
    if (pwd && pwd == repwd){
        document.getElementById("positivemsg1").style = "display: block";
    }
    else{
        document.getElementById("negativemsg1").style = "display: block";
    }
}

function clearMessage(){
    document.getElementById("positivemsg1").style = "display: none";
    document.getElementById("negativemsg1").style = "display: none";
}

function selectText(containerid) {
    if (document.selection) {
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(containerid));
        range.select();
    } else if (window.getSelection) {
        var range = document.createRange();
        range.selectNode(document.getElementById(containerid));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
    }
}

function encryptNote(){
    inputText = document.getElementById("inputText").value;
    randomString = generateRandomString();
    data = { note: inputText,
            destroyWhen: document.getElementById("destroyOptions").value,
            pwd: document.getElementById("manualpwd").value,
            hashValue: randomString};
    fetch('/created', {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(function(response) {
      if(response.ok) return;
      throw new Error('Request failed.');
    })
    .then(function(response){
        document.getElementById("main-content-1").style = "display:none";
        document.getElementById("main-content-2").style = "";
        document.getElementById("inputPreText").value = window.location.href + randomString;
    })
    .catch(function(error) {
      console.log(error);
    });
}

function destroyNote(){
    let splitted = document.getElementById("inputPreText").value.split("/");
    let noteId = splitted[splitted.length - 1];
    fetch('/deleted', {method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"noteId": noteId}),
    })
    .then(function(response){
        document.getElementById("inputPreText").value = "Note Deleted Successfully";
    })
    .catch(function(error) {
        document.getElementById("inputPreText").value = "Note could not be Deleted";
        console.log(error);
    });
}

function clickMail(){
    var emailBody = noteLink;
    document.location = "mailto:"+"friendsemail@gmail.com"+"?subject="+"One Time Read Private Note"+"&body="+emailBody;
}

function reloadPage(){
    fetch('/')
    .then((response) => {
      if(response.ok) window.location.replace(response.url);
      else throw new Error(response);
    })
}
