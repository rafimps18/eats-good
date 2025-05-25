# Recipe App

A React-based recipe application that allows users to browse and view detailed recipe information with an integrated chatbot for assistance.

## Features

- **Recipe Browsing**: Main content area displaying available recipes
- **Recipe Details**: Individual recipe pages with detailed information
- **Interactive Chatbot**: Built-in chat assistant for user support
- **Client-side Routing**: Smooth navigation between pages

## Tech Stack

- **React** - Frontend framework
- **React Router DOM** - Client-side routing
- **Vercel Analytics** - Usage analytics and insights
- **Tailwind CSS** - Utility-first CSS framework

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation header
│   ├── MainContent.jsx     # Home page content
│   ├── MealRecipePage.jsx  # Individual recipe page
│   ├── Footer.jsx          # Footer component
│   └── Chatbot.jsx         # Chat assistant
└── App.jsx                 # Main application component
```

## Routes

- `/` - Home page displaying main content
- `/recipe/:id` - Individual recipe page (dynamic route)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository

```bash
git clone https://github.com/rafimps18/eats-good.git
cd recipe-app
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm start
# or
yarn start
```

4. Open [http://localhost:5173](http://localhost:5173) to view the app

## Key Components

### App Component

The main application component that sets up routing, analytics, and the overall layout structure.

### Navigation

- **Navbar**: Top navigation component
- **Footer**: Bottom footer component

### Content

- **MainContent**: Landing page with recipe listings
- **MealRecipePage**: Detailed view for individual recipes accessed via `/recipe/:id`

### Interactive Features

- **Chatbot**: Persistent chat assistant available throughout the application

## Development

The application uses modern React patterns including:

- Functional components
- React Router for navigation
- Component-based architecture
- Responsive design with Flexbox layout

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request
