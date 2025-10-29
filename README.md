# Vibe Commerce - Mock E-Com Cart

This is a full-stack e-commerce shopping cart application built for the Vibe Commerce internship screening. It features a React frontend, a Node.js/Express backend, and a MongoDB database.

---

## 📸 Application Screenshots

**Main Products Page:**



**Cart & Checkout:**
_(Drag your screenshot of the cart with items in it here)_

**Checkout Receipt:**
_(Drag your screenshot of the successful receipt modal here)_

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
git clone [https://github.com/your-username/vibe-commerce-assignment.git](https://github.com/your-username/vibe-commerce-assignment.git)
cd vibe-commerce-assignment
```
