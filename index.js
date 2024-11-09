
function toggleMenu() {
    const navbarLinks = document.querySelector('.nav-links');
    navbarLinks.classList.toggle('active');
}

// Function to increase quantity
function increaseQuantity() {
    let quantity = document.getElementById("quantity");
    quantity.value = parseInt(quantity.value) + 1;
}

// Function to decrease quantity
function decreaseQuantity() {
    let quantity = document.getElementById("quantity");
    if (quantity.value > 1) {
        quantity.value = parseInt(quantity.value) - 1;
    }
}

// Add Slider Bar for sliding flower images

const images = document.querySelectorAll('.carousel-img img');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
let currentIndex = 0;

// Function to update displayed image
function showImage(index) {
  images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

// Event listeners for buttons
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
});

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
});

// Initial display
showImage(currentIndex);

// Alert when item is added in cart
document.querySelectorAll('.btn-add-cart').forEach(button => {
    button.addEventListener('click', () => {
        alert(`${productName} has been added to your cart.`);
    });
});

//Adding cart function

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, ProductPrice) {
    // check if item already exist in the cart 
    try {
        const existingItem = cart.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                name: productName,
                price: parseFloat(ProductPrice),
                quantity: 1
            });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart(); // Update the cart count display
    } catch (error) {
        console.error("Error adding to cart: ", error);
        alert("There was an error adding the item to your cart. Please try again.");
    }
}

// Update cart display (If there's cart count)
function updateCart() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    }
}

// Add functionality to add to cart button by using event delegation
document.querySelector(".products-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-cart")) {
        const product = e.target.closest(".product");
        const productName = product.getAttribute("data-name");
        const ProductPrice = product.getAttribute("data-price");
        addToCart(productName, ProductPrice);
        alert('Added to cart!');

    }
});





