# 🛒 BlinkCart - Full Stack E-commerce Application

A modern, full-featured e-commerce platform built with Next.js 15, featuring real-time cart management, secure authentication, and seamless order processing.

![BlinkCart Logo](./assets/logo.svg)

## ✨ Features

### 🛍️ **Customer Features**

- **Product Browsing**: Browse through a wide range of products with detailed views
- **Smart Cart Management**: Real-time cart updates with persistent storage
- **Secure Checkout**: Complete order placement with address management
- **Order Tracking**: View order history and track order status
- **User Authentication**: Secure login/signup with Clerk authentication
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🏪 **Seller Features**

- **Product Management**: Add, edit, and manage product listings
- **Order Management**: View and process customer orders
- **Dashboard Analytics**: Track sales and product performance
- **Image Upload**: Cloudinary integration for product images

### 🎨 **UI/UX Features**

- **Modern Blue Theme**: Professional and clean design
- **Lightning-Fast Performance**: Optimized with Next.js 15 and Turbopack
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading experiences throughout the app

## 🚀 Tech Stack

### **Frontend**

- **Next.js 15.3.2** - React framework with App Router
- **React 19** - Latest React features and hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Turbopack** - Ultra-fast bundler for development

### **Backend**

- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database for data storage
- **Mongoose 8.15.0** - MongoDB object modeling

### **Authentication & Security**

- **Clerk** - Complete authentication solution
- **JWT Tokens** - Secure API authentication
- **Middleware Protection** - Route-level security

### **External Services**

- **Cloudinary** - Image upload and optimization
- **Inngest** - Background job processing
- **Vercel** - Deployment and hosting

### **Development Tools**

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Git** - Version control

## 📦 Installation & Setup

### **Prerequisites**

- Node.js 18+
- MongoDB database
- Cloudinary account
- Clerk account

### **1. Clone the Repository**

```bash
git clone https://github.com/NeelB28/FullStackExam_NeelBuddhdev_25_05_2025.git
cd FullStackExam_NeelBuddhdev_25052025
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Setup**

Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# App Configuration
NEXT_PUBLIC_CURRENCY=$
```

### **4. Run the Application**

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The application will be available at `http://localhost:3000`

## 🗂️ Project Structure

```
BlinkCart/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── cart/         # Cart management
│   │   ├── order/        # Order processing
│   │   ├── product/      # Product CRUD
│   │   └── user/         # User management
│   ├── cart/             # Cart page
│   ├── my-orders/        # Order history
│   ├── product/          # Product details
│   └── seller/           # Seller dashboard
├── components/            # Reusable components
│   ├── seller/           # Seller-specific components
│   ├── Banner.jsx        # Hero banner
│   ├── FeaturedProduct.jsx
│   ├── HeaderSlider.jsx  # Image carousel
│   ├── Navbar.jsx        # Navigation
│   └── OrderSummary.jsx  # Checkout component
├── config/               # Configuration files
│   ├── db.js            # Database connection
│   └── inngest.js       # Background jobs
├── context/              # React Context
│   └── AppContext.jsx   # Global state management
├── models/               # Database models
│   ├── User.js          # User schema
│   ├── Product.js       # Product schema
│   ├── Order.js         # Order schema
│   └── Address.js       # Address schema
├── assets/               # Static assets
│   └── logo.svg         # BlinkCart logo
└── public/               # Public files
```

## 🔧 API Endpoints

### **Products**

- `GET /api/product/list` - Get all products
- `POST /api/product/add` - Add new product (Seller only)
- `GET /api/product/seller-list` - Get seller's products

### **Cart**

- `GET /api/cart/get` - Get user's cart
- `POST /api/cart/update` - Update cart items

### **Orders**

- `POST /api/order/create` - Create new order
- `GET /api/order/list` - Get user's orders

### **User**

- `GET /api/user/data` - Get user profile
- `POST /api/user/add-address` - Add shipping address
- `GET /api/user/get-address` - Get user addresses

## 🎯 Key Features Implementation

### **Real-time Cart Management**

- Persistent cart storage in MongoDB
- Optimistic UI updates
- Automatic cart synchronization

### **Order Processing**

- Direct database order creation
- Background processing with Inngest
- Order status tracking

### **Image Upload**

- Cloudinary integration
- Multiple image support
- Automatic optimization

### **Authentication Flow**

- Clerk-powered authentication
- Role-based access (Customer/Seller)
- Protected routes and API endpoints

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the main branch.

**Live URL**: https://full-stack-exam-neel-buddhdev-25-05-2025-82r3.vercel.app/

### **Deployment Steps**

1. Connect repository to Vercel
2. Configure environment variables
3. Deploy with automatic builds

## 👨‍💻 Developer

**Neel Buddhdev**

- GitHub: [@NeelB28](https://github.com/NeelB28)
- Project: Full Stack E-commerce Exam
- Date: May 25, 2025

## 📄 License

This project is created for educational purposes as part of a full-stack development examination.

## 🤝 Contributing

This is an examination project. For any questions or suggestions, please contact the developer.

---

**Built with ❤️ using Next.js 15 and modern web technologies**
