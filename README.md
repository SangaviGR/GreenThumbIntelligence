# Green Thumb Intelligence - Plant Care Application

## Table of Contents
1. [Description](#description)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Installation](#installation)
5. [Usage](#usage)

## Description

Green Thumb Intelligence is a full-stack MERN application designed to help plant enthusiasts track and manage their plant collections. The application provides:

- Personalized plant care tracking
- Community features to connect with other plant lovers
- AI-powered plant identification (future enhancement)
- Care reminders and notifications

## Features

### Current Features
- User authentication (signup/login)
- Plant profile creation and management
- Care history tracking (watering, fertilizing, etc.)
- Friend system and community sharing
- Responsive design for all devices

### Planned Features
- Image recognition for plant identification
- Push notifications for care reminders
- Plant disease diagnosis assistance
- Seasonal care recommendations

## Technologies

### Frontend
- React.js
- Material-UI (MUI)
- Apollo Client
- GraphQL
- JWT Authentication

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- GraphQL
- JSON Web Tokens

### APIs
-  Plant.id API
- (Future) Weather API for localized care recommendations

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/SangaviGR/Green-Thumb-Intelligence.git
   cd Green-Thumb-Intelligence
   ```

2. Install dependencies for both client and server:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the server directory with:
     ```
     SECRET_KEY=your-secret-key
     MONGODB_URI=your-mongodb-connection-string
     ```


## Usage

1. Start the development server:
   ```bash
   cd server
   npm start
   ```

2. The application will be available at:
   ```
   http://localhost:3000
   ```

3. For production build:
   ```bash
   cd client
   npm start
   ```
