// ===================================
// NOVA SHOP - PRODUCT LIST
// ===================================

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 850,
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 1200,
        icon: "⌚"
    },
    {
        id: 3,
        name: "Casual Backpack",
        price: 650,
        icon: "🎒"
    },
    {
        id: 4,
        name: "Sneakers",
        price: 1500,
        icon: "👟"
    },
    {
        id: 5,
        name: "Sunglasses",
        price: 450,
        icon: "🕶️"
    },
    {
        id: 6,
        name: "Wrist Watch",
        price: 950,
        icon: "⌚"
    }
];

// ===================================
// SHOPPING CART
// ===================================

let cart = [];

// ===================================
// FORMAT PRICE
// ===================================

function formatPrice(price) {
    return "₱" + price.toLocaleString("en-PH");
}

// ===================================
// DISPLAY PRODUCTS
// ===================================

function displayProducts() {

    const productList =
        document.getElementById("product-list");

    productList.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-icon">
                ${product.icon}
            </div>

            <h3>${product.name}</h3>

            <p class="price">
                ${formatPrice(product.price)}
            </p>

            <button onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;

        productList.appendChild(card);

    });

}

// ===================================
// ADD PRODUCT TO CART
// ===================================

function addToCart(id) {

    const product = products.find(
        item => item.id === id
    );

    if (!product) return;

    const cartItem = cart.find(
        item => item.id === id
    );

    if (cartItem) {

        cartItem.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    displayCart();

}

// ===================================
// DISPLAY SHOPPING CART
// ===================================

function displayCart() {

    const cartItems =
        document.getElementById("cart-items");

    const totalDisplay =
        document.getElementById("total");

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.textContent =
            "Your cart is empty.";

    }

    cart.forEach(item => {

        const subtotal =
            item.price * item.quantity;

        total += subtotal;

        const row =
            document.createElement("div");

        row.className = "cart-item";

        const details =
            document.createElement("span");

        details.textContent =
            `${item.icon} ${item.name} x ${item.quantity} - ${formatPrice(subtotal)}`;

        const removeButton =
            document.createElement("button");

        removeButton.className = "remove-btn";

        removeButton.textContent = "Remove";

        removeButton.onclick = () => {

            removeFromCart(item.id);

        };

        row.appendChild(details);

        row.appendChild(removeButton);

        cartItems.appendChild(row);

    });

    // Display total price
    totalDisplay.textContent =
        `Total: ${formatPrice(total)}`;

}

// ===================================
// REMOVE PRODUCT FROM CART
// ===================================

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    displayCart();

}

// ===================================
// CHECKOUT
// ===================================

function checkout() {

    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

        return;

    }

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    alert(
        "Thank you for shopping at Nova Shop!\n" +
        "Your total is " + formatPrice(total) +
        "\nThis is a school project checkout demo."
    );

    // Clear shopping cart
    cart = [];

    displayCart();

}

// ===================================
// START WEBSITE
// ===================================

displayProducts();

displayCart();