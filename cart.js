// Function to display cart items
function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsHtml = '';

    cart.forEach((item, index) => {
        cartItemsHtml += `
            <div class="cart-item-container">
                <input type="checkbox" id="item${index}" name="cartItem" value="${index}">
                <label for="item${index}">${item.name} - $${item.price.toFixed(2)}</label>
                <img class="cart-product-image" src="${item.image || 'default-image.png'}" alt="Product Image">
            </div>
        `;
    });

    document.getElementById('cart-items').innerHTML = cartItemsHtml;
}

// Function to calculate and display total amount
function displayTotal(selectedItems) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    selectedItems.forEach(index => {
        let item = cart[index];
        total += item.price;
    });

    alert(`Total amount to pay: $${total.toFixed(2)}`);
}

// Function to remove selected items from cart
function removeItems(selectedItems) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    selectedItems.sort((a, b) => b - a); // Sort indices in descending order

    selectedItems.forEach(index => {
        cart.splice(index, 1);
    });

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// Function to handle checkout
function checkout() {
    let selectedItems = [];
    let checkboxes = Array.from(document.getElementsByName('cartItem')); // Ensure compatibility

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedItems.push(parseInt(checkbox.value));
        }
    });

    if (selectedItems.length > 0) {
        displayTotal(selectedItems);
        removeItems(selectedItems);
    } else {
        alert('Please select at least one item to checkout.');
    }
}

// Call the displayCart function when the page loads
window.onload = () => {
    displayCart();
};