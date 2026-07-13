# Full-Stack Blog Platform

A modern, responsive, and fully functional full-stack blogging platform. Users can register, log in, create blog posts, leave comments, like posts, and manage their content through a personal dashboard.

## Features

- **Authentication:** Secure user registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Blog Management:** Create, edit, and delete blog posts with title, category, and content.
- **Interactions:** Comment on posts and like your favorite content.
- **Dashboard:** A personal user dashboard to manage created posts and view total post stats.
- **Responsive & Modern UI:** Built with HTML5, CSS3, Vanilla JS, and Bootstrap 5. Includes a dark/light mode toggle.
- **Search & Filter:** Search for posts by title and filter by categories.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** SQLite (default for development), PostgreSQL (supported)
- **ORM:** Sequelize

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone or open the project directory:**
   Ensure you are in the `Blog-Platform` directory.

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Database Configuration:**
   By default, the application is configured to use **SQLite**. This means a `database.sqlite` file will automatically be created in the root folder when you start the server, requiring zero setup!

   *Optional (PostgreSQL):* If you prefer to use PostgreSQL:
   - Edit the `.env` file.
   - Change `DB_DIALECT=postgres`.
   - Uncomment and configure your `DB_HOST`, `DB_USER`, `DB_PASS`, and `DB_NAME`.

4. **Start the server:**
   ```bash
   npm start
   ```
   (For development with auto-restart, use `npm run dev`)

5. **Access the application:**
   Open your browser and navigate to `http://localhost:5000`

## Project Structure

- `/public`: Contains all frontend assets (HTML, CSS, JS).
- `/models`: Sequelize database models (User, Post, Comment, Like).
- `/routes`: Express route definitions.
- `/controllers`: Business logic for the routes.
- `/middleware`: Authentication middleware for protected routes.
- `server.js`: Entry point for the Express backend.

## Security Features Included
- Password hashing with `bcryptjs`
- Stateless authentication with `jsonwebtoken`
- Basic security headers with `helmet`
- SQL injection protection via `Sequelize` ORM parameterization

Enjoy blogging!
