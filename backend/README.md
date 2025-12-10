# Library System Backend

A NestJS REST API for managing a library system with books, authors, users, and borrowing functionality.

## Tech Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Class Validator
- **API Documentation**: REST endpoints

## Features

- **Authentication**: JWT-based authentication
- **Books Management**: CRUD operations with filtering
- **Authors Management**: Full CRUD operations
- **Users Management**: Create and list users
- **Borrowing System**: Mark books as borrowed, return books, view user borrowing history
- **Data Validation**: Input validation on all endpoints
- **Error Handling**: Comprehensive error handling and validation

## Project Structure

```
backend/
├── src/
│   ├── common/
│   │   ├── guards/
│   │   │   └── jwt.guard.ts
│   │   ├── decorators/
│   │   │   └── auth.decorator.ts
│   │   └── exceptions/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── strategies/
│   │   │   │   └── jwt.strategy.ts
│   │   │   └── dto/
│   │   │       └── login.dto.ts
│   │   ├── users/
│   │   ├── authors/
│   │   ├── books/
│   │   └── borrow/
│   ├── prisma/
│   │   └── prisma.service.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── package.json
└── tsconfig.json
```

## Prerequisites

- Node.js (v18+)
- npm or yarn
- PostgreSQL (v12+) or Supabase account for cloud database

## Installation

### 1. Clone and Setup

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Edit `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/library_system"
JWT_SECRET="your-secret-key-here"
```

### 3. Database Setup

#### Option A: Local PostgreSQL

Create a local database:
```bash
createdb library_system
```

Run migrations:
```bash
npx prisma migrate dev --name init
```

#### Option B: Supabase (Cloud)

1. Create a Supabase project at https://supabase.com
2. Copy the PostgreSQL connection string
3. Add to `.env`:
   ```
   DATABASE_URL="postgresql://postgres:password@db.supabase.co:5432/postgres"
   ```
4. Run migrations:
   ```bash
   npx prisma migrate dev --name init
   ```

### 4. (Optional) Seed Database

Create `prisma/seed.ts`:
```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create authors
  const author1 = await prisma.author.create({
    data: {
      name: 'J.K. Rowling',
      bio: 'Author of Harry Potter series',
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: 'J.R.R. Tolkien',
      bio: 'Author of The Lord of the Rings',
    },
  });

  // Create books
  await prisma.book.create({
    data: {
      title: 'Harry Potter and the Philosopher\'s Stone',
      isbn: '978-0747532699',
      description: 'The first Harry Potter book',
      authorId: author1.id,
    },
  });

  await prisma.book.create({
    data: {
      title: 'The Hobbit',
      isbn: '978-0547928227',
      description: 'A fantasy adventure',
      authorId: author2.id,
    },
  });

  // Create users
  await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Johnson',
    },
  });

  await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Smith',
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:
```json
"prisma": {
  "seed": "ts-node prisma/seed.ts"
}
```

Run seed:
```bash
npm run prisma db seed
```

## Running the Application

### Development Mode (with auto-reload)

```bash
npm run start:dev
```

Server runs on `http://localhost:3000`

### Production Mode

```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Login with email, get JWT token |

**Example:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com"}'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "alice@example.com",
    "name": "Alice Johnson"
  }
}
```

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/users` | Create a new user |
| GET | `/users` | List all users |
| GET | `/users/:id` | Get user by ID |

**Create User:**
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"newuser@example.com","name":"New User"}'
```

### Authors

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/authors` | Create a new author |
| GET | `/authors` | List all authors |
| GET | `/authors/:id` | Get author by ID |
| PUT | `/authors/:id` | Update author |
| DELETE | `/authors/:id` | Delete author (only if no books) |

**Create Author:**
```bash
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Author Name","bio":"Author biography"}'
```

### Books

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/books` | Create a new book |
| GET | `/books` | List all books with optional filters |
| GET | `/books/:id` | Get book by ID |
| PUT | `/books/:id` | Update book |
| DELETE | `/books/:id` | Delete book (only if not borrowed) |

**Create Book:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Book Title","isbn":"123-456","description":"Description","authorId":1}'
```

**Filter Books by Author:**
```bash
curl "http://localhost:3000/books?authorId=1"
```

**Filter Books by Borrowed Status:**
```bash
curl "http://localhost:3000/books?isBorrowed=false"
```

### Borrowing

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/borrow/borrow` | Mark book as borrowed by user |
| POST | `/borrow/return` | Mark borrowed book as returned |
| GET | `/borrow/user/:userId` | Get all currently borrowed books for user |
| GET | `/borrow/:id` | Get specific borrow record |

**Borrow a Book:**
```bash
curl -X POST http://localhost:3000/borrow/borrow \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"bookId":1}'
```

**Return a Book:**
```bash
curl -X POST http://localhost:3000/borrow/return \
  -H "Content-Type: application/json" \
  -d '{"borrowRecordId":1}'
```

**Get User's Borrowed Books:**
```bash
curl http://localhost:3000/borrow/user/1
```

## Authentication & Protected Routes

To use protected endpoints, include JWT token in the Authorization header:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" http://localhost:3000/protected-route
```

Currently, all endpoints are open for testing. To protect endpoints, use the `@Auth()` decorator:

```typescript
@Post('example')
@Auth()
async example() {
  // This route is now protected
}
```

## Database Schema

### User
- `id`: Primary key
- `email`: Unique email address
- `name`: User's name
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Author
- `id`: Primary key
- `name`: Author's name
- `bio`: Optional biography
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### Book
- `id`: Primary key
- `title`: Book title
- `isbn`: Unique ISBN
- `description`: Optional description
- `authorId`: Foreign key to Author
- `createdAt`: Timestamp
- `updatedAt`: Timestamp

### BorrowRecord
- `id`: Primary key
- `userId`: Foreign key to User
- `bookId`: Foreign key to Book
- `borrowedAt`: Timestamp when borrowed
- `returnedAt`: Nullable timestamp when returned

## Assumptions & Design Notes

1. **Authentication**: Simple email-based login without password. JWT tokens expire in 24 hours.

2. **Borrowing Logic**: A book can only be borrowed if it's not currently borrowed (returnedAt is null). Once returned, it can be borrowed again.

3. **Data Deletion**: Authors can only be deleted if they have no books. Books can only be deleted if they're not currently borrowed.

4. **Filtering**: Books can be filtered by author ID and borrowed status. Multiple filters can be combined.

5. **Error Handling**: All endpoints return appropriate HTTP status codes and error messages for validation failures.

## Testing the API

### Using Postman

1. Import endpoints as described above
2. Set `Authorization: Bearer TOKEN` in headers for protected routes
3. Test each endpoint systematically

### Using cURL

See examples in the API Endpoints section above.

### Full Test Flow

```bash
# 1. Create an author
curl -X POST http://localhost:3000/authors \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Author"}'

# 2. Create a book (use authorId from step 1)
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Book","isbn":"123-456","authorId":1}'

# 3. Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'

# 4. Borrow a book (use userId and bookId from above)
curl -X POST http://localhost:3000/borrow/borrow \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"bookId":1}'

# 5. List user's borrowed books
curl http://localhost:3000/borrow/user/1

# 6. Return the book (use borrowRecordId from step 4)
curl -X POST http://localhost:3000/borrow/return \
  -H "Content-Type: application/json" \
  -d '{"borrowRecordId":1}'
```

## Troubleshooting

### Migration Failed
- Ensure `DATABASE_URL` is correct and the database exists
- Check PostgreSQL is running
- Try: `npx prisma migrate reset` (⚠️ deletes all data)

### Port Already in Use
- Change port in `.env`: `PORT=3001`
- Or kill the process: `lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill`

### JWT Issues
- Ensure `JWT_SECRET` is set in `.env`
- Token format: `Authorization: Bearer <token>`

## Development Notes

- ESLint is configured for code quality
- TypeScript is used throughout
- Prisma handles all database operations
- NestJS dependency injection manages all services

## License

MIT