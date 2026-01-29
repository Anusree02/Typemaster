# typemaster

## Introduction
TypeMaster is a full-stack interactive typing speed application developed using the MERN stack (MongoDB, Express.js, React, and Node.js).  
It allows users to test their typing speed and accuracy in real time and stores scores in MongoDB to display a dynamic leaderboard.

---

## Built With
- **Frontend:** React.js, TypeScript, HTML, CSS, Vite  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose  

---

## Setup
To run this project locally, install the dependencies and start both the frontend and backend servers.

*Backend*
```bash
cd backend
npm install
npm start

*Frontend*
```bash
cd backend
npm run dev

*Important*
To connect the application to your own MongoDB database, update the following variables in backend/config.js:
PORT
mongoDBURL
