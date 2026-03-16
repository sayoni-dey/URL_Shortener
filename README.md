# SCALABLE URL SHORTENER
A Bitly-style URL shortener built with MERN + Next.js + shadcn/ui, designed to explore backend system design concepts such as unique ID generation, database indexing, scalable redirects, and analytics.This project focuses on building a production-inspired URL shortening service where users can convert long URLs into compact shareable links and track their usage.

# FEATURES:
1. URL Shortening - Convert long URLs into short, shareable links.
2. Fast Redirection - Efficient lookup using indexed database queries.
3. URL Validation - Ensures only valid HTTP/HTTPS URLs are accepted.
4. Click Tracking - Counts how many times each short link is visited.
5. Secure Short Code Generation - Uses Base62 encoding or cryptographic randomness to prevent predictable links.
6. Modern UI - Frontend built with Next.js and shadcn/ui for a clean and responsive interface.

# TECH STACK:
## Frontend
- Next.js
- React
- shadcn/ui
- TailwindCSS
## Backend
- Node.js
- Express.js
## Database
- MongoDB
- Mongoose

# SYSTEM DESIGN CONCEPTS IMPLEMENTED:
This project explores important backend architecture ideas:
## 1. Unique Short Code Generation
- Base62 encoding
- Cryptographic random generation

## 2. Database Indexing
- Indexed shortCode for fast lookups
- Prevents duplicate URLs

## 3️. Atomic Click Tracking
- Uses MongoDB $inc to safely update click counts.

## 4️. URL Validation
- Uses JavaScript URL parsing to validate inputs.

# HOW IT WORKS:
## Create Short URL
POST /shorten
Example Request:
{
  "originalUrl": "https://google.com"
}
Response:
{
  "shortUrl": "http://localhost:8000/abc123"
}

Redirect
GET /:shortCode
Example:
http://localhost:8000/abc123

## The server:
1. Finds the URL using the shortCode
2. Increments the click counter
3. Redirects the user to the original URL

# Installation
## 1️. Clone the repository
git clone https://github.com/yourusername/url-shortener.git

## 2️. Install dependencies
Backend
cd backend
npm install

Frontend
cd frontend
npm install

## 3️. Setup environment variables
Create a .env file inside backend.
PORT=8000
MONGO_URI=your_mongodb_connection
BASE_URL=http://localhost:8000

## 4️. Run the project
Backend - npm run dev
Frontend - npm run dev

# FUTURE IMPROVEMENTS:
1. Redis caching for faster redirects
2. Link expiration support
3. Rate limiting
4. User authentication
5. Custom short URLs
6. Analytics dashboard
7. QR code generation
8. Distributed ID generation


# LICENSE:
This project is open source and available under the MIT License.

# AUTHOR:
Built as a system design learning project.
