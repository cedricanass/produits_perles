// code javascipt 

// cart
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close");
// open cart
cartIcon.onclick = () =>{
cart.classList.add("ative");
};


// close cart
closeCart.onclick = () =>{
    cart.classList.remove("ative");
    };

// cart warking js
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready();
}

// Making Function
function ready(){
    // Reomve Items From cart
    var reomveCartButtons = document.getElementsByClassName("cart-remove");
    console.log(reomveCartButtons);
    for( var i = 0; i < reomveCartButtons.length; i++){
        var button = reomveCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // Quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for( var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener("change", quantitychanged);
    }
    // AddTo cart
    var addCart = document.getElementsByClassName("add-cart");
    for( var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    // Buy Button Work

    // document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyBouttonclicked);
}
// Buy Button work

// function buyBouttonclicked(){
//     alert('your Order is placed');
//     var cartContent = document.getElementsByClassName("cart-content")[0]
//     while(cartContent.hasChildNodes()){
//         cartContent.removeChild(cartContent.firstChild);
//     }
//     updatetotal();
// }


 // Reomve Items From cart
 function removeCartItem(event){
    var buttonClicked = event.target
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // supprimer l' élément de l'interface de l'utilisateur
    let title = buttonClicked.parentElement.querySelector(".cart-produit-title").innerText;

    buttonClicked.parentElement.remove();
    updatetotal();
    //  Supprimer l'article correspondant du stockage local
    cartItems = cartItems.filter(item => item.title !==title );
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // Mettre à jour la nootification
    updateCarCount(cartItems.length);
 }
//  Quantity Changes(pour que les valeurs ne desendent plus negativement et permettre le calcul des produits )
function quantitychanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    } 
    updatetotal();
}
// Add To cart
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("sisa")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("produit-img")[0].src;
    console.log("Chemin de l'image du produit:",productImg);
    // Ajouter le produit au panier 
    addProductToCart(title, price, productImg);
    // affiche automatiquement la section du panier
    // cart.classList.add("ative");

    // Mise à jour de la notification du nombre de produit

    // Récupérer les éléments du panier dpuis localStorge
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // ajouer le produit au tableau cartItems
    cartItems.push({title, price, image: productImg});
    // Enresgistrer les produits mis à jour dans localStorge
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // Mettre à jour le total
    updatetotal(cartItems.length);
    updateCarCount(cartItems.length);

}
// Add product to cart content
function  addProductToCart(title, price, productImg){
    console.log("Image enregistrée:",productImg);
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var CartItems = document.getElementsByClassName("cart-content")[0];
    var CartItemsNames = CartItems.getElementsByClassName("cart-produit-title");


    // Check if item already in the cart
    for( var i = 0; i < CartItemsNames.length; i++){
        if( CartItemsNames[i].innerText == title){
            alert("Vous avez déjà ajouté cet article au panier");
            return;
        }
      
    }
    var carBoxcontent =`
                        <img src=" ${productImg}"  alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-produit-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <div> <input type="number" value="1" class="cart-quantity"></div>
                        </div>
                        <!-- Remove cart -->
                        <i class="fa-solid fa-trash cart-remove" ></i>`;
cartShopBox.innerHTML = carBoxcontent;  
CartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantitychanged);

}

// Ajout du code
document.addEventListener("DOMContentLoaded", function() {
    let savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    savedCartItems.forEach(item =>{
        addProductToCart(item.title, item.price, item.image);
    });
    updateCarCount(savedCartItems.length);
});

    window.addEventListener("storage", function() {
        updateCarCount();
    });

// Fonction pour mettre à jour le nombre d'article
function updateCarCount(count){
    // let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      // compte le nombre de produit
    //   let totalItems = cartItems.length;

    let cartCountElement = document.getElementById("cart-count");

  
    // Affiche le nombre de produits sur l'icone du panier
   
    if(cartCountElement){
        cartCountElement.textContent =  count;
    }  
}
document.addEventListener("DOMContentLoaded", function(){
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    updateCarCount(cartItems.length);

   });




// HTML structure for the cart item
// var carBoxcontent = `
//  <img src= "${productImg}" class="cart-img">
//    <div class="detail-box">
//       <div class="cart-produit-title">${title}</div>
//       <div class="cart-price">${price}</div>
//        <input type="number" value="1" class="cart-quantity">
//    </div>
//     <!-- Remove item button -->
//      <i class="fa-solid fa-trash cart-remove" >X</i>
//      `;
//      cartShopBox.innerHTML = carBoxcontent;
//      CartItems.append(cartShopBox);
//     //  Attach event listeners for new elements
//     cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
//     cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantitychanged);
   

function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
        //  If price contain some value
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
   
    
}
    



document.addEventListener("DOMContentLoaded", function() {
    // Récupèrer le bouton du panier et ajoute l'événement clic
    let panierButton = document.querySelector(".btn-buy");
    console.log("Evénement 'click' assigné au bouton'Buy Now'");
    if(panierButton) {
        console.log("Bouton du panier trouvé.")
        panierButton.addEventListener("click", buyBouttonclicked);
    } else {
        console.log("bouton du panier non trouver")
    }
});

// Fonction pour gérer le clic  sur le bouton panier
console.log("buyBouttonclicked");
function buyBouttonclicked(){
    console.log("Fonction 'buyBouttonclicked' déclenchée");
    let cartContent = document.querySelector(".cart-content");
    if(!cartContent){
        console.log("Erreur : Impossible de trouve le contenu du panier.");
        return;
    }
    let CartItems =  [];
    let total =  0;
    // récupère les articles dans le panier

    let cartBoxes = cartContent.getElementsByClassName("cart-box");
    for (let i = 0; i < cartBoxes.length; i++) {
        let cartBox = cartBoxes[i];
        let title = cartBox.querySelector(".cart-produit-title")?.innerText;
        let priceText = cartBox.querySelector(".cart-price")?.innerText ;
        let quantityText =  cartBox.querySelector(".cart-quantity")?.value;
        let imageUrl =  cartBox.querySelector("img")?.src;

        // Vérifier si les valeurs existent et sont bien converties
        let price = parseFloat(priceText?.replace("$", ""));
        let quantity = parseInt(quantityText);
        if(title && !isNaN(price) && !isNaN(quantity) && imageUrl){
            CartItems.push({title : title, price: price, quantity : quantity, image:imageUrl});
            total += price * quantity;
            console.log(`Produit ajouté : ${title}, Prix : $${price}, Quantité : ${quantity}, Image: ${imageUrl}`);
        } else {
            console.log("Erreur dans les données d'un produit: ", { title, price, quantity, imageUrl});
        }
        
    }
    // Enregiistement des produits et total localStroge
    localStorage.setItem("cartItems", JSON.stringify(CartItems));
    localStorage.setItem("totalPrice", total.toFixed(2));

     // Redirection vers la page de commande
     console.log("Redirection vers la pade de commande...");
     window.location.href = "paiement.html";

}