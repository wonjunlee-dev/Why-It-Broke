# Why It Broke

A community-driven web application built with Node.js, where developers can share unexpected errors or bugs and discuss solutions or ideas through comments.

[🔗 Live Demo](https://why-it-broke.onrender.com)

📸 Preview
<p float="left">
  <img src="https://github.com/user-attachments/assets/a64c9ad2-c4b4-482b-af8a-2884750d0def" width="32%" />
  <img src="https://github.com/user-attachments/assets/49edf43f-8939-478e-ad45-0c91594d8cb3" width="32%" />
  <img src="https://github.com/user-attachments/assets/13741981-78ac-4470-aa39-460d79a10413" width="32%" />
</p>


## 🔍 Target & Purpose

- **Target**: Developers who encounter unexpected errors or bugs during the development process.

- **Purpose**: To provide a community where developers can freely share the problems they have faced and exchange solutions.


## 🚀 Features

- Posting and commenting system for sharing development issues
- Edit and delete functions for posts and comments (with permission checks)
- Secure login and registration using **JWT-based authentication**
- **Role-based access control** (admin and user)
- Custom error messages and validation feedback

## 🧠 Architecture

- Structured backend using the **MVC (Model-View-Controller)** design pattern to organize codebase
- **RESTful API design** for clear and scalable data flow
- Server-side rendering using EJS templating engine
- Access and refresh tokens stored in **HTTP-only cookies** for enhanced security

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, Passport.js (passport-jwt), bcrypt
- **Templating**: EJS
- **Deployment**: Render
- **Version Control**: GitHub

## 📚 Challenges & Learnings
- Applied the MVC (Model-View-Controller) pattern to build a scalable backend architecture, which helped separate concerns and improve maintainability
- Faced challenges while implementing a secure access and refresh token flow between the frontend and backend, especially when handling HTTP-only cookies and token rotation
