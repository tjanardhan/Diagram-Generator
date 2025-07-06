🧠 Diagram Generator

A simple AI-powered app that converts natural language prompts into D2 diagrams (network topologies, flowcharts, UML, etc.).



🔧 Features

* Prompt-based diagram generation
* AI-powered D2 code generation
* Instant diagram preview (SVG/PNG)
* Sample prompts with copy functionality
* Responsive and clean UI


 ⚙️ Tech Stack

* **Frontend**: React + Tailwind CSS
* **Backend**: Node.js + Express
* **AI Model**: Gemini (or OpenRouter LLMs)
* **Diagram Engine**: [D2](https://d2lang.com)

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/tjanardhan/Diagram-Generator/
cd diagram-generator
```

### 2. Setup backend

```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Fill in your OPENROUTER_API_KEY or GEMINI_API_KEY

# Start server
npm start
```

### 3. Setup frontend

```bash
cd ../frontend
npm install
npm run dev
```

App should run at `http://localhost:5173`

---

## 📁 Folder Structure

```
Diagram_generator/
├── backend/
│   ├── controllers/
│   ├── utils/
│   ├── diagrams/       # Generated diagram images
│   └── .env
├── frontend/
│   ├── src/pages/App.jsx
│   └── public/
```

---

## 📦 .env Example (Backend)

```
GEMINI_API_KEY=your_api_key
```

---

## 🖼️ Sample Prompts

```
"Generate a flowchart for Warehouse Management System"
"Client sends request to Server, and Server responds to Client"
"Router connects to a Switch, and Switch connects to PC1 and PC2"
"Make flowchart diagram for Airline Ticket Booking System"
```

---

## 📜 License
MIT © 2025 tjanardhan

---

## ✨ Author

Built with ❤️ by Janardhan
