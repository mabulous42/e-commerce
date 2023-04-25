let userName = document.getElementById("userName");
let displayTag = document.getElementById("display-items");
let cartCount = document.getElementById("cartCount");
let itemsModal = document.getElementById("item-full-details-modal");
let itemFullDetails = document.getElementById("show-items-details");

// itemsModal.style.display = "none";


//function that allows user to signout of his/her account
function signOut() {
    window.location.href = "index.html";
    localStorage.removeItem("currentUser");
}

//getting list of current user from the signin page 
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

//displaying the name of the current user
userName.innerHTML = currentUser.name;

//checking if there is a current user on the site, if none, the dashboard link should not be accessible, it should redirect back to index.html
if (!currentUser) {
    // window.location.href = "index.html";
}

let itemList;
async function getFromAPI(params) {
    let allItems = await fetch("https://dummyjson.com/products");
    let result = await allItems.json();
    localStorage.setItem("items", JSON.stringify(result.products));
}
getFromAPI();

//saving the items from API inside itemList variable
itemList = JSON.parse(localStorage.getItem("items"));

//getting items in myCart in the local storage
let myCart = JSON.parse(localStorage.getItem("cart")) || [];
console.log(myCart);



//function that consumes the API and also displaying the neccessary details from the API data
function showItems() {
    itemList.forEach(element => {
        let carted = myCart.some(item => item.id == element.id);
        displayTag.innerHTML += `
        <div class='display shadow position-relative p-2 items-btn'>
            <button onclick="showItemFullDetails(${element.id})">
                <div>
                    <div class="w-100">
                        <img src="${element.thumbnail}" class="items-images w-100"/>                    
                    </div>
                    <div class="text-start w-75 ms-4 mt-3">
                        <p class="title">${element.description}</p>
                        <h5 class="price">${"$" + element.price}</h5>
                    </div>
                    <button class="add-to-cart btn btn-warning w-100" onclick="addToCart(event, ${element.id})">${carted ? "REMOVE FROM CART" : "ADD TO CART"}</button>
                    <div class="position-absolute discount-price rounded bg-warning bg-opacity-75">${"-" + element.discountPercentage + "%"}</div>
                </div>
            </button>
        </div>
        `


    });
}
//invoking the showItems() function
showItems();

console.log(itemList);

function addToCart(ev, id) {
    let found = itemList.find(el => el.id == id);
    console.log(found);
    console.log(myCart);
    let carted = myCart.some(item => item.id == found.id);
    console.log(carted);

    if (carted) {
        ev.target.innerHTML = "ADD TO CART";
        let myIndex = myCart.indexOf(found);
        myCart.splice(myIndex, 1);
        updateCart();
        localStorage.setItem("cart", JSON.stringify(myCart))
    } else {
        ev.target.innerHTML = "REMOVE FROM CART";
        myCart.push(found);
        updateCart();
        localStorage.setItem("cart", JSON.stringify(myCart))
    }
    console.log(myCart);
    showItems();
}

function updateCart() {
    cartCount.innerHTML = myCart.length;
}
updateCart();

function showItemFullDetails(id) {
    let clickedItem = itemList.find(el => el.id == id);
    console.log(clickedItem);
    itemFullDetails.innerHTML = `
    <div class="d-flex">
        <div>
            <img src="${found.thumbnail}" alt="">
        </div>
        <div>${found.description}</div>
    </div>
    `
}

function closeModal() {
    itemsModal.style.display = "none";
}