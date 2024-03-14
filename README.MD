# node-js-Project
Recycloset - server 

## Description

This Node.js application utilizes Express.js to set up a comprehensive user management system incorporating Role-Based Access Control (RBAC). It supports various user roles such as register user and admins, each endowed with specific privileges. The application also features extensive item management capabilities, catering to the diverse access levels of different user roles.

## Features

### User Management

- **Registration**: Enables users to register and select their role (register, admin).
- **Authentication**: A secure login process for user-specific functionalities.
- **Authorization**: Role-based permissions to perform certain actions (e.g., item management by admins, register users managing their items and viewing items).

### Item Management

- **Creation**: Users can add items, with specific item types possibly restricted by user role.
- **CRUD Operations**: Users are empowered to create, read, update, and delete items based on their role privileges.
- **Access Control**: Item access is governed by user role;  register users can manage their own and view public items, while admins can access all items.

## Project Structure

The project follows a well-organized directory structure for ease of maintenance and navigation:

- `controllers`: Controllers for items and users.
- `middlewares`: Middleware functions for authentication, authorization, and input validation.
- `model`: Mongoose models and database connectivity setup.
- `routes`: Routing modules for directing HTTP requests.
- `service`: Utility services like bcrypt for hashing and Google auth integration.
- `validation`: Joi schemas for validating user input.


## Documentation

Detailed API documentation is provided at the following link, outlining the available endpoints and their functionalities:

[API Documentation on Postman](https://documenter.getpostman.com/view/32624570/2sA2xmTVZJ#c8fd8634-9b22-4d7b-8238-73429af75ec6)

## Getting Started

To get the application up and running, ensure Node.js and npm are installed. Then, execute the following commands:

```sh

npm install
npm start
Ensure to create a .env file in the root directory with the necessary environment variables as per the .env-example.txt.