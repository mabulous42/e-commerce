let userName = document.getElementById("userName");
let displayTag = document.getElementById("display-items");
let cartCount = document.getElementById("cartCount");
let itemsModal = document.getElementById("item-full-details-modal");
let itemFullDetails = document.getElementById("show-items-details");
let showCartDetails = document.getElementById("check-out-modal");
let displayCartTag = document.getElementById("show-cart-details");
let checkOutAmountTag = document.getElementById("show-total-amount");
let cartLength = document.getElementById("cartLength");
let searchInput = document.getElementById("search-brand-product-category");
let showItemsImages = document.getElementById("items-images-parent");
let itemsImagesTag = document.getElementById("items-images");

itemsModal.style.display = "none";
showCartDetails.style.display = "none";
showItemsImages.style.visibility = "hidden";


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
    console.log(!currentUser);
    window.location.href = "index.html";
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

//a global function that displays the content of an array
function displayItemsOfAnArray(theArray) {
    displayTag.innerHTML = "";
    theArray.forEach(element => {
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

//function that displays all items gotten from the API
function showItems() {
    //invoking the global display function and passing in the argument itemList
    displayItemsOfAnArray(itemList);
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
        localStorage.setItem("cart", JSON.stringify(myCart));
    } else {
        ev.target.innerHTML = "REMOVE FROM CART";
        myCart.push(found);
        myCart.forEach(el => {
            el.quantity = 1;
            el.itemPrice = el.price;
        })
        localStorage.setItem("cart", JSON.stringify(myCart))
    }
    console.log(myCart);
    showItems();
    updateCart();
}

function updateCart() {
    let totQty = 0;
    myCart.forEach(element => {
        totQty = totQty + element.quantity;
        cartCount.innerHTML = totQty;
        cartLength.innerHTML = totQty;
    })

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
            <img src="${clickedItem.thumbnail}" alt="" class="w-100" onclick="showFullImages(${clickedItem.id})">
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
}

let imageCount = 0;
function showFullImages(id) {
    showItemsImages.style.visibility = "visible";
    let thisItem = itemList.find(el => el.id == id);
    itemsImagesTag.innerHTML = `
    <div>
    <h2 class="text-white">Product Images</h2>
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${thisItem.images[imageCount]}" class="d-block w-100" alt="...">
                </div>            
            </div>
            <button class="carousel-control-prev bg-black" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev" onclick="prevSlide(${thisItem.id})">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next bg-black" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next" onclick="nextSlide(${thisItem.id}, ${thisItem.images.length})">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `
}

function nextSlide(id, length) {
    console.log(length);
    if (imageCount == length-1) {
        return;
    } else {
        imageCount++;
        showFullImages(id);        
    }
}
function prevSlide(id) {
    if (imageCount == 0) {
        return;
    } else {
        imageCount--;
        showFullImages(id);        
    }
}

function closeItemsModal() {
    itemsModal.style.display = "none";
    showItems();
}

let totalCostOfItem;
function showAllCartItems() {
    displayCartTag.innerHTML = "";
    let totalCartSum = 0;
    showCartDetails.style.display = "block";
    console.log(myCart);
    myCart.forEach(items => {
        let totalCostOfItem = items.quantity * items.price;
        displayCartTag.innerHTML += `
        <div class="d-flex align-items-center justify-content-between w-100 mb-2 carting">
            <div class="d-flex align-items-center me-3 w-100">
                <div class="me-2 w-25">
                    <img src="${items.images[0]}" alt="" class="w-75"/>
                    <button class="removeCart mt-2 btn btn-warning" onclick="remove(${items.id})">Remove</button>
                </div>
                <div class="w-75">${items.description}</div>
            </div>
            <div class="w-25">
                <div class="w-100 text-center">
                    <div class="text-start cost-per-unit mb-2">Cost per unit: ${"$" + items.price}</div>
                    <div class="d-flex">
                        <button class="btn btn-warning" onclick="reduceQuantity(${items.id})" id="reducebtn${items.id}">-</button>
                        <span id="quantity${items.id}" class="w-50">${items.quantity}</span>
                        <button class="btn btn-warning" onclick="increaseQuantity(${items.id})">+</button>
                    </div>
                </div>
                </div>
                <h5 class="text-center w-25" id="totCostItem${items.id}">${"$" + totalCostOfItem}</h5>
        </div>
        <hr>
        `
        totalCartSum += totalCostOfItem;

        checkOutAmountTag.innerHTML = `
        <div class="w-100 sticky-top">
            <h6 class="pt-2">CART SUMMARY</h6>
            <hr>
            <div class="d-flex justify-content-between align-items-center">
                <h6>Subtotal</h6>
                <h4>${"$" + totalCartSum}</h4>
            </div>
            <hr>
            <button class="btn btn-warning shadow w-100" type="button" id="start-payment-button" onclick="makePayment(${totalCartSum})">CHECKOUT (${"$" + totalCartSum})</button>

        </div>
        `
    })
}

function closeCartModal() {
    showCartDetails.style.display = "none";
    showItems();
}

function remove(id) {
    let rem_Item = myCart.find(item => item.id == id);
    let theIndex = myCart.indexOf(rem_Item);
    myCart.splice(theIndex, 1);
    localStorage.setItem("cart", JSON.stringify(myCart));
    showAllCartItems();
    updateCart();
    // showItemFullDetails();
    // showItems();
}

function increaseQuantity(id) {
    document.getElementById(`reducebtn${id}`).disabled = false;
    let myItems = myCart.find(el => el.id == id);
    myItems.quantity++
    myItems.itemPrice += myItems.price;
    document.getElementById(`quantity${id}`).innerHTML = myItems.quantity;
    document.getElementById(`totCostItem${id}`).innerHTML = "$" + myItems.itemPrice;
    localStorage.setItem("cart", JSON.stringify(myCart));
    showAllCartItems();
    updateCart();
}



function reduceQuantity(id) {
    let myItems = myCart.find(el => el.id == id);
    if (myItems.quantity == 1) {
        // document.getElementById(`reducebtn${id}`).disabled = true;
        // showAllCartItems();
        return;
    }
    else {
        myItems.quantity--;
        myItems.itemPrice -= myItems.price;
        document.getElementById(`quantity${id}`).innerHTML = myItems.quantity;
        document.getElementById(`totCostItem${id}`).innerHTML = myItems.itemPrice;
        localStorage.setItem("cart", JSON.stringify(myCart));
        showAllCartItems();
        updateCart();
    }
}



function makePayment(amount) {
    FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-85859216e4b584fb414479d6eda07f5a-X",
        tx_ref: "titanic-48981487343MDI0NzMx",
        amount: amount,
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

function search(ev) {
    ev.preventDefault();
    let searchResult = itemList.filter((items) => (items.brand).toUpperCase() == (searchInput.value.toUpperCase())
        || (items.category).toUpperCase() == (searchInput.value.toUpperCase())
        || ((items.title).toUpperCase()).includes((searchInput.value.toUpperCase())));

    searchInput.value = "";
    if (searchResult.length == 0) {
        console.log("not found");
        alert("No Items found");
    }
    else {
        console.log("searchResult");
        console.log(searchResult);
        displayItemsOfAnArray(searchResult);
    }

}