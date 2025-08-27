# 🗄️ Database Setup Guide

## Quick Setup (Recommended)

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start **Apache** and **MySQL** services

2. **Auto Setup**
   - Go to: `http://localhost/registration_system/setup_database.php`
   - Click "Setup Database" button
   - Done! Database is ready

## Manual Setup (Alternative)

1. **Open phpMyAdmin**
   - Go to: `http://localhost/phpmyadmin`
   - Login (usually no password needed)

2. **Import SQL File**
   - Click "Import" tab
   - Choose file: `database_setup.sql`
   - Click "Go"

## Database Details

**Database Name:** `grocery_store`

**Tables Created:**
- `products` - Store items with price, stock, category
- `orders` - Customer orders with details
- `order_items` - Individual items in each order
- `admin_users` - Admin login credentials

**Default Admin:**
- Username: `admin`
- Password: `admin123`

**Sample Data:**
- 6 products across all categories
- Ready to use immediately

## Configuration

**Database Settings** (in `config.php`):
```php
DB_HOST = 'localhost'
DB_USER = 'root'
DB_PASS = ''
DB_NAME = 'grocery_store'
```

## Troubleshooting

**MySQL not starting?**
- Check if port 3306 is free
- Restart XAMPP as administrator

**Connection failed?**
- Verify MySQL service is running
- Check database credentials in `config.php`

**Import failed?**
- Use phpMyAdmin import instead
- Check file permissions

## Next Steps

After database setup:
1. Go to `index.html` - Customer store
2. Go to `admin.html` - Admin panel
3. All data will now be stored in MySQL instead of localStorage