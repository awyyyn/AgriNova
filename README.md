# 🌱 AgriNova - Pest Detection & Plant Analysis System

A full-stack system for plant disease detection and farm management, composed of three main applications:

- **pest-app** – React Native mobile app for farmers (plant image analysis)
- **api** – Express.js + Node.js backend for image processing (OpenAI Vision)
- **admin-ui** – React + TypeScript Admin Dashboard

---

---

# 🧠 About the System

This system allows farmers to:

- Capture or upload plant images
- Analyze plant health using OpenAI Vision
- Receive plant disease detection results
- Manage their account

Admins can:

- View dashboard statistics
- Manage users
- Monitor plant analysis logs
- Control system settings

The backend processes images using OpenAI Vision API and handles authentication, authorization, and CRUD operations.

---

# ⚙️ Tech Stack

## 📱 pest-app

- React Native
- Zustand
- GluestackUI + TailwindCSS v3

## 🔧 api

- Node.js
- Express.js
- OpenAI Vision API
- JWT Authentication
- MongoDB
- Prisma

## 🖥️ admin-ui

- React
- TypeScript
- Vite
- Rechart
- Zustand
- TailwindCSS v4 + ShadcnUI

---

# 📁 Project Structure

agrinova(root)/  
│  
├── pest-app/ # React Native mobile application (Farmers)  
├── api/ # Express Node.js backend (Image analysis + Auth)  
├── admin-ui/ # React TypeScript Admin Dashboard  
└── README.md

# 🚀 Installation Guide

## Step 1: Clone Repository

```bash
git clone https://github.com/awyyyn/agrinova
cd your-repo
```

## Step 2: Environment Variables Setup

Create .env files inside each project folder.

📁 api/.env

```JS
OPEN_API_KEY=your_open_api_key
DATABASE_URL=your_database_url
SALT=your_salt_number
ACCESS_TOKEN=your_access_token
REFRESH_TOKEN=your_refresh_token
RESET_TOKEN=your_reset_token
RESEND_API_KEY=your_resend_api_key
EMAIL=your_email
CLIENT_URL=your_frontend_url
```

📁 pest-app/.env

```ts
EXPO_PUBLIC_API_URL = your_api_url;
EXPO_PUBLIC_APPWRITE_ENDPOINT = your_appwrite_endpoint;
EXPO_PUBLIC_APPWRITE_PROJECT_ID = your_appwrite_project_id;
EXPO_PUBLIC_APPWRITE_PROJECT_NAME = your_appwrite_project_name;
```

📁 admin-ui/.env

```js
VITE_API_URL = your_api_url;
VITE_WS_URL = your_web_socket_url;
VITE_APPWRITE_ENDPOINT = your_appwrite_endpoint;
VITE_APPWRITE_PROJECT_ID = your_appwrite_project_id;
VITE_APPWRITE_PROJECT_NAME = your_appwrite_project_name;
```

## Step 3: Running the Project Locally

### 🔧 Run API Server

```bash
cd api
npm install
npm run dev
```

The server will start at:

```bash
http://localhost:5000
```

### 📱 Run pest-app (React Native)

```bash
cd pest-app
npm install
npx expo start
```

Then:

- Press a for Android emulator
- Press i for iOS simulator
- Or scan the QR code using Expo Go on your device

### 🖥️ Run admin-ui

```bash
cd admin-ui
npm install
npm run dev
```

Admin dashboard runs at:

```bash
http://localhost:5173
```

---

# 🔑 Authentication Flow

1. Farmer registers or logs in via pest-app
2. API validates credentials
3. JWT token is generated
4. Token is sent with future requests
5. Admin users have role-based access

---

# 🧪 Image Analysis Flow

1. Farmer uploads plant image
2. Image is sent to API
3. API forwards image to OpenAI Vision
4. AI returns plant disease analysis
5. Result is stored in database
6. Response is returned to the mobile app

---

# 📊 Admin Dashboard Features

- Total users count
- Total analyses performed
- Recent analysis logs
- User management (Create, Read, Update, Delete)
- Activity monitoring

---

# 🛡️ Security

- JWT-based authentication
- Password hashing using bcrypt
- Role-based access control
- Secure environment variables
- Protected API routes

---

# 📦 Production Build

## API

```bash
npm run build
npm start
```

## Admin UI

```bash
npm run build
```

Deploy the generated `dist/` folder.

## pest-app

```bash
eas build
```

---

# 📝 Future Improvements

- Push notifications
- Offline image upload queue
- Advanced AI confidence scoring
- Multi-language support
- Analytics dashboard improvements

---

# 👨‍🌾 Target Users

- Farmers
- Agricultural specialists
- Farm managers
- System administrators

---

# 📄 License

MIT License

---

# 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 🌿 Summary

This system provides a complete AI-powered agricultural solution:

- 📱 Mobile app for farmers
- 🔧 Backend for AI processing and authentication
- 🖥️ Admin dashboard for monitoring and management

Built to improve agricultural productivity through AI-driven plant disease detection.
