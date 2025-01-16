# Medical Camp Management System (MCMS)

## Table of Contents

- [Overview](#overview)
- [Admin Access](#admin-access)
- [Live Site URL](#live-site-url)
- [Features](#features)
- [Screenshots](#screenshots)
- [Functionalities](#functionalities)
  - [🏠 HomePage](#home-page)
  - [📋 Available Camps Page](#available-camps-page)
  - [📝 Camp Details](#camp-details)
  - [🧑‍💼 Organizer Dashboard](#organizer-dashboard)
  - [👩‍💻 Participant Dashboard](#participant-dashboard)
  - [🔐 Authentication & Authorization](#authentication--authorization)
  - [👨‍⚖️ Admin Functionality](#admin-functionality)
- [Technologies Used](#technologies-used)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Hosting](#hosting)
- [🛠️ Dependencies](#dependencies)
- [Future Improvements](#future-improvements)
- [How to Contribute](#how-to-contribute)

## Overview

The **Medical Camp Management System (MCMS)** is a web application built using the MERN stack (MongoDB, Express.js, React, Node.js). It aims to streamline the management and coordination of medical camps, providing both organizers and participants with an efficient and user-friendly platform. This project allows organizers to create, manage, and monitor camps, while participants can register for camps, provide feedback, and manage their profiles.

## Admin access

- 🧑‍💼 **Username**: `admin@admin.com`
- 🔑 **Password**: `Admin@123`

## Live Site URL

🌐 [Live Demo](https://medical-camp-ms.web.app/)

## Features

- **📱 Responsive Design**: The site is fully responsive, providing an optimal experience for mobile, tablet, and desktop devices.
- **🔒 User Authentication**: Includes secure login and registration system with social login options (Google).
- **🏕️ Camp Registration**: Participants can join available camps and fill in essential details for registration.
- **⭐ Feedback and Ratings**: Participants can leave feedback and ratings for camps they've attended.
- **🛠️ Admin Dashboard**: Organizers can manage their profile, add new camps, edit existing ones, and manage participant registrations.
- **📊 Camp Management**: Organizers can track participant registrations, payment status, and cancel registrations.
- **🔍 Search and Sort**: Users can search and sort camps by keywords, dates, fees, or alphabetical order.
- **🧑‍💻 Pagination**: Tables and camp lists support pagination to enhance the user experience with large datasets.
- **📄 Camp Details**: Participants can view detailed information about each camp, including healthcare professionals and camp descriptions.
- **💳 Payment Integration**: Stripe is integrated for handling participant payments securely.
- **⚠️ Error Handling**: Implemented 404 error page for unmatched routes.
- **🎉 Sweet Alerts & Notifications**: Uses sweet alerts for smooth notifications on CRUD operations and successful actions.
- **📡 Data Fetching with TanStack Query**: Used TanStack Query for fetching data via the GET method to ensure optimized and cached data fetching.
- **🔑 JWT Authentication**: Implemented JWT authentication for secure and authorized access to private routes.

## Screenshots

![Home Page Screenshot](https://i.ibb.co.com/gvgtBx7/mcms-home.png)
![Dashboard Screenshot](https://i.ibb.co.com/52WxC72/mcms-admin-dashboard.png)
![Available Camps Screenshot](https://i.ibb.co.com/J7Lv3QV/mcms-available-camps.png)

## Functionalities

### 1. **🏠 HomePage**

- Features a dynamic banner showcasing success stories and impactful moments.
- Displays a list of the most popular medical camps.
- Participants can click on each camp for detailed information.
- A **"Join US"** button allows new users to register and access the platform.

### 2. **📋 Available Camps Page**

- Lists all available camps with their details.
- Allows users to search for camps by name, date, and healthcare professional.
- Users can filter camps based on various criteria such as most registered, camp fees, and alphabetical order.
- Each camp has a **"Details"** button leading to a detailed camp page.

### 3. **📝 Camp Details**

- Displays detailed camp information including name, image, fees, date & time, location, and healthcare professional.
- Participants can register for the camp by clicking the **"Join Camp"** button and filling out a registration form.
- Displays participant count, which is updated when users register for the camp.

### 4. **🧑‍💼 Organizer Dashboard**

- Organizers can manage their profile, add new camps, and view registered participants.
- Camps can be updated or deleted from the dashboard.
- Organizers can track payment statuses and confirm or cancel registrations.

### 5. **👩‍💻 Participant Dashboard**

- Participants can view their registered camps, payment status, and confirmation status.
- Feedback and ratings are available for completed camps.
- Participants can view their camp payment history and cancel registrations if needed.

### 6. **🔐 Authentication & Authorization**

- Secure login system with JWT-based authentication.
- The **"Join Us"** page allows users to register or log in using email or social login (Google).
- Participants and organizers are redirected to their respective dashboards after logging in.

### 7. **👨‍⚖️ Admin Functionality**

- Admins can view all camps and participant registrations.
- Admins can update, delete existing camps.
- Provides the ability to approve, cancel, or update registration statuses.

## Technologies Used

### Frontend

- ![React](https://img.shields.io/badge/-React-%2361DAFB?logo=react&logoColor=white) React.js
- ![Firebase](https://img.shields.io/badge/-Firebase-%23FFCA28?logo=firebase&logoColor=black) Firebase
- ![TanStack Query](https://img.shields.io/badge/-TanStack%20Query-%2366B2FF?logo=reactquery&logoColor=white) TanStack Query
- ![React Router](https://img.shields.io/badge/-React%20Router-%23CA4245?logo=reactrouter&logoColor=white) React Router Dom
- ![React Hook Form](https://img.shields.io/badge/-React%20Hook%20Form-%238B5CF6?logo=reacthookform&logoColor=white) React Hook Form
- ![React Toastify](https://img.shields.io/badge/-React%20Toastify-%23FF9900?logo=react&logoColor=white) React Toastify
- ![Recharts](https://img.shields.io/badge/-Recharts-%23FF6B6B?logo=react&logoColor=white) Recharts
- ![Lottie](https://img.shields.io/badge/-Lottie-%23F5A623?logo=lottie&logoColor=white) Lottie React
- ![SweetAlert2](https://img.shields.io/badge/-SweetAlert2-%23F9A8D4?logo=sweetalert2&logoColor=white) SweetAlert2
- ![Stripe](https://img.shields.io/badge/-Stripe-%2336B1FF?logo=stripe&logoColor=white) Stripe.js

### Backend

- ![Node.js](https://img.shields.io/badge/-Node.js-%23339933?logo=node.js&logoColor=white) Node.js
- ![Express.js](https://img.shields.io/badge/-Express.js-%23000000?logo=express&logoColor=white) Express.js
- ![MongoDB](https://img.shields.io/badge/-MongoDB-%2347A248?logo=mongodb&logoColor=white) MongoDB
- ![JWT](https://img.shields.io/badge/-JWT-%2361DAFB?logo=json-web-tokens&logoColor=white) JSON Web Token
- ![Firebase Authentication](https://img.shields.io/badge/-Firebase%20Authentication-%23FFCA28?logo=firebase&logoColor=black) Firebase Authentication

### Hosting

- ![Firebase Hosting](https://img.shields.io/badge/-Firebase-%23FFCA28?logo=firebase&logoColor=black) Firebase Hosting
- ![Netlify](https://img.shields.io/badge/-Netlify-%2300C7B7?logo=netlify&logoColor=white) Netlify
- ![Vercel](https://img.shields.io/badge/-Vercel-%23000000?logo=vercel&logoColor=white) Vercel

## 🛠️ Dependencies

Below are the key dependencies used in the project:

- **@material-tailwind/react**: ^2.1.10
- **@stripe/react-stripe-js**: ^3.1.1
- **@stripe/stripe-js**: ^5.5.0
- **@tanstack/react-query**: ^5.64.1
- **axios**: ^1.7.9
- **firebase**: ^11.1.0
- **lottie-react**: ^2.4.0
- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **react-dropzone**: ^14.3.5
- **react-hook-form**: ^7.54.2
- **react-icons**: ^5.4.0
- **react-rating-stars-component**: ^2.2.0
- **react-router-dom**: ^7.1.1
- **react-select**: ^5.9.0
- **react-slick**: ^0.30.3
- **react-toastify**: ^11.0.2
- **recharts**: ^2.15.0
- **slick-carousel**: ^1.8.1
- **sweetalert2**: ^11.15.10

---

## Future Improvements

- ✅ Implement an email verification system.
- 🔄 Add password reset functionality for users.
- 🌍 Include multi-language support for global users.
- 💳 Add payment gateway support for additional regions.
- 🔔 Implement a notification system for real-time updates.

### Additional Sections:

- **🤝 How to Contribute**: If you want to contribute, contact me at abdullahalraiyan4@gmal.com.
