# Library Management System

A full-stack library system built with NestJS backend and React frontend. Manage books, authors, users, and borrowing records through an intuitive interface.

## Project Structure

```
library-system/
├── backend/              # NestJS REST API
│   ├── src/
│   ├── prisma/
│   ├── .env.example
│   └── README.md        # Backend documentation
├── frontend/            # React.js TypeScript application
│   ├── src/
│   ├── .env.example
│   └── README.md        # Frontend documentation
└── README.md            # This file
```

## Tech Stack

### Backend
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **API**: REST

### Frontend
- **Framework**: React 18 (TypeScript)
- **State Management**: React Context / Hooks
- **HTTP Client**: Axios
- **UI**: CSS / Tailwind CSS (optional)

## Quick Start

### Prerequisites
- Node.js v18+
- npm or yarn
- PostgreSQL (local or Supabase)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Run migrations
npx prisma migrate dev --name init

# Start development server
npm run start:dev
```

Server runs on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with backend API URL (usually http://localhost:3000)

# Start development server
npm start
```

Frontend runs on `http://localhost:3000` (or next available port)

## Features

### Authentication
- Email-based login (creates user on first login)
- JWT token management
- Session persistence

### Books Management
- Create, read, update, delete books
- Filter by author and borrowed status
- Display book details with author information

### Authors Management
- Create, read, update, delete authors
- View all books by an author
- Cannot delete authors with books

### Users Management
- Create and list users
- View user borrowing history
- Track borrowed books

### Borrowing System
- Mark books as borrowed by users
- Return borrowed books
- View all currently borrowed books for a user
- View borrowing history
- Cannot borrow already-borrowed books

## API Documentation

See `/backend/README.md` for detailed API endpoint documentation.

### Key Endpoints

**Auth:**
- `POST /auth/login` - Login with email

**Books:**
- `GET /books` - List books (with optional filters)
- `POST /books` - Create book
- `GET /books/:id` - Get book details
- `PUT /books/:id` - Update book
- `DELETE /books/:id` - Delete book

**Authors:**
- `GET /authors` - List authors
- `POST /authors` - Create author
- `GET /authors/:id` - Get author details
- `PUT /authors/:id` - Update author
- `DELETE /authors/:id` - Delete author

**Users:**
- `GET /users` - List users
- `POST /users` - Create user
- `GET /users/:id` - Get user details

**Borrowing:**
- `POST /borrow/borrow` - Borrow a book
- `POST /borrow/return` - Return a book
- `GET /borrow/user/:userId` - Get user's borrowed books
- `GET /borrow/:id` - Get borrow record details

## Development Workflow

### 1. Start Backend

```bash
cd backend
npm run start:dev
```

### 2. Start Frontend (in another terminal)

```bash
cd frontend
npm start
```

### 3. Open Browser

Navigate to `http://localhost:3000` (or the port shown in terminal)

### 4. Test the Application

- Login with any email
- Create authors
- Create books for those authors
- Borrow and return books
- View your borrowing history

## Environment Variables

### Backend (`.env`)

```
DATABASE_URL="postgresql://user:password@localhost:5432/library_system"
JWT_SECRET="your-secret-key-here"
NODE_ENV="development"
PORT=3000
```

### Frontend (`.env`)

```
REACT_APP_API_URL=http://localhost:3000
```

## Database Schema

The system uses PostgreSQL with the following tables:

- **users**: Store user information
- **authors**: Store author information
- **books**: Store book information with foreign key to authors
- **borrow_records**: Track borrowing history with foreign keys to users and books

See `/backend/prisma/schema.prisma` for complete schema details.

## Testing

### Backend API

Use Postman, cURL, or Thunder Client:

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Create author
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Author Name"}'

# Create book
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Book Title","isbn":"123-456","authorId":1}'

# List all books
curl http://localhost:3000/books
```

### Frontend UI

1. Open the application in your browser
2. Login with any email
3. Create authors and books through the UI
4. Borrow and return books
5. View borrowing history

## Troubleshooting

### Backend won't start
- Check `.env` file is configured correctly
- Ensure PostgreSQL is running
- Verify port 3000 is not in use
- Run `npm install` to ensure all dependencies are installed

### Frontend won't start
- Ensure backend is running first
- Check `REACT_APP_API_URL` is correct in `.env`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### Database connection error
- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- For Supabase, verify connection string is from the correct project

### Port conflicts
- Backend: Change `PORT` in backend `.env`
- Frontend: React will prompt to use another port, or change in `.env`

## Design Notes

### Authentication
- Simple email-based login without passwords
- JWT tokens expire after 24 hours
- Frontend persists token in localStorage

### Borrowing Logic
- A book can only be borrowed if no active borrow record exists
- Returning a book marks the borrow record with a return timestamp
- Users can borrow a book multiple times (at different periods)

### Data Integrity
- Authors with books cannot be deleted
- Books with active borrow records cannot be deleted
- ISBN must be unique

## Future Enhancements

- Password-based authentication
- User roles and permissions
- Book search and advanced filtering
- Notification system for due dates
- Admin dashboard
- Book reviews and ratings
- Email notifications for returns

## Contributing

1. Create a feature branch
2. Make changes in backend/frontend as needed
3. Test thoroughly
4. Submit a pull request

## License

MIT