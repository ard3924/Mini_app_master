# Statement of Work for Lattfaktura

## Project Description

This is a full-stack web application developed as a Statement of Work for Lattfaktura. The application provides a secure pricelist management system with user authentication, multi-language support (English and Swedish), and terms display. It allows authorized users to view and edit product prices in a pricelist.

The application is built with a modern tech stack, featuring a React-based frontend for a responsive user interface, an Express.js backend for API handling, and PostgreSQL for data storage. It includes features like JWT-based authentication, real-time pricelist editing, and internationalization.

## Features

- **User Authentication**: Secure login system using JWT tokens and bcrypt password hashing.
- **Pricelist Management**: View, search, and edit product prices and details.
- **Multi-Language Support**: Interface available in English and Swedish with dynamic translations.
- **Terms and Conditions**: Dedicated page displaying legal terms in selected language.
- **Responsive Design**: Mobile-friendly interface with hamburger menu for smaller screens.
- **Dockerized Deployment**: Containerized for easy deployment and scalability.

## Tech Stack

### Frontend

- **React**: Component-based UI library
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **CSS**: Custom styling for components

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for API development
- **PostgreSQL**: Relational database
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### DevOps

- **Docker**: Containerization
- **Render**: Cloud deployment platform

## Prerequisites

- Node.js (v20 or higher)
- PostgreSQL database
- Docker (for containerized deployment)

## Installation and Setup

### Local Development

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd sow-lettfaktura
   ```

2. **Backend Setup**:

   ```bash
   cd backend
   npm install
   # Set up environment variables in .env file
   # DATABASE_URL=your_postgresql_connection_string
   # JWT_SECRET=your_jwt_secret
   # PORT=5000
   npm run init-db  # If script exists to run init.sql
   ```

3. **Frontend Setup**:

   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Database Initialization**:

   - Ensure PostgreSQL is running
   - Run the SQL commands in `backend/init.sql` to create database, tables, and insert initial data

5. **Start the Application**:
   - Backend: `cd backend && node server.js`
   - Frontend: `cd frontend && npm run dev`
   - Access at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend API)

### Docker Deployment

1. **Build and Run with Docker**:
   ```bash
   docker build -t lettfaktura-app .
   docker run -p 5000:5000 lettfaktura-app
   ```

## Usage

1. **Login**: Use the default admin credentials (username: admin, password: as set in init.sql)
2. **Navigate Terms**: View terms and conditions in English or Swedish
3. **Access Pricelist**: After login, view and edit product prices
4. **Language Switch**: Toggle between English and Swedish using flag icons

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login

### Translations

- `GET /api/translations/:page/:lang` - Get translations for a page and language

### Pricelist

- `GET /api/pricelist` - Get all pricelist items
- `PUT /api/pricelist/:id` - Update a pricelist item

## Database Schema

### Tables

- **users**: User authentication (id, username, password)
- **translations**: Multi-language text storage (id, page, lang, key, value)
- **pricelist**: Product pricing information (id, product_service, in_price, price, quantity, total)

## Deployment

The application is deployed on Render at: https://mini-app-master.onrender.com/

Previously deployed on Azure and AWS Linux VMs, but moved to Render due to free tier limitations.

### Render Deployment Steps

1. Connect GitHub repository to Render
2. Set environment variables (DATABASE_URL, JWT_SECRET, etc.)
3. Deploy as a web service
4. Ensure PostgreSQL database is accessible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test locally
4. Submit a pull request

## License

This project is developed as a Statement of Work for Lattfaktura. All rights reserved.
