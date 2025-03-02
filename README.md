# Travel Quiz Frontend
This is the frontend for the Travel Quiz application. It is built using React.js and interacts with a backend API to provide a seamless quiz experience. Users can log in, answer quiz questions, challenge friends, and view their scores.

## Table of Contents
- [Features](#features)
- [Why This Project?](#why-this-project)
- [Setup](#setup)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [How It Works](#how-it-works)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

### Quiz:
- Fetch and display quiz questions.
- Submit answers and view results.
- Display fun facts after each question.

### Challenge Friends:
- Generate an invite link to challenge friends.
- Share the link via WhatsApp or directly.

### Score Tracking:
- Track correct and incorrect answers.
- Display the username and score on the quiz page.


## Why This Project?
This project was created to:
- Provide a fun and interactive way to test knowledge about travel destinations.
- Demonstrate the integration of a React frontend with a backend API.
- Showcase best practices for state management, API calls, and user authentication in React.
- Allow users to challenge friends and share their quiz results.

## Setup
### Prerequisites
- **Node.js**: Ensure you have Node.js installed. Download it from [here](https://nodejs.org/).
- **Backend**: Ensure the backend server is running. Follow the backend setup instructions.

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/travel-quiz-frontend.git
   cd travel-quiz-frontend
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Configure the Backend URL:**
   - Open the `.env` file (create one if it doesn't exist) and add the backend URL:
     ```env
     REACT_APP_BACKEND_URL=http://localhost:8000
     ```
4. **Run the Application:**
   ```bash
   npm start
   ```
   The application will start on `http://localhost:3000`.

5. **Access the Application:**
   - Open your browser and navigate to `http://localhost:3000`.

## Folder Structure
```
travel-quiz-frontend/
├── public/                  # Static assets
├── src/
│   ├── App.js               # Main application component
│   ├── App.css              # Global styles
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
├── .env                     # Environment variables
├── package.json             # Project dependencies
└── README.md                # Project documentation
```

## API Endpoints
The frontend interacts with the following backend API endpoints:

| Endpoint                | Method | Description                          |
|-------------------------|--------|--------------------------------------|
| `/api/v1/next_question`| GET    | Fetch the next quiz question.       |
| `/api/v1/submit_answer`| POST   | Submit an answer to the current question. |
| `/api/v1/invite` | POST   | Generate an invite link to challenge a friend. |

## How It Works

### Quiz:
- After logging in, the app fetches the next quiz question.
- Users can select an answer and submit it.
- The app displays the result and a fun fact.

### Challenge Friends:
- Users can enter a friend's username to generate an invite link.
- The link can be shared via WhatsApp or directly.

### Score Tracking:
- The app tracks the number of correct and incorrect answers.
- The score is displayed on the quiz page.

## Troubleshooting
### 1. API Calls Are Made Twice
- This is likely due to React Strict Mode in development. Disable it temporarily in `index.js`:
  ```javascript
  root.render(<App />);
  ```
- Ensure `useEffect` dependencies are correctly defined.

### 2. 401 Unauthorized Error
- Ensure the token is being passed correctly in the Authorization header.
- Check if the token is valid and not expired.

### 3. Questions Not Loading
- Check the backend logs to ensure the `/api/v1/next_question` endpoint is working.
- Verify that the token is being sent in the request headers.

### 4. Environment Variables Not Working
- Ensure the `.env` file is correctly configured and located in the root directory.
- Restart the development server after making changes to `.env`.

## Contributing
Contributions are welcome! Follow these steps:
1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a pull request.**

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

