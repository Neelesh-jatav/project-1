// Function to toggle the dropdown menu
function toggleMenu() {
  const dropdown = document.getElementById('menu-dropdown');
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

// Close the menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.menu-btn')) {
    const dropdown = document.getElementById('menu-dropdown');
    if (dropdown.style.display === 'block') {
      dropdown.style.display = 'none';
    }
  }
};
// --------------------
// Redirect to home page on "Home" link click
document.getElementById('home-link').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default anchor behavior
  window.location.href = 'http://127.0.0.1:3000/frontend/'; // Redirect to the home page
});
// ------------------------
// frontend/app.js

let cart = [];

// Fetch products from the server
async function fetchProducts() {
  const response = await fetch('http://localhost:5000/api/products');
  const products = await response.json();
  displayProducts(products);
}

// Display products on the page
function displayProducts(products) {
  const productList = document.getElementById('product-list');
  products.forEach(product => {
    const productEl = document.createElement('div');
    productEl.classList.add('product');
    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}" width="50">
      <span>${product.name}</span>
      <span>$${product.price.toFixed(2)}</span>
      <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})">Add to Cart</button>
    `;
    productList.appendChild(productEl);
  });
}

// Add an item to the cart
function addToCart(id, name, price) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  displayCart();
}

// Display cart items and total
function displayCart() {
  const cartItems = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemEl = document.createElement('li');
    itemEl.classList.add('cart-item');
    itemEl.innerHTML = `
      ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartItems.appendChild(itemEl);
  });

  totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

// Remove an item from the cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  displayCart();
}

// Handle checkout
async function checkout() {
  const response = await fetch('http://localhost:5000/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items: cart })
  });
  const result = await response.json();
  if (result.success) {
    alert(result.message);
    cart = [];
    displayCart();
  } else {
    alert(result.message);
  }
}

// Initialize product display
fetchProducts();
