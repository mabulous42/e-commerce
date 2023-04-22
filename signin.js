let userEmail = document.getElementById("user-email");
let userPassword = document.getElementById("user-password");

let registeredUsers = JSON.parse(localStorage.getItem("allUsers"));

function signIn(ev) {
    ev.preventDefault();
    
    let authorizedUser = registeredUsers.find((userDetails) => userDetails.email === userEmail.value && userDetails.password === userPassword.value);
    console.log(authorizedUser);

    if (!authorizedUser) {
        alert("User details not found")
    } else {
        window.location.href = "dashboard.html";
        localStorage.setItem("currentUser", JSON.stringify(authorizedUser));
    }
}