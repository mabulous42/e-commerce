let userName = document.getElementById("userName");
let displayTag = document.getElementById("display-items");


function signOut() {
    window.location.href = "index.html";
    localStorage.removeItem("currentUser");
}

let currentUser = JSON.parse(localStorage.getItem("currentUser"));

userName.innerHTML = currentUser.name;

if (!currentUser) {
    window.location.href = "index.html";
}

async function showItems() {
    let allItems = await fetch("https://dummyjson.com/products");
    let result = await allItems.json();
    console.log(result);
    result.products.forEach(element => {        
        displayTag.innerHTML += `
        <div class="d-flex align-items-center">
            <button>
                <div class="position-relative">
                    <img src="${element.images[0]}" class="items-images"></img>
                    <div class="position absolute">${element.discountPercentage}</div>
                </div>
            </button>
        </div>
        ` 
    });
}
showItems();


// showItems("https://dummyjson.com/products");
// displayCountries("https://fakestoreapi.com/products");