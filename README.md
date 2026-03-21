# GovServe

A modern MERN stack application with a beautiful login interface.

## Features

- **Frontend**: React + Vite with Tailwind CSS
- **Backend**: Node.js + Express with MongoDB
- **Authentication**: User login system
- **UI**: Modern, responsive design with animations

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Development**: ESLint, Babel, PostCSS

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/juls666-Xi/govserve.git
   cd govserve
   ```

2. Install dependencies:
   ```bash
   # Backend dependencies
   cd GovServe/server
   npm install

   # Frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   ```bash
   cd ../server
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   ```

4. Start MongoDB and the servers:
   ```bash
   # Start backend (from server directory)
   npm start

   # Start frontend (from client directory)
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## Project Structure

```
govserve/
├── GovServe/
│   ├── client/          # React frontend
│   ├── server/          # Node.js backend
│   └── package.json     # Root dependencies
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
