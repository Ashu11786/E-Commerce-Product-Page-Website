document.addEventListener("DOMContentLoaded",function (){

    // Load cart from local storage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const orderDetails = document.getElementById("order-details");

    // Check if cart is empty
    if(cart.length === 0){
        cartItemsContainer.innerHTML = "<p>Your Cart is empty.</p>";
        return;
    }
    // Clear order details to prevent duplication on refresh
    orderDetails.innerHTML = "";

    cart.forEach(item => {
        // Create cart item HTML    
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        cartItem.innerHTML = `
            <img src="/flower_images/${item.name.replace(/ /g, '').toLowerCase()}.jpg" alt="${item.name}">
            <div class="details">
                <h3>${item.name}</h3>
                <p class="price">&#8377;${item.price.toFixed(2)}</p>
                <input type="number" class="quantity" value="${item.quantity}" min="1">
            </div>
            <button class="remove-btn">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);

        // Update order details for each product
        const itemTotal = item.price * item.quantity;

        const itemDetail = document.createElement("div");
        itemDetail.classList.add("price-detail");
        itemDetail.innerHTML = `
            <span>${item.name}: &#8377;${item.price.toFixed(2)} x ${item.quantity} = &#8377;${itemTotal.toFixed(2)}</span>
        `;
        orderDetails.appendChild(itemDetail);
    });

    updateSubtotal();

    // Quantity input event listener
    const quantityInputs =  document.querySelectorAll(".quantity");
    quantityInputs.forEach(input => {
        input.addEventListener("change",function(){
            updateSubtotal();
            // Update local storage if quantity changes
            const index = Array.from(quantityInputs).indexOf(input);
            cart[index].quantity = parseInt(input.value);
            localStorage.setItem("cart", JSON.stringify(cart));
        });
    });

    // Remove item event listener
    const removeButtons = document.querySelectorAll(".remove-btn");
    removeButtons.forEach(button => {
        button.addEventListener("click",function(){
            const index = Array.from(removeButtons).indexOf(button);
            cart.splice(index, 1); // Remove item from cart array
            localStorage.setItem("cart", JSON.stringify(cart)); // Update local storage
            location.reload(); 
        });
    });
});

function updateSubtotal() {
    const cartItems = document.querySelectorAll(".cart-item");
    let subtotal = 0;
    

    cartItems.forEach(item=>{
        const priceElement = item.querySelector(".price");
        const quantityInput =item.querySelector(".quantity");

        const price = parseFloat(priceElement.textContent.replace("₹",""));
        const quantity = parseInt(quantityInput.value);

        subtotal += (price*quantity);

    });

    document.getElementById("subtotal").textContent = "₹" + subtotal.toFixed(2);
}