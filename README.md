# Weather App Full Setup Guide

## Project Overview
- Frontend: NextJS with TypeScript
- Backend: Laravel PHP
- Weather Data: OpenWeatherMap API

## Prerequisites
- PHP 8.1+
- Composer
- Node.js 18+
- NPM
- OpenWeatherMap API Key

## Backend Setup (Laravel)

### 1. Clone Laravel Project
```bash
git clone git@github.com:nickmwangemi/pawa-weather.git
cd weather-api
```

### 2. Install Dependencies
```bash
composer install
```

### 3. Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` file:
```
APP_URL=http://localhost:8000
OPENWEATHERMAP_API_KEY=your_api_key_here
```

### 4. Generate Application Key
```bash
php artisan key:generate
```

### 5. Configure OpenWeatherMap API
- Sign up at https://openweathermap.org/
- Create a free API key
- Add key to `.env` file

### 6. Start Backend Server
```bash
php artisan serve
# Runs on http://localhost:8000
```

## Frontend Setup (NextJS)

### 1. Clone Frontend Project
```bash
git clone git@github.com:nickmwangemi/pawa-weather.git
cd weather-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env.local`:
```
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000/api
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key
```

### 4. Run Development Server
```bash
npm run dev
# Runs on http://localhost:3000
```

## Connecting Frontend and Backend
- Ensure Laravel backend runs on `http://localhost:8000`
- Frontend points to `http://localhost:8000/api`
- Backend handles API requests to OpenWeatherMap

## Troubleshooting
- Verify API keys are correct
- Check CORS settings in Laravel
- Ensure both servers are running
- Validate network connectivity

## Recommended Development Workflow
1. Start Laravel backend
2. Start NextJS frontend
3. Open `http://localhost:3000`