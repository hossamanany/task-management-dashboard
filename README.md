# Task Management Dashboard

A single-page application built with React and Redux for managing tasks, featuring a responsive design, state management, and additional interactive features.

## Features

- Display a list of tasks with details (title, description, due date, priority, status)
- Add, edit, and delete tasks
- Filter and search functionality for tasks
- Drag-and-drop functionality for updating task status
- Dark mode support
- Integration with a mock API (JSONPlaceholder) for data persistence

## Tech Stack

- Vite: Build tool and development server
- React: UI library
- React Router DOM: For routing
- Material-UI (MUI): UI component library
- Formik & Yup: Form management and validation
- Redux Toolkit: State management
- @hello-pangea/dnd: Drag and drop functionality
- Axios: HTTP client for API requests

## Project Setup

1. Ensure you have [Node.js](https://nodejs.org/) (v14 or newer) and npm installed on your machine.

2. Clone the repository:
   \`\`\`
   git clone https://github.com/hossamanany/task-management-dashboard.git
   \`\`\`

3. Navigate to the project directory:
   \`\`\`
   cd task-management-dashboard
   \`\`\`

4. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

5. Create a `.env` file in the root directory and add any necessary environment variables. For this project, you might not need any, but it's a good practice to have this step for future extensions.

6. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

7. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

Now you should see the Task Management Dashboard running locally on your machine!
