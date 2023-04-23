let fullName = document.getElementById("fullname");
let emailAddress = document.getElementById("email-address");
let passcode = document.getElementById("passcode");
let confirmPassword = document.getElementById("confirmPassword");

let registeredUsers = JSON.parse(localStorage.getItem("allUsers"));

function signUp(ev) {
    ev.preventDefault();

    let userData = {
        name: fullName.value,
        email: emailAddress.value,
        password: passcode.value
    }   
    
    if (registeredUsers === null) {
        registeredUsers = [];
        registeredUsers.push(userData);
        localStorage.setItem("allUsers", JSON.stringify(registeredUsers));
    } else {
        registeredUsers.push(userData);
        localStorage.setItem("allUsers", JSON.stringify(registeredUsers));
    }

    fullName.value = "";
    emailAddress.value = "";
    passcode.value = "";
}

function gotoSignIn() {
    window.location.href = "index.html";
}