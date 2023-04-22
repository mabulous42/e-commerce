let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");

let registeredUsers = JSON.parse(localStorage.getItem("allUsers"));

function signIn(ev) {
    ev.preventDefault();
    
    let authorizedUser = registeredUsers.find((userDetails) => userDetails.email === userEmail.value);
    console.log(authorizedUser);
}