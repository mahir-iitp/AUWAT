# Grocery Store System

## Customer Side
- **Homepage**: Browse categories (Fruits, Grains, Dairy, Vegetables)
- **Products**: View price, select quantity, add to cart
- **Cart**: Manage items, view total
- **Checkout**: Enter delivery details, COD payment only
- **Order Confirmation**: Get order ID

## Admin Side
- **Login**: Username: `admin`, Password: `admin123`
- **Orders**: View all orders with customer details and status
- **Products**: Add/Edit/Delete products with stock management
- **Status Updates**: Change order status (Pending → Packed → Delivered)
- **Export**: Download orders as CSV file
- **Delivery Notifications**: Auto-send WhatsApp/SMS to delivery boy on status change

## Delivery Side
- **Notifications**: WhatsApp/SMS alerts when orders are packed
- **Contact**: Delivery boy receives customer details and address
- **Future**: Mobile app for riders (accept orders, GPS navigation)

## Files Structure
```
├── index.html          # Customer homepage
├── checkout.html       # Customer checkout page
├── script.js          # Customer functionality
├── style.css          # Customer styles
├── admin.html         # Admin login
├── dashboard.html     # Admin dashboard
├── admin.js           # Admin functionality
├── admin.css          # Admin styles
├── delivery.html      # Delivery dashboard (future)
└── README.md          # This file
```

## How to Use
1. **Customer**: Open `index.html` → Browse → Add to cart → Checkout
2. **Admin**: Open `admin.html` → Login → Manage orders/products

## Demo Credentials
- Admin: `admin` / `admin123`

## Features
✅ Category-based product browsing
✅ Shopping cart with quantity management
✅ Cash on Delivery (COD) only
✅ Customer details saving
✅ Admin login system
✅ Real-time order management
✅ Product CRUD operations
✅ Order status tracking
✅ CSV export functionality
✅ Delivery notifications (WhatsApp/SMS simulation)
✅ Real-time admin-store sync
🔄 Delivery mobile app (future upgrade)