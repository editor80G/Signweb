# Signweb Client
## Overview

This is the client-side application for the **Signweb** project. It is a React-based web application that interacts with the backend server to provide features such as user authentication, publication management, and file downloads. The client is hosted on **Firebase Hosting**.

---

## Features

- **User Authentication and Authorization**: Secure login and access control.
- **Publication Management**: Display and manage magazines and catalogs.
- **File Downloads**: Authenticated users can download files.
- **Responsive Design**: User-friendly interface optimized for various devices.

---

## Hosting and Server Information

- **Client Hosting URL**:  
    [https://kinetic-physics-455419-c3.web.app](https://kinetic-physics-455419-c3.web.app)

- **Backend Server URL**:  
    The backend server is hosted on **Google Cloud Run**. Retrieve the server URL using the following command:  
    ```bash
    gcloud run services describe signweb-server --region=europe-west8
    ```
    Add the server URL to the `.env` file as `VITE_BASE_URL`.

---

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/signweb-client.git
cd signweb-client
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up the `.env` File
Create a `.env` file in the root directory and configure the following environment variable:
```env
# Backend server URL
VITE_BASE_URL=https://signweb-server-6655698061.europe-west8.run.app
```

### 4. Start the Development Server
```bash
cd client
```
```bash
npm run dev
```
The application will be available at [http://localhost:5173](http://localhost:5173).

---

## Deployment

The client is hosted on **Firebase Hosting**. To deploy the application, follow these steps:

1. Install Firebase CLI:
     ```bash
     npm install -g firebase-tools
     ```

2. Login to Firebase:
     ```bash
     firebase login
     ```

3. Deploy the Application:
     ```bash
     firebase deploy
     ```

---

## Project Structure

```plaintext
src/
├── components/        # Reusable React components
├── context/           # Context API for global state management
├── hooks/             # Custom React hooks
├── i18n/              # Internationalization (translations)
├── pages/             # Page components for routing
├── utils/             # Utility functions and API configuration
├── App.jsx            # Main application component
├── main.jsx           # Entry point for the React app

## Key Files

- **`src/context/AuthContext.js`**:  
    Manages authentication state using the React Context API.

- **`src/hooks/useAuthStatus.js`**:  
    Custom hook to check the user's authentication status.

- **`.env`**:  
    Contains environment variables for the project.

---

## Error Handling

The application includes an **Error Boundary** to handle unexpected errors in React components. This ensures that the application does not crash entirely if an error occurs in one of the components.

### How It Works

- If an error occurs in a child component, the `ErrorBoundary` component catches it and displays a fallback UI.
- The fallback UI informs the user that something went wrong and suggests reloading the page.

### Key File

- **`src/components/ErrorBoundary/ErrorBoundary.jsx`**:  
    This file contains the implementation of the `ErrorBoundary` component.

### Example

If an error occurs in a component, the user will see the following message:  
**"Something went wrong. Try to reload the page."**

### Benefits

- Prevents the entire application from crashing due to errors in specific components.
- Improves user experience by providing a clear fallback UI.

---

Technologies Used
Frontend: React, React Router, Axios
State Management: React Context API
Styling: CSS Modules
Hosting: Firebase Hosting

Troubleshooting
Common Issues
CORS Errors: Ensure the backend server is configured to allow requests from the client domain (https://kinetic-physics-455419-c3.web.app).

Authentication Issues: Verify that cookies are being sent with requests by enabling withCredentials in Axios.

Environment Variables Not Loaded: Ensure the .env file is correctly configured and restart the development server.

Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For any questions or issues, please contact the project maintainer at yuri.grebennikov@gmail.com.

