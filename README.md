# Growwell Hospitals Website Portal 

## Project Overview
**Growwell Hospitals Website Portal** is a full-stack web application built with **Django and ReactJS**, designed to simplify the hospital experience for patients. The portal allows users to explore **doctor profiles** with their specialties and available timings,**schedule appointments** easily, and **check diagnostic fees** upfront. Patients can also view their **appointment history and past visits**, providing a convenient way to track their medical interactions. With secure **user authentication** and a unified, easy-to-use interface, the portal brings essential hospital services together, making healthcare management faster, transparent, and more organized.

**Live Demo :** [(https://growwell-hospitals-website-portal.onrender.com)](https://growwell-hospitals-website-portal.onrender.com)
### Please wait for 2-3 minutes when you access the website, because it takes some time to allocate the resources and start rendering

## Screenshots

<img width="1920" height="1080" alt="Image1" src="https://github.com/user-attachments/assets/59403831-dbde-44d5-af58-1521ec43240c" />
<img width="1920" height="1080" alt="Image3" src="https://github.com/user-attachments/assets/fba894f1-3ac5-4ff7-982d-582f46b487bb" />
<img width="1920" height="1080" alt="Image5" src="https://github.com/user-attachments/assets/c5992edf-24ea-4cb5-a021-ebaa8df9dff1" />


## Table of Contents
1. [Project Overview](#project-overview)
2. [Screenshots](#screenshots)
3. [Key Features](#key-features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Configuration](#configuration)
7. [Tech Stack](#tech-stack)
8. [Folder Structure](#folder-structure)
9. [Contributions](#contributions)
10. [License](#license)
11. [About](#about)

## Key Features

- **Doctor Profiles:** - View detailed information about doctors, including their specialties, designations, consultation fee, and available timings.  
- **Appointment Scheduling:** - Book appointments with doctors in real-time through an intuitive interface.
- **Dynamic Appointment Window** - The appointment window is limited to 20 days from the current date, and past appointments are automatically deleted once they expire.  
- **Diagnostic Fee Checking:** - Access transparent pricing for various medical tests and services.  
- **Appointment & Visit History:** - Track past appointments and visits to review your medical interactions.  
- **User Authentication:** - Secure login and registration system to protect patient data.  
- **Responsive Interface:** - Built with ReactJS for a smooth and user-friendly experience on desktop.  
- **Full-Stack Integration:** - Backend powered by Django for robust data management and seamless functionality.
  
## Installation
### Installing Node.js and npm

Node.js and npm are required to run and manage the ReactJS frontend of this project.

- **Node.js** provides the runtime environment needed to execute JavaScript outside the browser.  
- **npm (Node Package Manager)** is used to install, manage, and update project dependencies such as React, Vite, Bootstrap, and other frontend libraries.

### Installation Steps

#### Clone the Repository

```bash
git clone https://github.com/SruthiPuli/Growwell-Hospitals-Website-Portal.git
cd Growwell-Hospitals-Website-Portal
```
#### Install Node.js
1. Visit the official Node.js website:
[https://nodejs.org](https://nodejs.org)

2. Download the **LTS (Long Term Support)** version suitable for your operating system.

3. Run the installer and follow the setup instructions.  
   npm is installed automatically along with Node.js.

4. Verify the installation by running the following commands in your terminal or command prompt:
```bash
   node -v
   npm -v
```

#### Download the mandatory packages in package.json
```bash
# mandatory packages
npm install
```

#### Downlaod the additional packages
```bash
#additional packages (Already mentioned in ReactJS_requirements.txt)
npm install react react-dom react-router-dom bootstrap react-bootstrap sweetalert2
```


### Backend Installation (Django)

The backend of the Growwell Hospitals Website Portal is built using **Django**, which handles user authentication, data management, and API services.

#### 1.Install Backend Dependencies

```bash
pip install -r Python_requirements.txt
```

## Usage

After setting up both the backend and frontend, you can run the Growwell Hospitals Portal locally.
**Run Backend first**

### 1. Start the Backend (Django)

1. Navigate to the backend project directory:
 ```bash
 cd Django_Backend
```
2.Start the Django development server:

```bash
python manage.py runserver
```

3. The backend will run at:
```bash
http://127.0.0.1:8000
```

### 2. Start the Frontend (ReactJS + Vite)

1. Navigate to the frontend project directory:
```bash
cd ReactJS_Frontend
```
2.Start the React development server:
```bash
# command to run
npm run dev
```

3. The frontend will run at:
```bash
http://localhost:5173
```

## Configuration

### Create React App (Frontend)
This can be done using either the standard Create React App method or the Vite-based setup.

##### Option 1: Create React App (Standard Method)

 ```bash
# Standard method
 npm create-react-app ReactJS_Frontend
```

##### Option 2: Create React App Using Vite
```bash
# Using Vite
npm create vite@latest ReactJS_Frontend
```
#### Go to the directory
```bash
# Enter into directory
cd ReactJS_Frontend
```


### Creating the Django Project and App (Backend)


#### 2. Create a Django Project

Navigate to your desired directory and run:

```bash
django-admin startproject Django_Backend
cd Django_Backend
```

#### 3. Create a Django App

Inside the project folder, create an app (for example, hospital):
The app folder hospital will contain models, views, and URLs for your portal.

```bash
# creating an app
python manage.py startapp HospitalApp
```
#### 4. Create another Django App to store static files from React(Frontend)

Inside the project folder, create an app (for example, hospital):
The app folder hospital will contain models, views, and URLs for your portal.

```bash
# creating an app
python manage.py startapp StaticReactJSFrontend
```

#### 5. Add the App to Installed Apps

Open growwell_backend/settings.py and add the app to INSTALLED_APPS:
```bash
INSTALLED_APPS = [
    # default apps...
    'HospitalApp',
    'StaticReactJSFrontend',  
]
```
#### 4. Run Initial Migrations
This sets up the database for your project.
```bash
python manage.py makemigrations
python manage.py migrate
```
### Deployment Steps

When deploying the Growwell Hospitals Portal to production, you need to prepare both the frontend and backend.


### 1. Build the React Frontend

The React frontend needs to be compiled into static files that can be served by Django or any web server.

1. Navigate to the frontend project directory:
 ```bash
 cd ReactJS_Frontend
 ```
Build the production version of the app:

```bash
# Copy code
npm run build
```
This creates a dist/ (Vite) or build/ (CRA) folder containing optimized static files:

**HTML, CSS, JavaScript, Images**
These files are ready to be served by Django or a web server like Nginx.

### 2. Serve Frontend via Django (Optional)

If you want Django to serve the React frontend:

Move or copy the React build output (`dist/`) into Django’s static directory.

#### Corrected Structure (as per this project)

```bash
Django_Backend/
├── StaticReactJSFrontend/
│   └── dist/
│       ├── assets/
│       └── vite.svg
│
├── StaticFiles/        # Generated after collectstatic
│   ├── admin/
│   └── frontend/
```
#### Update Django settings.py:
```bash
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
```
##### 3. Collect Static Files in Django

Django needs to gather all static assets (CSS, JS, images) into a single location to serve them in production.

#### Run the collectstatic command:
This command copies all static files from:
```bash
python manage.py collectstatic
```
- Each app’s static/ folder
- The frontend build folder (if included)
Into the directory defined by STATIC_ROOT in settings.py.
Example:
```bash
STATIC_ROOT = BASE_DIR / 'staticfiles'
```

These collected files are now ready to be served by Django in production.

## Environment Variables (Production Setup)

When deploying the Growwell Hospitals Portal, sensitive and environment-specific values must be stored as environment variables instead of hardcoding them.

### Required Environment Variables

The following environment variables must be configured for production:

```bash
DEBUG=True
SECRET_KEY=your-secret-key-here
# secret key is visible in django settings.py
```

## Tech Stack

- **ReactJS**
ReactJS is used for building the frontend of the application. It provides a component-based architecture that helps create a dynamic and responsive user interface. React enables smooth navigation between pages, real-time updates, and efficient rendering of data such as doctor profiles, appointment schedules, and user history, resulting in a better user experience.

- **Django**
Django is used as the backend framework to handle business logic, user authentication, and API management. Its built-in features such as authentication, admin panel, and security mechanisms help speed up development while maintaining reliability. Django acts as the core system that connects the frontend with the database and manages all hospital-related operations.

- **Python**
Python is the primary programming language used in the backend. Its simplicity and readability make it ideal for rapid development and easy maintenance. Python allows seamless integration with Django and supports clean implementation of application logic.

- **SQLite3 (Django Built-in Database)**
SQLite3 is used as the default database provided by Django. It is lightweight and requires no separate server setup, making it suitable for development and small-scale deployments. The database is used to store application data such as user accounts, doctor information, patient details, appointments, and visit history.

## Folder Structure

```bash
Growwell-Hospitals-Website-Portal/
├── Django_Backend/
│   ├── Django_Backend/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   │
│   ├── HospitalApp/
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py
│   │   ├── apps.py
│   │   ├── models.py
│   │   ├── tests.py
│   │   ├── views.py
│   │   └── urls.py
│   │
│   ├── StaticFiles/
│   │   ├── admin/
│   │   └── files...
│   │
│   ├── StaticReactJSFrontend/
│   │   └── dist/
│   │       ├── assets/
│   │       │   └── doctors_images...
│   │       └── vite.svg
│   │
│   ├── db.sqlite3
│   ├── manage.py
│   └── requirements.txt
│
├── ReactJS_Frontend/
│   ├── node_modules/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── .eslintrc.cjs
│   └── README.md
│
├── ReactJS-requirements.txt
├── Python_requirements.txt
├── LICENSE
├── .gitignore
└── README.md
```
## Contributions

Contributions are welcome! If you’d like to improve this project, feel free to fork the repository, create a new branch, and submit a pull request. Bug reports, feature requests, and documentation improvements are all appreciated.

## License

This project is licensed under the [**MIT License**](LICENSE).
If you fork or use this project, please give credit by mentioning or pinging me: **Sruthi Pulipati** ([GitHub: SruthiPuli](https://github.com/SruthiPuli)).

## About

This project is solely developed by **Sruthi Pulipati** ([GitHub: SruthiPuli](https://github.com/SruthiPuli)).
