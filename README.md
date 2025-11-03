# 🗓️ Calendar System

A full-stack calendar management application built with:
- **Frontend:** React (runs on `http://localhost:3000`)
- **Backend:** Spring Boot (runs on `http://localhost:8080`)
- **Database:** MySQL (Dockerized)

This app allows users to create and manage calendar events with proper timezone handling and synchronization between frontend and backend.

---

## ⚙️ Prerequisites

Before running the project locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node)
- [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

To check, run:
```bash
node -v
npm -v
docker -v
docker compose version


🚀 Running the Application Locally
1️⃣ Start the Backend (MySQL + Spring Boot)

In the project root directory, run:

docker-compose up --build


This command will:

Start a MySQL database (port 3306)

Build and start the Spring Boot backend (port 8080)

Once everything starts, you should see:

backend  | Started Application in ... seconds


You can verify the backend is running at:
👉 http://localhost:8080

2️⃣ Start the Frontend (React App)

Open a new terminal, then:

cd frontend
npm install
npm start


This will start the React app at:
👉 http://localhost:3000

The frontend communicates automatically with the backend via http://localhost:8080.



🧠 Troubleshooting
❌ Communications link failure

Cause: MySQL container failed to start (e.g. invalid env vars).
Fix:

Remove MYSQL_USER and MYSQL_PASSWORD if they use root.

Only keep:

MYSQL_ROOT_PASSWORD: root
MYSQL_DATABASE: calendar-system


Then rebuild containers:

docker-compose down -v
docker-compose up --build

❌ Port already in use

If another service uses port 3306 or 8080, stop it or change the port in docker-compose.yml:

ports:
  - "3307:3306"   # change MySQL port
  - "8081:8080"   # change backend port


Then adjust frontend API URLs if necessary.

❌ Backend starts before MySQL is ready

Docker’s depends_on only ensures container startup order, not readiness.
If backend fails at first, just run:

docker-compose restart backend


after MySQL is fully initialized.