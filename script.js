function getProducts() {
    const adminProducts = JSON.parse(localStorage.getItem('admin_products') || '[]');
    const products = { fruits: [], grains: [], dairy: [], vegetables: [] };
    
    adminProducts.forEach(product => {
        if (products[product.category]) {
            products[product.category].push(product);
        }
    });
    
    return products;
}

let cart = [];
let quantities = {};

function showCategory(category) {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';
    
    const products = getProducts();
    
    if (!products[category] || products[category].length === 0) {
        productsDiv.innerHTML = '<p style="text-align: center; padding: 2rem;">No products available in this category</p>';
        return;
    }
    
    products[category].forEach(product => {
        quantities[product.id] = quantities[product.id] || 1;
        
        productsDiv.innerHTML += `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">₹${product.price}/kg</div>
                <div class="quantity-controls">
                    <button onclick="changeQuantity(${product.id}, -1)">-</button>
                    <span id="qty-${product.id}">${quantities[product.id]}</span>
                    <button onclick="changeQuantity(${product.id}, 1)">+</button>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
    });
}

function changeQuantity(productId, change) {
    quantities[productId] = Math.max(1, quantities[productId] + change);
    document.getElementById(`qty-${productId}`).textContent = quantities[productId];
}

function addToCart(productId) {
    const product = findProduct(productId);
    const quantity = quantities[productId];
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({...product, quantity});
    }
    
    updateCartDisplay();
}

function findProduct(id) {
    const products = getProducts();
    for (let category in products) {
        const product = products[category].find(p => p.id == id);
        if (product) return product;
    }
}

function updateCartDisplay() {
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ₹${item.price} × ${item.quantity}
                </div>
                <div>
                    ₹${itemTotal}
                    <button onclick="removeFromCart(${item.id})" style="margin-left: 10px; background: #e74c3c; color: white; border: none; padding: 2px 6px; border-radius: 3px;">×</button>
                </div>
            </div>
        `;
    });
    
    document.getElementById('total').textContent = total;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function showCart() {
    document.getElementById('cart').classList.remove('hidden');
}

function hideCart() {
    document.getElementById('cart').classList.add('hidden');
}

function checkout() {
    if (cart.length === 0) {
        alert('Cart is empty!');
        return;
    }
    
    // Store cart in localStorage for checkout page
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'checkout.html';
}

// Initialize with default products if none exist
if (!localStorage.getItem('admin_products')) {
    const defaultProducts = [
        {id: 1, name: 'Apple', category: 'fruits', price: 120, stock: 50, image: 'https://via.placeholder.com/150?text=Apple'},
        {id: 2, name: 'Banana', category: 'fruits', price: 60, stock: 30, image: 'https://via.placeholder.com/150?text=Banana'},
        {id: 3, name: 'Rice', category: 'grains', price: 50, stock: 100, image: 'https://via.placeholder.com/150?text=Rice'},
        {id: 4, name: 'Milk', category: 'dairy', price: 25, stock: 20, image: 'https://via.placeholder.com/150?text=Milk'}
    ];
    localStorage.setItem('admin_products', JSON.stringify(defaultProducts));
}

// Listen for product updates from admin
window.addEventListener('storage', function(e) {
    if (e.key === 'admin_products') {
        // Refresh current category view
        const activeCategory = document.querySelector('.categories button:hover') || 
                              document.querySelector('.categories button');
        if (activeCategory) {
            const category = activeCategory.textContent.toLowerCase().includes('fruit') ? 'fruits' :
                           activeCategory.textContent.toLowerCase().includes('grain') ? 'grains' :
                           activeCategory.textContent.toLowerCase().includes('dairy') ? 'dairy' : 'vegetables';
            showCategory(category);
        }
    }
});

// Show fruits by default
showCategory('fruits');