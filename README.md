# Project Name

## Description
This is a simple project that demonstrates the use of JWT authentication, MongoDB, and Node.js to create a RESTful API for an admin and customer feature.

## Features
- Admin Feature
  - Admin Login (Using Email and Password)
  - Add Customer, Update Customer, View Customer Details, View all customers list, Delete customer, Active and deactivate customer account
  - Admin will personally share the email and password to the customer for login
- Customer Feature
  - Register (Using Email, Name, Phone Number, Profile Pic, Password)
  - Login (Email and Password)
  - Edit Profile (Customer can update name, phone number and profile pic)
  - Delete Account
  - Logout

## File Structure
- config
  - jwt.js : for generating and validating JWT
  - mongo.js : for connecting to MongoDB
- controllers
  - admin.js : for handling admin related routes
  - customer.js : for handling customer related routes
- models
  - admin.js : for admin schema
  - customer.js : for customer schema
- routes
  - admin.js : for admin routes
  - customer.js : for customer routes
- middlewares
  - ErrorHandler.js : for handling errors
  - validation.js : for input validation
- util
  - constants.js : for storing constants

## Installation
1. Clone the repository
2. Install dependencies
3. Create a .env file in the root of the project and set the following environment variables:
4. Start the server

## Usage
Use Postman or any other API testing tool to test the routes.

## Contributing
1. Fork the repository
2. Create your feature branch: git checkout -b feature/my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin feature/my-new-feature
5. Submit a pull request

## License
This project is licensed under the MIT License - see the LICENSE file for details

