# Pro Gear Server: Backend API for Sports Equipment Store

This is the Express-based server for **Pro Gear**, handling authentication, equipment CRUD operations, and sorting/filtering logic using MongoDB and Mongoose.

## 🛠️ Features

- 🧩 RESTful API with Express.js
- 🔐 JWT Token-based route protection
- 🌐 MongoDB database connection with Mongoose
- 📥 POST, GET, PATCH, DELETE routes for equipment management
- 🔎 Server-side sorting and filtering based on price
- 🔒 Environment variables to protect sensitive credentials

## 🧪 Available Endpoints

- `POST /equipment` - Add new equipment
- `GET /equipment` - Get all equipment
- `GET /equipment/:id` - Get single item details
- `PATCH /equipment/:id` - Update an item
- `DELETE /equipment/:id` - Delete an item
- `GET /my-equipment?email=` - Get user-specific items

## 🌐 Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## 🔐 Environment Variables (add in `.env` file)

## 📦 Deployment

- Server hosted on Vercel
- MongoDB Atlas for database

## 🧑‍💻 Developer

Developed by [Mehedi Hasan]  
📫 Contact: mhasan2999@gmail.com  
