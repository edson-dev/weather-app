# weather-app

## Technical Problem: Weather Forecast Platform with Node.js and React

### Challenge Description:
Develop a fullstack application that displays weather forecasts based on the user's location. The
system should consist of a Node.js backend, which communicates with an external weather API, and a React frontend, where
users can view current and future weather conditions. The application should include user authentication and store search
history for weather forecasts.

# Dependencies

| ENV | Required | Description |
|----------|---------|-------------|
| DEV | [Docker](https://www.docker.com/products/docker-desktop/) & [Node](https://nodejs.org/en/download)  | run containers for databases and project |
| PRD | [Docker](https://www.docker.com/products/docker-desktop/) | run containers |

# DEV

```sh
docker compose up -d --no-deps  --build 'database' 'cache'
```
```sh
cd backend && npm run dev
```
```sh
cd frontend && npm run dev
```

# PROD

```PRD NEED FIX routes and BD connections
docker compose up -d --no-deps  --build
```

