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
        <div>
            <button class="my-3 position-relative w-100 p-3 items-btn">
                <div>
                    <div class="w-75">
                        <img src="${element.thumbnail}" class="items-images box"></img>                    
                    </div>
                    <div class="text-start">
                        <p class="title">${element.title}</p>
                        <h5 class="price">${"$"+element.price}</h5>
                    </div>
                    <div class="btn btn-warning w-100">ADD TO CART</div>
                </div>
                <div class="position-absolute discount-price rounded bg-warning bg-opacity-75">${"-" + element.discountPercentage + "%"}</div>
            </button>
        </div>
        `
    });
}
showItems();


// showItems("https://dummyjson.com/products");
// displayCountries("https://fakestoreapi.com/products");