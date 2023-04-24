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
            <button class="mx-4 my-3 position-relative">
                <div>
                    <img src="${element.thumbnail}" class="items-images"></img>
                    <div>${element.title}</div>
                </div>
                <div class="position-absolute discount-price rounded bg-warning bg-opacity-75">${"-" + element.discountPercentage + "%"}</div>
            </button>
        `
    });
}
showItems();


// showItems("https://dummyjson.com/products");
// displayCountries("https://fakestoreapi.com/products");