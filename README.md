# E-Commerce Web Application

A full-stack e-commerce web application built with Next.js (React) frontend and Express.js backend.

## Features

### Backend (Express.js)

- RESTful API for products, cart, and orders
- Product management (CRUD operations)
- Shopping cart functionality
- Order processing
- CORS enabled for cross-origin requests
- Sample product data included

### Frontend (Next.js/React)

- Modern, responsive UI design
- Product catalog display
- Shopping cart with add/remove functionality
- Real-time cart updates
- Order placement
- Mobile-responsive design

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Add new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart

- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Orders

- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID

### Health Check

- `GET /api/health` - Server health check

## Project Structure

```
e-commerce-web/
├── client/                 # Next.js frontend
│   ├── src/
│   │   └── app/
│   │       ├── page.js     # Main e-commerce page
│   │       ├── layout.js   # App layout
│   │       ├── page.module.css  # Styles
│   │       └── globals.css # Global styles
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── next.config.mjs     # Next.js configuration
├── server/                 # Express.js backend
│   ├── index.js           # Main server file
│   └── package.json       # Backend dependencies
├── package.json           # Root package.json for scripts
└── README.md              # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install all dependencies**

   ```bash
   npm run install:all
   ```

   Or install manually:

   ```bash
   # Install root dependencies
   npm install

   # Install server dependencies
   cd server && npm install

   # Install client dependencies
   cd ../client && npm install
   ```

### Running the Application

1. **Development Mode (runs both client and server)**

   ```bash
   npm run dev
   ```

   This will start:

   - Backend server on http://localhost:5000
   - Frontend application on http://localhost:3000

2. **Run individually**

   ```bash
   # Run server only
   npm run server:dev

   # Run client only (in another terminal)
   npm run client:dev
   ```

3. **Production Mode**

   ```bash
   # Build the client
   npm run build

   # Start both server and client
   npm start
   ```

### Server Endpoints

The backend API is available at `http://localhost:5000/api`

### Sample Data

The application comes with sample products:

- Laptop ($999.99)
- Smartphone ($699.99)
- Running Shoes ($129.99)

## Usage

1. **Browse Products**: View the product catalog on the homepage
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the cart button in the header
4. **Place Order**: In the cart modal, click "Place Order"
5. **Manage Products**: Use the API endpoints to add/edit/delete products

## Technologies Used

### Backend

- Express.js - Web framework
- CORS - Cross-origin resource sharing
- Node.js - Runtime environment

### Frontend

- Next.js 15.3.3 - React framework
- React 19.0.0 - UI library
- CSS Modules - Styling
- Modern responsive design

### Development Tools

- Concurrently - Run multiple commands simultaneously
- npm scripts for workflow management

## Configuration

### Backend Configuration

- Default port: 5000
- Can be changed via `PORT` environment variable

### Frontend Configuration

- Next.js configuration in `client/next.config.mjs`
- Turbopack enabled for faster development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the changes
5. Submit a pull request

## Future Enhancements

- User authentication and authorization
- Payment gateway integration
- Product search and filtering
- Product categories and tags
- User reviews and ratings
- Admin dashboard
- Database integration (MongoDB/PostgreSQL)
- Image upload functionality
- Email notifications
- Inventory management

## License

This project is open source and available under the [ISC License](LICENSE).
