# 🔧 Step-by-Step Setup

- npm init -y
- npm install express mongoose cors dotenv
- npm install --save-dev typescript ts-node-dev @types/node @types/express @types/cors
- npx tsc --init

### 🚀 Run the API

- npx ts-node-dev src/server.ts

### 📁 Folder Structure

```
blogging-platform-api/
│
├── src/ # Source code folder
│ ├── config/ # Configuration files
│ │ └── database.ts # MongoDB connection setup
│ ├── controllers/ # Controller layer (handles HTTP requests)
│ │ └── PostController.ts # Logic to handle post-related endpoints
| | └── AuthController.ts
│ ├── models/ # Mongoose models and interfaces
│ │ └── Post.ts # Post schema and interface
│ | └── User.ts
│ ├── routes/ # Express routes
│ │ └── post.routes.ts # Routes for Post resource
| | └── auth.routes.ts
│ ├── services/ # Business logic layer
│ │ └── PostService.ts # Service logic for Post operations
| | └── AuthService.ts
│ ├── app.ts # Express app setup
│ └── server.ts # Entry point of the application
│
├── .env # Environment variables
├── tsconfig.json # TypeScript configuration
├── package.json # Project metadata and dependencies
└── nodemon.json # Nodemon config for dev environment
```

### 🔐 Authentication Features to Add

- User model and registration
- Login with password + JWT
- Middleware to protect routes (e.g., authMiddleware)
- Secure password hashing (using bcrypt)

### 📦 Install Required Packages

- npm install bcryptjs jsonwebtoken
- npm install --save-dev @types/bcryptjs @types/jsonwebtoken

### REFRESH SECRETE

- node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
