let userName = document.getElementById("userName");
let displayTag = document.getElementById("display-items");

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
    window.location.href = "index.html";
}

//function that consumes the API and also disolaying the neccessary details from the API data
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
                    <div class="add-to-cart btn btn-warning w-100">ADD TO CART</div>
                </div>
                <div class="position-absolute discount-price rounded bg-warning bg-opacity-75">${"-" + element.discountPercentage + "%"}</div>
            </button>
        </div>
        `
    });
}
//invoking the showItems() function
showItems();


// showItems("https://dummyjson.com/products");
// displayCountries("https://fakestoreapi.com/products");