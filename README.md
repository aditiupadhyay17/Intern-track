# InternTrack — Internship Application Tracker

A full stack web app to track internship/job applications: company, role,
status (Applied / OA Round / Interview / Offer / Rejected), date applied, and
notes.

## Tech Stack
- **Backend:** Java, Spring Boot, Spring Data JPA, REST API
- **Database:** MySQL
- **Frontend:** HTML, CSS, JavaScript (Fetch API)

## Features
- Add, edit, delete, and view internship applications
- Status badges (Applied, OA Round, Interview, Offer, Rejected)
- Data persisted in MySQL via a REST API
- Input validation with clean error handling on both frontend and backend
- CORS configured so the frontend can call the API independently

## Project Structure
```
interntrack/
├── backend/          # Spring Boot REST API
│   └── src/main/java/com/aditi/interntrack/
│       ├── model/         # Application entity
│       ├── repository/    # Spring Data JPA repository
│       └── controller/    # REST endpoints
└── frontend/         # Plain HTML/CSS/JS client
```

## Setup

### 1. Database
Install MySQL locally (or use a free cloud instance). The app will
auto-create the `interntrack` database on first run — you don't need to
create it manually.

Update `backend/src/main/resources/application.properties` with your MySQL
username and password:
```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

### 2. Backend
```bash
cd backend
mvn spring-boot:run
```
The API will start on `http://localhost:8080`.

### 3. Frontend
Simply open `frontend/index.html` in your browser, or serve it with a live
server extension in VS Code. It talks to the backend at
`http://localhost:8080/api/applications`.

## API Endpoints

| Method | Endpoint                  | Description            |
|--------|----------------------------|-------------------------|
| GET    | `/api/applications`        | List all applications  |
| GET    | `/api/applications/{id}`   | Get one application    |
| POST   | `/api/applications`        | Create an application  |
| PUT    | `/api/applications/{id}`   | Update an application  |
| DELETE | `/api/applications/{id}`   | Delete an application  |

### Example request body
```json
{
  "companyName": "Google",
  "role": "SDE Intern",
  "status": "APPLIED",
  "dateApplied": "2026-08-01",
  "notes": "Applied through referral"
}
```

## Future Improvements
- Add JWT-based authentication for multi-user support
- Filter/search applications by status or company
- Deploy backend on Render/Railway and frontend on Vercel/Netlify for a live demo
- Add email reminders for follow-ups
