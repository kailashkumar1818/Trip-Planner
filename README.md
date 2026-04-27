# Trip Planner

A MERN full-stack project created from the `Trip Planner.pdf` brief.

## Structure

- `client/`: React + Vite frontend
- `server/`: Express + MongoDB backend with JWT auth

## Features

- User registration and login
- Role-based access for `user` and `admin`
- Trip creation and itinerary viewing
- Activity planning
- Hotel and transport booking storage
- Destination suggestions
- Trip history
- Admin dashboard summary
- Reminder endpoint for upcoming trips

## Run locally

1. Start MongoDB locally or replace `MONGODB_URI` in [server/.env](d:/javascript/server/.env:1) with your MongoDB Atlas connection string.
2. Start the backend:

```bash
cd server
npm install
npm run dev
```

3. Start the frontend in a second terminal:

```bash
cd client
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`  
Backend URL: `http://localhost:5000`

## Deploy

This project is prepared for a single-service deployment where the Express server also serves the built React app.

### Render

1. Push this project to GitHub.
2. Create a new Render Web Service from the repo.
3. Render can use [render.yaml](d:/javascript/render.yaml:1) automatically.
4. Set these environment variables in Render:

- `MONGODB_URI`: your MongoDB Atlas connection string
- `JWT_SECRET`: a strong random secret
- `CLIENT_URL`: your deployed app URL, for example `https://trip-planner.onrender.com`

Render will build the client, start the server, and serve the frontend from the same app URL.
