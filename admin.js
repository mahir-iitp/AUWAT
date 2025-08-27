// Check if admin is logged in
if (!localStorage.getItem('admin_logged_in')) {
    window.location.href = 'admin.html';
}

// Sample data
let orders = JSON.parse(localStorage.getItem('orders') || '[]');
let products = JSON.parse(localStorage.getItem('admin_products') || `[
    {id: 1, name: 'Apple', category: 'fruits', price: 120, stock: 50, image: 'https://via.placeholder.com/150?text=Apple'},
    {id: 2, name: 'Banana', category: 'fruits', price: 60, stock: 30, image: 'https://via.placeholder.com/150?text=Banana'},
    {id: 3, name: 'Rice', category: 'grains', price: 50, stock: 100, image: 'https://via.placeholder.com/150?text=Rice'},
    {id: 4, name: 'Milk', category: 'dairy', price: 25, stock: 20, image: 'https://via.placeholder.com/150?text=Milk'}
]`);

function showSection(section) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    
    // Remove active class from all links
    document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
    
    // Show selected section
    document.getElementById(section + '-section').classList.remove('hidden');
    
    // Add active class to clicked link
    event.target.classList.add('active');
    
    // Update page title
    const titles = {
        'orders': 'Orders Management',
        'products': 'Products Management', 
        'add-product': 'Add/Edit Product'
    };
    document.getElementById('page-title').textContent = titles[section];
    
    // Load data for the section
    if (section === 'orders') loadOrders();
    if (section === 'products') loadProducts();
}

function loadOrders() {
    const tbody = document.getElementById('orders-table');
    tbody.innerHTML = '';
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No orders yet</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const itemsList = order.items.map(item => `${item.name} (${item.quantity})`).join(', ');
        tbody.innerHTML += `
            <tr>
                <td>${order.id}</td>
                <td>${order.customer.name}</td>
                <td>${order.customer.phone}</td>
                <td>${order.customer.address}</td>
                <td>${itemsList}</td>
                <td>₹${order.total}</td>
                <td><span class="status-${order.status.toLowerCase()}">${order.status}</span></td>
                <td>
                    <select onchange="updateOrderStatus('${order.id}', this.value)">
                        <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Packed" ${order.status === 'Packed' ? 'selected' : ''}>Packed</option>
                        <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                </td>
            </tr>
        `;
    });
}

function loadProducts() {
    const tbody = document.getElementById('products-table');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        tbody.innerHTML += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>₹${product.price}</td>
                <td>${product.stock} kg</td>
                <td>
                    <button class="btn btn-primary" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const oldStatus = order.status;
        order.status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Send delivery notification
        if (oldStatus !== newStatus) {
            sendDeliveryNotification(order, newStatus);
        }
        
        loadOrders();
    }
}

function sendDeliveryNotification(order, status) {
    const deliveryBoy = getDeliveryBoy();
    const message = getNotificationMessage(order, status);
    
    // Show notification popup
    showNotificationPopup(message, deliveryBoy);
    
    // Log notification (in real app, this would send actual SMS/WhatsApp)
    console.log(`Notification sent to ${deliveryBoy.name} (${deliveryBoy.phone}): ${message}`);
}

function getDeliveryBoy() {
    // Simple delivery boy assignment (in real app, use proper logic)
    return {
        name: 'Raj Kumar',
        phone: '+91-9876543210',
        whatsapp: '+91-9876543210'
    };
}

function getNotificationMessage(order, status) {
    const messages = {
        'Packed': `🚚 NEW DELIVERY: Order ${order.id} is packed and ready for pickup. Customer: ${order.customer.name}, Phone: ${order.customer.phone}, Address: ${order.customer.address}`,
        'Delivered': `✅ Order ${order.id} marked as delivered. Please confirm completion.`
    };
    return messages[status] || `📦 Order ${order.id} status updated to ${status}`;
}

function showNotificationPopup(message, deliveryBoy) {
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        background: #27ae60; color: white; padding: 1rem;
        border-radius: 8px; max-width: 400px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    popup.innerHTML = `
        <h4>📱 Delivery Notification Sent</h4>
        <p><strong>To:</strong> ${deliveryBoy.name} (${deliveryBoy.phone})</p>
        <p><strong>Message:</strong> ${message}</p>
        <button onclick="this.parentElement.remove()" style="background: white; color: #27ae60; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; margin-top: 0.5rem;">Close</button>
    `;
    document.body.appendChild(popup);
    
    // Auto remove after 8 seconds
    setTimeout(() => popup.remove(), 8000);
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-image').value = product.image;
        document.getElementById('form-title').textContent = 'Edit Product';
        showSection('add-product');
    }
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== productId);
        localStorage.setItem('admin_products', JSON.stringify(products));
        loadProducts();
    }
}

function resetForm() {
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    document.getElementById('form-title').textContent = 'Add New Product';
}

function downloadOrders() {
    if (orders.length === 0) {
        alert('No orders to download');
        return;
    }
    
    let csv = 'Order ID,Customer Name,Phone,Address,Items,Total,Status,Date\n';
    
    orders.forEach(order => {
        const items = order.items.map(item => `${item.name}(${item.quantity})`).join(';');
        csv += `${order.id},"${order.customer.name}","${order.customer.phone}","${order.customer.address}","${items}",${order.total},${order.status},${order.date}\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function logout() {
    localStorage.removeItem('admin_logged_in');
    window.location.href = 'admin.html';
}

// Product form submission
document.getElementById('product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const productId = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value.trim();
    const price = parseInt(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value);
    
    if (!name || price <= 0 || stock < 0) {
        alert('Please fill all fields with valid values');
        return;
    }
    
    const productData = {
        name: name,
        category: document.getElementById('product-category').value,
        price: price,
        stock: stock,
        image: document.getElementById('product-image').value || `https://via.placeholder.com/150?text=${name}`
    };
    
    if (productId) {
        // Edit existing product
        const index = products.findIndex(p => p.id == productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
        }
    } else {
        // Add new product
        const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        products.push({ id: newId, ...productData });
    }
    
    localStorage.setItem('admin_products', JSON.stringify(products));
    
    // Trigger storage event for real-time sync
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'admin_products',
        newValue: JSON.stringify(products)
    }));
    
    alert('Product saved successfully!');
    resetForm();
    loadProducts();
});

// Generate sample orders for demo
if (orders.length === 0) {
    orders = [
        {
            id: 'ORD' + Date.now(),
            customer: { name: 'John Doe', phone: '9876543210', address: '123 Main St, City' },
            items: [{ name: 'Apple', quantity: 2, price: 120 }, { name: 'Milk', quantity: 1, price: 25 }],
            total: 265,
            status: 'Pending',
            date: new Date().toLocaleDateString()
        }
    ];
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Load orders by default
loadOrders();