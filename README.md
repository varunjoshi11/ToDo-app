# Todo App 📝

A full stack Todo web application built  to demonstrate end-to-end development skills.

## 🚀 Tech Stack

**Frontend:**
- Next.js 14 (TypeScript)
- Tailwind CSS
- Axios

**Backend:**
- Java 21
- Spring Boot 3.3.x
- Spring Security
- JWT Authentication (jjwt 0.11.5)
- BCrypt Password Hashing

**Database:**
- PostgreSQL 16

**DevOps:**
- Docker
- Docker Compose

**Tools:**
- Git & GitHub
- IntelliJ IDEA (backend)
- VS Code (frontend)
- Postman (API testing)

## ✨ Features

- User Registration and Login
- JWT based authentication
- Each user sees only their own todos
- Create, complete and delete todos
- Passwords hashed with BCrypt
- CORS configured for frontend-backend communication
- Input validation on all endpoints
- Fully containerized with Docker

## 🏗️ Architecture
```
Browser (Next.js + Tailwind)
            ↓
  Spring Boot REST API (JWT Protected)
            ↓
     PostgreSQL Database
```

## 📁 Project Structure
```
todo-app/
├── backend/                   # Spring Boot API
│   ├── src/
│   │   └── main/java/com/todoapp/backend/
│   │       ├── controller/    # REST endpoints
│   │       ├── service/       # Business logic
│   │       ├── repository/    # Database access
│   │       ├── entity/        # Database models
│   │       ├── dto/           # Request/Response objects
│   │       └── security/      # JWT + Spring Security
│   └── Dockerfile
├── frontend/                  # Next.js UI
│   ├── src/app/
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   └── todos/             # Todo dashboard
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## 🔐 API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|--------------|-------------|
| POST | /api/auth/register | ❌ | Register new user |
| POST | /api/auth/login | ❌ | Login and get JWT token |
| GET | /api/todos | ✅ | Get all todos for logged in user |
| POST | /api/todos | ✅ | Create new todo |
| PUT | /api/todos/{id} | ✅ | Update todo |
| DELETE | /api/todos/{id} | ✅ | Delete todo |

## 🐳 Run With Docker (Recommended)

The easiest way to run this app locally. Only requires Docker Desktop.

**1. Clone the repo:**
```bash
git clone https://github.com/varunjoshi11/todo-app.git
cd todo-app
```

**2. Run with Docker:**
```bash
docker compose up --build
```

**3. Open in browser:**
```
http://localhost:3000
```

That's it. All three services (frontend, backend, database) start automatically. ✅

## 💻 Run Locally Without Docker

**Prerequisites:**
- Java 21
- Node.js 20
- PostgreSQL 16

**1. Clone the repo:**
```bash
git clone https://github.com/YOURUSERNAME/todo-app.git
```

**2. Create PostgreSQL database:**
```sql
CREATE DATABASE todo_app;
```

**3. Configure backend:**

Open `backend/src/main/resources/application.properties` and set your PostgreSQL password:
```properties
spring.datasource.password=YOUR_POSTGRES_PASSWORD
```

**4. Run backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**5. Run frontend:**
```bash
cd frontend
npm install
npm run dev
```

**6. Open in browser:**
```
http://localhost:3000
```

## 🔑 Environment Variables

**Backend (application.properties):**
```
SPRING_DATASOURCE_URL      → PostgreSQL connection URL
SPRING_DATASOURCE_USERNAME → Database username
SPRING_DATASOURCE_PASSWORD → Database password
JWT_SECRET                 → Secret key for signing JWT tokens
JWT_EXPIRATION             → Token expiry in milliseconds (86400000 = 24hrs)
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_URL → Backend API URL (http://localhost:8080)
```

## 📝 Notes

- This project was built for learning and portfolio purposes
- Tested locally and with Docker