
#  Generative AI Chatbot (MERN Stack)

A full-stack AI Chatbot built using the MERN stack that supports multi-session conversations, persistent chat history, sidebar session management, and AI-generated replies using the Gemini API. Users can create new chats, switch between sessions, and view previous conversations with markdown-formatted responses.

##  Features

* AI-powered chat responses
* Multi-session chat support
* Persistent chat history in MongoDB
* Sidebar with session list
* Session title based on first user message
* Markdown rendering for AI replies
* Responsive Tailwind CSS UI
* New chat creation
* Session switching
* REST API backend
* Postman-testable endpoints

---

##  Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Markdown

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Gemini API SDK
* dotenv

---

## 📁 Project Structure

```
root/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── main.jsx
```

---

## ⚙️ Backend Setup

### Install dependencies

```bash
cd backend
npm install
```

### Create `.env`

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_api_key
```

### Run backend server

```bash
node server.js
```

---

## 🎨 Frontend Setup

### Install dependencies

```bash
cd frontend
npm install
```

### Run frontend

```bash
npm run dev
```

---

## 🔌 API Endpoints

### Send Chat Message

```
POST /api/chat
```

Body:

```json
{
  "message": "Hello AI",
  "sessionId": "session_123"
}
```

---

### Get Chat History

```
GET /api/history/:sessionId
```

---

### Get All Sessions

```
GET /api/sessions
```

---

## 💾 Database Schema

```js
{
  sessionId: String,
  messages: [
    {
      role: String,
      text: String,
      time: Date
    }
  ]
}
```

---

## 🧠 Session Title Logic

Sidebar session names are generated automatically:

* Uses first user message
* Trimmed to first 40 characters
* Fallback name: `"New Chat"`

---

## 🖥️ UI Behavior

* New Chat button creates a new session
* Sidebar displays all sessions
* Clicking a session loads its chat history
* Messages render with markdown support
* Loading indicator while AI responds

---

## 🧪 Testing with Postman

Example:

```
POST http://localhost:8000/api/chat
```

Body → JSON:

```json
{
  "message": "Explain MySQL",
  "sessionId": "test_001"
}
```

---

## 🔐 Environment Variables

Required:

```
MONGO_URI
GEMINI_API_KEY
```

Do not commit `.env` to version control.

---

## 📌 Future Improvements

* User authentication
* Rename chat sessions
* Delete sessions
* Streaming AI responses
* Voice input
* File upload context
* Export chat feature

---

## 👨‍💻 Author

Mayank Thapliyal
MERN + AI Chatbot Project

---

If you want, I can also generate a shorter internship-submission version or one with screenshots section next. Just say the word.
