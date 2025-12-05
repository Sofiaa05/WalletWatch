
# WalletWatch — Personal Finance Tracker

WalletWatch is a full-stack personal finance management application that helps users track income and expenses, set monthly budgets, analyze spending patterns, and receive AI-powered financial insights. It provides an intuitive dashboard and automated notifications to help users make better financial decisions.

---

## Features

### Authentication

* Secure user registration and login using JSON Web Tokens (JWT)
* Protected backend routes for authorized users only

### Income & Expense Management

* Add, view, and delete income and expense entries
* Categorize transactions based on type
* Filter records by category and date for quick analysis

### Visual Analytics

* Interactive charts powered by Chart.js
* Category-wise and monthly spending visualization

### Budget Management

* Set a monthly budget for expenses
* System automatically monitors spending progress
* Automated email alerts sent when the budget limit is exceeded using Nodemailer

### Data Export

* Download expense or income records as Excel (.xlsx) files using XLSX

### AI-Powered Spending Summaries

* Generates personalized monthly spending summaries using the OpenAI API
* Helps users understand spending habits and suggests improvements

Example output:
"Your highest spending category this month was Food. Reducing restaurant expenses could save you money next month."

---

## Tech Stack

| Layer          | Technology Used                                         |
| -------------- | ------------------------------------------------------- |
| Frontend       | React.js, Chart.js, Axios,                              |
| Backend        | Node.js, Express.js                                     |
| Database       | MongoDB with Mongoose                                   |
| Authentication | JWT                                                     |
| Email Service  | Nodemailer (Gmail SMTP)                                 |
| File Export    | XLSX                                                    |
| AI Integration | OpenAI API                                              |

---

## Project Structure

```
WalletWatch/
│
└── backend/
    │── controllers/         # Handles business logic for API requests
    │── db/                  # Database connection configuration
    │── middlewares/         # JWT auth and request validation middleware
    │── models/              # Mongoose schemas (User, Income, Expense, Budget)
    │── routes/              # API endpoint definitions
    │── services/            # Nodemailer email service and OpenAI integration
    │── uploads/             # Uploaded files (if any)
    │── .env                 # Environment variables
    │── index.js             # Backend server entry point
    │── package.json         # Backend dependencies and scripts
    │── package-lock.json
│
└── frontend/
    └── src/
        ├── assets/          # Static files such as images, fonts, icons
        ├── components/      # Reusable UI components used across the app
        ├── features/        # Feature-specific modules (auth, dashboard, charts, etc.)
        ├── hooks/           # Custom React hooks for shared logic
        ├── pages/           # Page-level components for routing (Home, Dashboard, Login)
        ├── services/        # API call utilities (Axios functions for backend requests)
        ├── styles/          # Global and module-specific styling files
        ├── utils/           # Helper functions and constants
        ├── App.js           # Root component that configures routes and layout
        └── index.js         # React application entry point
   
```

---

## Environment Variables

Create a `.env` file inside the backend directory and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
OPENAI_API_KEY=your_openai_api_key
```

Note: Gmail requires an App Password if two-factor authentication is enabled.

---

## Installation and Setup

### Clone the Repository

```
git clone https://github.com/Sofiaa05/WalletWatch.git
cd WalletWatch
```

### Backend Setup

```
cd backend
npm install
npm start
```

### Frontend Setup

```
cd frontend
npm install
npm start
```

The application will run at:

```
Frontend: http://localhost:3000
Backend:  http://localhost:8081
```

---

## Future Enhancements

* OCR-based receipt scanning
* Push notifications for important alerts
* Multi-currency support
* Recurring transactions and financial goals overview


