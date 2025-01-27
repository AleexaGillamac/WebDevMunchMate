let postContainer = document.querySelector('.card-container');
let cartItems = [];
const sideCart = document.querySelector('.side-cart');
const cartItemsList = document.querySelector('.side-cart-items');
const checkoutBtn = document.querySelector('.checkout-btn');
const clearCartBtn = document.querySelector('.clear-cart-btn');


const boxItems = document.querySelectorAll('.box-item');

        boxItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove the active class from all items
                boxItems.forEach(el => el.classList.remove('active'));

                // Add the active class to the clicked item
                item.classList.add('active');
            });
});


// Function to delete existing cards
function deletePrevCards() {
    postContainer.innerHTML = '';
}

// Function to create and display cards dynamically
function createCards(foodstallDataSet) {
    deletePrevCards();

    const fragment = document.createDocumentFragment();

    foodstallDataSet.forEach((data) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardImage = document.createElement('img');
        cardImage.src = data.image;
        cardImage.alt = data.heading;
        card.appendChild(cardImage);

        const cardTitle = document.createElement('h2');
        cardTitle.textContent = data.heading;
        card.appendChild(cardTitle);

        const cardBody = document.createElement('p');
        cardBody.textContent = '₱' + data.body;
        card.appendChild(cardBody);

        const cardRate = document.createElement('span');
        cardRate.textContent = data.rating;
        card.appendChild(cardRate);

        const cardStar = document.createElement('img');
        cardStar.src = data.span;
        cardStar.alt = 'Star';
        cardStar.style.width = '10px';
        cardStar.style.height = '10px';
        cardRate.appendChild(cardStar);

        const cartBtn = document.createElement('button');
        cartBtn.textContent = 'Add to Cart';
        cartBtn.classList.add('add-to-cart-btn');
        
        // Add event listener to the button
        cartBtn.addEventListener('click', () => {
            addToCart(data);
            toggleCart(); // Open cart on adding an item
        });

        card.appendChild(cartBtn);
        fragment.appendChild(card);
    });

    postContainer.appendChild(fragment);
}

// Function to add items to the cart
function addToCart(data) {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    cart.push({
        name: data.heading,
        price: parseFloat(data.body),
        image: data.image
    });
    localStorage.setItem('cartItems', JSON.stringify(cart));
    displayCart();
}

// Function to display cart items
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartItemsHtml = '';

    cart.forEach((item, index) => {
        cartItemsHtml += `
            <div class="cart-item-container">
                <input type="checkbox" id="item${index}" name="cartItem" value="${index}">
                <label for="item${index}">${item.name} - ₱${item.price.toFixed(2)}</label>
                <img class="cart-product-image" src="${item.image}" alt="${item.name}">
            </div>
        `;
    });

    cartItemsList.innerHTML = cartItemsHtml;
}

// Function to handle checkout
function checkout() {
    const selectedItems = [];
    const checkboxes = document.querySelectorAll('[name="cartItem"]:checked');

    checkboxes.forEach((checkbox) => {
        selectedItems.push(parseInt(checkbox.value));
    });

    if (selectedItems.length > 0) {
        displayTotal(selectedItems);
        removeItems(selectedItems);
    } else {
        alert('Please select at least one item to checkout.');
    }
}

// Function to calculate and display the total
function displayTotal(selectedItems) {
    const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    let total = 0;

    selectedItems.forEach(index => {
        total += cart[index].price;
    });

    alert(`Total amount to pay: ₱${total.toFixed(2)}`);
}

// Function to remove selected items from the cart
function removeItems(selectedItems) {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    selectedItems.sort((a, b) => b - a); // Remove in reverse order

    selectedItems.forEach(index => {
        cart.splice(index, 1);
    });

    localStorage.setItem('cartItems', JSON.stringify(cart));
    displayCart();
}

// Function to toggle cart visibility
function toggleCart() {
    sideCart.style.display = 'block';
}

// Attach event listeners for checkout and clear cart buttons
checkoutBtn.addEventListener('click', checkout);
clearCartBtn.addEventListener('click', () => {
    localStorage.removeItem('cartItems');
    displayCart();
});

// Example data for food stalls
const foodStalls = [
    {
        id: 'EliteCafe',
        data: [
          { heading: 'Mocha Milk Tea', body: '', price: '29', rating: '4.9', star: 'Images/Star1.png', 
               button: 'Images/Cart Button.png', image: 'Images/EliteCafePic/MochaMilkTea.png'},
          { heading: 'Strawberry Milk Tea', body: '', price:'29', rating: '4.9', star: 'Images/Star1.png', 
               button: 'Images/Cart Button.png', image: 'Images/EliteCafePic/StrawberryMilkTea.png' },
          { heading: 'Match Milk Tea', body: '29', rating: '4.9', star: 'Images/Star1.png', 
               button: 'Images/Cart Button.png', image: 'Images/EliteCafePic/MatchaMilkTea.png' },
          { heading: 'Chocolate Milk Tea', body: '29', rating: '4.9', star: 'Images/Star1.png', 
               button: 'Images/Cart Button.png', image: 'Images/EliteCafePic/ChocolateMilkTea.png' },
          { heading: 'Taro Milk Tea', body: '29', rating: '4.9', star: 'Images/Star1.png', 
               button: 'Images/Cart Button.png', image: 'Images/EliteCafePic/TaroMilkTea.png' },
          { heading: 'Mango Milk Tea', body: '29', rating: '4.9', star: 'Images/Star1.png', 
               button: 'Images/Cart Button.png', image: 'Images/EliteCafePic/MangoMilkTea.png' },

        ]

       
    },
    {
        id: 'McJolli',
        data: [
            { heading: 'Mango Graham Shake', body: 'Medium 12 oz', price:'29', rating: '4.8', span: 'star.png', 
                button: 'Images/Cart Button.png', image: 'Images/MachiMangoPic/MangoGrahamShake45.png' },
            { heading: 'Mango Graham Shake', body: 'Medium 16 oz', price:'55', rating: '4.6', span: 'star.png',  
                button: 'Images/Cart Button.png',image: 'fruit_salad.png' }
        ]
    },
    {
        id: 'MachiMango',
        data: [
            { heading: 'Cheese Burger', body: '', price:'25', rating: '4.8', span: 'star.png', 
                button: 'Images/Cart Button.png', image: 'Images/MachiMangoPic/MangoGrahamShake45.png' },
            { heading: 'Egg Burger', body: '', price:'55', rating: '4.6', span: 'star.png',  
                button: 'Images/Cart Button.png',image: 'fruit_salad.png' }
        ]
    }
];

// Attach event listeners to food stall images
foodStalls.forEach(stall => {
    const element = document.getElementById(stall.id);
    if (element) {
        element.addEventListener('click', () => {
            createCards(stall.data);
        });
    } else {
        console.warn(`Element with ID "${stall.id}" not found.`);
    }
});

// Display cart items on page load
window.onload = () => {
    displayCart();
};