# Notes API

A RESTful backend API built with Express.js and MongoDB (Mongoose), providing CRUD operations for notes, including full-text search and pagination.

## Live URL


```
Live API base URL: (https://betechified-adv-bd-group1-project.onrender.com)
```

## Tech Stack

- **Runtime:** Node.js v26.2.0
- **Framework:** Express.js
- **Database:** MongoDB Atlas (via Mongoose)
- **Validation:** Joi
- **Dev tooling:** nodemon, dotenv

## Project Structure

```
BeTechified-Adv-BD-Group1-Project/
├── App.js                     # Entry point — connects everything
├── Database/
│   └── Dbconnect.js           # MongoDB connection logic
├── Models/
│   └── NoteModel.js           # Mongoose schema for a Note
├── Controller/
│   └── Notes.controller.js    # Request handlers (create, get, delete)
├── Routes/
│   └── Note.route.js          # Route definitions
├── Middlewares/
│   ├── ErrorHandler.js        # Global error-handling middleware
│   └── Logger.js              # Request logging middleware
└── .env                       # Environment variables (not committed)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher installed
- A MongoDB Atlas account with a cluster set up (or access to the team's shared cluster)
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jacobmaryann/BeTechified-Adv-BD-Group1-Project.git
   cd BeTechified-Adv-BD-Group1-Project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root (use `.env.example` as a reference) with the following:
   ```
   PORT=5001
   MONGODB_URI=<your-mongodb-connection-string>
   ```

   > **Note:** If our MongoDB connection times out with a `querySrv ETIMEOUT` error, our network may be blocking DNS SRV lookups. In that case, we use the standard (non-`+srv`) connection string format instead, listing shard hosts explicitly. Asking a member of the team for the working connection string format if this happens.

4. **Run the development server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   Server is listening on PORT 5001
   Database connected successfully
   ```

## API Endpoints

Base path: `/api/notes`

| Method | Endpoint | Description |
|--------|----------|--------------|
| `GET` | `/api/notes` | Get all notes (supports pagination & search) |
| `POST` | `/api/notes` | Create a new note |
| `PUT` | `/api/notes/:id`| Update a note
| `DELETE` | `/api/notes/:id` | Delete a note by ID |

## To be a user, first register

```
POST/api/user/auth/register
Content-Type: application/json

{
"name": "your name"
"email": "your email
"password": "your password"
}
```

## To be a user, second login

```
POST/api/user/auth/login
Content-Type: application/json

{
"email": "your email
"password": "your password"
}
```



### Create a Note

```
POST /api/notes
Content-Type: application/json

{
  "title": "Educative content",
  "content": "Notes on how the API works",
  "category": "personal",
  "tags": "others"
}
```

**Response — `201 Created`**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "_id": "6aa52683690cf0b7dcc59ce7",
    "title": "Educative content",
    "content": "Notes on how the API works",
    "category": "personal",
    "tags": "others",
    "createdAt": "2026-09-12T10:16:35.146Z",
    "updatedAt": "2026-09-12T10:16:35.146Z"
  }
}
```

### Get Notes (Pagination)

Retrieve notes with pagination using `page` and `limit` query parameters.

```
GET /api/notes?page=1&limit=5
```

**Response — `200 OK`**
```json
{
  "success": true,
  "message": "Notes retrieved successfully",
  "data": [ /* array of note objects */ ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalCount": 12,
    "limit": 5
  }
}
```

If `page` and `limit` are omitted, they default to `page=1` and `limit=10`.

### Search Notes

Search across `title`, `content`, `category`, and `tags` using the `search` query parameter (powered by a MongoDB text index).

```
GET /api/notes?search=Educative
```

**Response — `200 OK`**
```json
{
  "success": true,
  "message": "Notes retrieved successfully",
  "data": [
    {
      "_id": "6aa534ba729ab73a6fc0b5f3",
      "title": "Educative content",
      "content": "...",
      "category": "personal",
      "tags": "others"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 1,
    "totalCount": 1,
    "limit": 10
  }
}
```

Search and pagination can be combined:
```
GET /api/notes?search=Educative&page=1&limit=5
```

### Delete a Note

```
DELETE /api/notes/:id
```

Example:
```
DELETE /api/notes/6aa52683690cf0b7dcc59ce7
```

**Response — `200 OK`**
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": { /* the deleted note */ }
}
```

## Error Handling

All errors are returned in a consistent JSON format via a global error-handling middleware:

```json
{
  "success": false,
  "statusCode": 404,
  "message": "Note not found"
}
```

| Status Code | Meaning | Example Trigger |
|--------------|---------|------------------|
| `400` | Bad Request | Invalid ID format, missing required fields |
| `404` | Not Found | Note with the given ID does not exist |
| `403` | Not Authorised | User not allowed |
| `500` | Server Error | Unexpected server or database failure |

## Testing
Testing with Postman

This repository includes a fully configured Postman collection to make testing the API endpoints easy.

Clone this repository to your local machine.
Open Postman and click Import in the top left corner.
Select the Notes-API.postman_collection.json file located in the root directory.
All routes (GET, POST, PUT, DELETE) will be automatically loaded and ready to test against http://localhost:5001.
