let userName = document.getElementById("userName");


function signOut() {
    window.location.href = "index.html";
    localStorage.removeItem("currentUser");
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

userName.innerHTML = currentUser.name;

if (!currentUser) {
    window.location.href = "index.html";
}