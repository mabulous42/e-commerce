let userName = document.getElementById("userName");
let displayTag = document.getElementById("display-items");
let cartCount = document.getElementById("cartCount");
let itemsModal = document.getElementById("item-full-details-modal");
let itemFullDetails = document.getElementById("show-items-details");
let showCartDetails = document.getElementById("check-out-modal");
let displayCartTag = document.getElementById("show-cart-details");
let checkOutAmountTag = document.getElementById("show-total-amount");
let cartLength = document.getElementById("cartLength");

itemsModal.style.display = "none";
showCartDetails.style.display = "none";


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
        myCart.forEach(el => {
            el.quantity = 1;
        })
        localStorage.setItem("cart", JSON.stringify(myCart))
    }
    console.log(myCart);
    showItems();
}

function updateCart() {
    cartCount.innerHTML = myCart.length;
    cartLength.innerHTML = myCart.length;

}
updateCart();

function showItemFullDetails(id) {
    itemsModal.style.display = "block";
    let clickedItem = itemList.find(el => el.id == id);
    let carted = myCart.some(item => item.id == clickedItem.id);
    console.log(clickedItem);
    itemFullDetails.innerHTML = `
    <div class="d-flex position-relative">
        <div class="w-50">
            <img src="${clickedItem.thumbnail}" alt="" class="w-100">
            <hr>
            <p class="share">SHARE THIS PRODUCT</p>
        </div>
        <div class="w-50 m-2">
            <p class="official-store bg-success text-white w-25">Official Store</p>
            <h6>${clickedItem.title}</h6>
            <h5>${clickedItem.description}</h5>
            <hr>
            <h4>${"$" + clickedItem.price}</h4>
            <p class="few text-warning-emphasis">Few units left</p>
            <p class="few">+ shipping from $10 to your destination</p>
            <button class="btn btn-warning w-100" onclick="addToCart(event,${clickedItem.id})">${carted ? "REMOVE FROM CART" : "ADD TO CART"}</button>
        </div>
        <button class="position-absolute end-0" onclick="closeItemsModal()">
            <i class="icofont-close-line fs-2 text-black"></i>
        </button>
    </div>
    `
    // showItems();
}

function closeItemsModal() {
    itemsModal.style.display = "none";
    showItems();
}
let itemQuantity = document.getElementById("quantity");
let quantity = 1;

// let theItem = myCart.forEach(element => {
//     element.quantity = 1;    
//     console.log(element.quantity);
// })


let totalCostOfItem;
function showAllCartItems() {
    let totalCartSum = 0;
    showCartDetails.style.display = "block";
    console.log(myCart);
    myCart.forEach(items => {
        let totalCostOfItem = quantity * items.price;
        displayCartTag.innerHTML += `
    <div class="d-flex align-items-center justify-content-between w-100 mb-2 carting">
        <div class="d-flex align-items-center me-3 w-100">
            <div class="me-2 w-25">
                <img src="${items.images[0]}" alt="" class="w-75"/>
                <button class="removeCart mt-2 btn btn-warning" onclick="remove(${items.id})">Remove</button>
            </div>
            <div class="w-75">${items.description}</div>
        </div>
        <div>
            <div class="w-25 text-center">
                <div class="text-center">${"$" + totalCostOfItem}</div>
                <div class="d-flex">
                    <button class="btn btn-warning" onclick="reduceQuantity(${items.id})">-</button>
                    <span id="quantity${items.id}">${items.quantity}</span>
                    <button class="btn btn-warning" onclick="increaseQuantity(${items.id})">+</button>
                </div>
            </div>
        </div>
    </div>
    <hr>
    `
    totalCartSum += totalCostOfItem;

    checkOutAmountTag.innerHTML = `
    <div class="w-100 checkOut">
        <h6>CART SUMMARY</h6>
        <hr>
        <div class="d-flex justify-content-between align-items-center">
            <h6>Sub Total</h6>
            <h4>${"$" + totalCartSum}</h4>
        </div>
        <hr>
        <button class="btn btn-warning shadow w-100">CHECKOUT (${"$" + totalCartSum})</button>

    </div>
    `
    })  
}

function closeCartModal() {
    showCartDetails.style.display = "none";
    displayCartTag.innerHTML ="";
}

function remove(id) {
    
}

function increaseQuantity(id) {
    let myItems = myCart.find(el => el.id == id);
    myItems.quantity++
    document.getElementById(`quantity${id}`).innerHTML = myItems.quantity
    localStorage.setItem("cart", JSON.stringify(myCart));
    showAllCartItems();
    // console.log(itemQuantity.innerHTML);
    // itemList.quantity = quantity;
    // itemList.totalPrice = totalPrice;
    // localStorage.setItem("items", JSON.stringify(itemList));
    // itemQuantity.value = 1;
}



function makePayment() {
    FlutterwaveCheckout({
      public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
      tx_ref: "titanic-48981487343MDI0NzMx",
      amount: 54600,
      currency: "NGN",
      payment_options: "card, banktransfer, ussd",
      redirect_url: "https://glaciers.titanic.com/handle-flutterwave-payment",
      meta: {
        consumer_id: 23,
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: "rose@unsinkableship.com",
        phone_number: "08102909304",
        name: "Rose DeWitt Bukater",
      },
      customizations: {
        title: "The Titanic Store",
        description: "Payment for an awesome cruise",
        logo: "https://www.logolynx.com/images/logolynx/22/2239ca38f5505fbfce7e55bbc0604386.jpeg",
      },
    });
  }