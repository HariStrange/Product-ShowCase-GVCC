# Product Showcase - Backend

## Project Overview
This directory contains the server-side API for the Product Showcase GVCC project. It handles database connections, API routing, and data management for the frontend application.

## Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** PostgreSQL
* **ORM/Driver:** node-postgres (pg)

## Prerequisites
* Node.js
* PostgreSQL

## Installation & Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the `backend` root with the following variables:
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=password
    DB_NAME=gvcc
    PORT=5005
    JWT_SECRET= secret here..
    ```

4.  **Start the Server:**
    ```bash
    cd src
    node index.js
    ```

## API Endpoints

### Products
* `GET    /api/products`     - Fetch all products
* `GET    /api/products/:id` - Fetch a single product by ID
* `POST   /api/enquiries`    - Create a new Enquiries
* `GET    /api/products/:id` - Get all Enquiries [admin]
* `POST   /api/auth/login`   - login as admin

### Health Check
* `GET /health` - Check if the API is running