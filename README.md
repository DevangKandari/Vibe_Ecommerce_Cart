# Vibe Commerce - Mock E-Com Cart

This is a full-stack e-commerce shopping cart application built for the Vibe Commerce internship screening. It features a React frontend, a Node.js/Express backend, and a MongoDB database.

---

## 📸 Application Screenshots

**Main Products Page:**

<img width="1901" height="911" alt="image" src="https://github.com/user-attachments/assets/3ac2356b-5c43-47bd-a1eb-3980cce8b008" />


**Cart & Checkout:**

<img width="1899" height="911" alt="image" src="https://github.com/user-attachments/assets/0b1a6731-ef6f-4a31-829f-59fad933c4cc" />


**Checkout Receipt:**

<img width="1901" height="910" alt="image" src="https://github.com/user-attachments/assets/efd73a5d-26d3-43e9-8a80-21030f3de37f" />


---

## 🚀 Features

- **Dynamic Product Seeding:** On server start, the database is cleared and seeded with 10 products from the [Fake Store API](https://fakestoreapi.com/).
- **Full Cart Functionality:** Add items to the cart from the product grid.
- **Quantity Control:** Update item quantities (increment/decrement) from both the product grid and the cart sidebar.
- **Persistent Cart:** All cart items are stored in the MongoDB database.
- **Persistent Orders:** On checkout, the cart is saved as a new "Order" in the database, including customer details.
- **Add New Products:** A modal allows for adding new products, which appear on the grid instantly.
- **Responsive UI:** Built with Tailwind CSS for a clean and simple mobile-friendly experience.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (with Mongoose)
- **API Client:** Axios (for fetching from Fake Store API)

---

## ⚙️ Setup and Run Instructions

To run this project locally, follow these steps:

### Prerequisites

- Node.js
- Git
- MongoDB Atlas Account (for the connection string)

### 1. Clone & Install

```bash
# 1. Clone the repository
git clone https://github.com/DevangKandari/Vibe_Ecommerce_Cart.git
cd vibe-commerce-assignment
```

# 2. Go to the backend folder and install dependencies
cd backend
npm install

# 3. Create a .env file in the /backend folder
#    and add your MongoDB string and a port:
PORT=5001
MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING_HERE

# 4. Start the backend server
npm start
# Server will be running on http://localhost:5001

# 5. Open a new terminal and go to the frontend folder
cd frontend
npm install

# 6. Start the frontend development server
npm run dev
# App will open on http://localhost:5173 (or similar)


# 7. Here is the demo video of the featured implemented in the project.

https://www.loom.com/share/9bee3adc00054087b0aa1bdcf47c2a27
