-- Create database
CREATE DATABASE IF NOT EXISTS grocery_store;
USE grocery_store;

-- Products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category ENUM('fruits', 'vegetables', 'grains', 'dairy') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id VARCHAR(20) PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(15) NOT NULL,
    customer_address TEXT NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('Pending', 'Packed', 'Delivered') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(20),
    product_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Admin users table
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO admin_users (username, password) VALUES ('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Insert sample products
INSERT INTO products (name, category, price, stock, image) VALUES
('Apple', 'fruits', 120.00, 50, 'https://via.placeholder.com/150?text=Apple'),
('Banana', 'fruits', 60.00, 30, 'https://via.placeholder.com/150?text=Banana'),
('Rice', 'grains', 50.00, 100, 'https://via.placeholder.com/150?text=Rice'),
('Milk', 'dairy', 25.00, 20, 'https://via.placeholder.com/150?text=Milk'),
('Tomato', 'vegetables', 40.00, 25, 'https://via.placeholder.com/150?text=Tomato'),
('Onion', 'vegetables', 35.00, 40, 'https://via.placeholder.com/150?text=Onion');