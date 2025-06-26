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
│ ├── models/ # Mongoose models and interfaces
│ │ └── Post.ts # Post schema and interface
│ ├── routes/ # Express routes
│ │ └── post.routes.ts # Routes for Post resource
│ ├── services/ # Business logic layer
│ │ └── PostService.ts # Service logic for Post operations
│ ├── app.ts # Express app setup
│ └── server.ts # Entry point of the application
│
├── .env # Environment variables
├── tsconfig.json # TypeScript configuration
├── package.json # Project metadata and dependencies
└── nodemon.json # Nodemon config for dev environment
```
