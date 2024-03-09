window.onload = () => {
    document.querySelector(".loader").style.display = "none";
}

var karsilama="ERHABA";
var i=0;
const myinterval = setInterval(() => {document.getElementById("merhaba").innerHTML+=karsilama[i];i++;if(i==7) {i=0;document.getElementById("merhaba").innerHTML="M";}}, 1000);