# Today

![cover](.github/image.png?style=flat)

A simple project to manage tasks built with TypeScript, Redux, Air Datepicker and Tailwind CSS.

You can access the deployed version of this project [here](https://today-vert.vercel.app).

## Features

- **Task Management**: Add, edit, delete, and toggle tasks as completed.
- **Date Picker**: Use Air Datepicker to select specific dates for tasks.
- **Search Functionality**: Filter tasks based on a search query.
- **Category Filtering**: Filter tasks by category.
- **State Persistence**: Tasks and settings (e.g., selected day) are saved in `localStorage` for persistent data across sessions.
- **Responsive UI**: Fully responsive design with Tailwind CSS, optimized for both desktop and mobile.

## Getting Started

### Prerequisites

- Node.js and npm (if running locally).
- Docker installed (if running with Docker).

## Running the Application

You can run this application either with Docker or locally on your machine.

### Option 1: Running with Docker

1. Clone the repository:

```bash
  git clone https://github.com/AlexandreDresch/Today.git
```

2. Navigate to the project directory:

```bash
  cd Today
```

3. Build and start the Docker containers:

```bash
  docker-compose up --build
```

4. Open your browser and navigate to:

```bash
  http://localhost:5173
```

5. To stop the Docker containers:

```bash
  docker-compose down
```

### Option 2: Running Locally (Without Docker)

1. Clone the repository:

```bash
  git clone https://github.com/AlexandreDresch/Today.git
```

2. Navigate to the project directory:

```bash
  cd Today
```

3. Install dependencies:

```bash
  npm install
```

4. Start the development server:

```bash
  npm run dev
```

5. Open your browser and navigate to:

```bash
  http://localhost:5173
```

## Scripts

- **dev**: Starts the Vite development server.
- **build**: Builds the project using TypeScript and Vite.
- **preview**: Runs a Vite preview of the built app.