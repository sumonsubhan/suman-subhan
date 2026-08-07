# 📚 sumansubhan.com

> A modern, SEO-friendly digital platform for renowned Bangladeshi writer **Suman Subhan**, built to showcase books, poems, articles, songs, music videos, photo galleries, and literary events through a fast, responsive, and easy-to-manage content management system.

**🌐 Live Website:** https://www.sumansubhan.com

---

## 📖 Overview

**sumansubhan.com** is a full-stack web application designed to provide readers with a seamless experience exploring literary works while giving administrators a secure and intuitive dashboard to manage content.

The platform prioritizes:

- ⚡ Performance
- 🔍 Search Engine Optimization (SEO)
- 🔐 Security
- 📱 Responsive Design
- ♿ Accessibility
- 📈 Scalability
- 📝 Easy Content Management

---

# ✨ Features

## Public Website

- Responsive modern user interface
- Books with detailed pages
- Poems
- Articles
- Songs
- Music Videos
- Photo Gallery
- Events
- Search functionality
- Pagination
- SEO optimized pages
- Dynamic metadata
- Open Graph support
- Fast page loading
- Mobile-first design

---

## Admin Dashboard

A secure dashboard allowing administrators to manage every piece of content.

### Authentication

- Secure Admin Login
- JWT-based session management
- Protected routes

### Content Management

- Manage Books
- Manage Articles
- Manage Poems
- Manage Songs
- Manage Albums
- Manage Events
- Upload Images
- Rich Text Editor
- Publish & Update Content

---

# 🛠 Tech Stack

## Frontend

- Next.js (App Router)
- React.js
- Tailwind CSS
- DaisyUI
- Framer Motion
- Swiper.js

---

## Backend

- Next.js Server Actions
- MongoDB

---

## Authentication

- NextAuth.js
- JWT Session Strategy

---

## Image Storage

- Cloudinary

---

## Deployment

- Hostinger VPS
- PM2
- Nginx

---

# 📂 Project Structure

```text
.
├── public/
│   ├── asset/
│   ├── fonts/
│   └── favicon & static assets
│
├── services/
│   ├── getBooks.js
│   ├── getArticles.js
│   ├── getSongs.js
│   ├── getPoems.js
│   ├── getEvents.js
│   └── ...
│
├── src/
│   ├── actions/                 # Server Actions (CRUD Operations)
│   │   ├── add*.js
│   │   ├── update*.js
│   │   ├── delete*.js
│   │   ├── login.js
│   │   └── logout.js
│   │
│   ├── app/
│   │   ├── (clientsite)/        # Public Website
│   │   │   ├── about/
│   │   │   ├── books/
│   │   │   ├── articles/
│   │   │   ├── poems/
│   │   │   ├── songs/
│   │   │   ├── blogs/
│   │   │   ├── album/
│   │   │   └── trending-books/
│   │   │
│   │   ├── (adminpannel)/       # Admin Dashboard
│   │   │   ├── books/
│   │   │   ├── articles/
│   │   │   ├── poems/
│   │   │   ├── songs/
│   │   │   ├── gallery/
│   │   │   ├── events/
│   │   │   ├── comments/
│   │   │   └── blogs/
│   │   │
│   │   ├── api/
│   │   └── login/
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── articles/
│   │   ├── books/
│   │   ├── comments/
│   │   ├── editor/
│   │   ├── footer/
│   │   ├── header/
│   │   ├── home/
│   │   ├── pagination/
│   │   ├── skeleton/
│   │   ├── videos/
│   │   └── viewsTracker/
│   │
│   ├── data/
│   └── lib/
│
├── package.json
├── next.config.mjs
├── jsconfig.json
└── README.md
```

---

# 🗄 Database Collections

```
admins
albums
articleCategories
articleViews
articles
blogs
bookContents
bookViews
books
comments
events
photos
poems
songs
```

---

# ☁ Image Management

All uploaded images are stored securely in **Cloudinary**.

Features include:

- Image validation
- Automatic optimization
- Secure uploads
- Cloud storage
- Image replacement
- Delete unused images

---

# 🔐 Security

The project includes several security measures.

- Protected admin routes
- Server-side validation
- JWT authentication
- Password hashing
- Environment variable protection
- Secure file upload validation
- MongoDB injection prevention
- Authentication middleware
- Honeypot

---

# ⚡ Performance Optimizations

- Server Components
- Optimized Database Queries
- Pagination
- Lazy Loading
- Dynamic Metadata
- Image Optimization
- Code Splitting
- Static Rendering where applicable

---

# 🔍 SEO

The website is optimized for search engines using:

- Dynamic Metadata
- Open Graph Tags
- Twitter Cards
- Canonical URLs
- robots.txt
- sitemap.xml
- Semantic HTML

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop
- Laptop
- Tablet
- Mobile Devices

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone <repository-url>
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file in the project root.

```env
MONGODB_URI=

DB_NAME=

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=true

AUTH_SECRET=

NEXTAUTH_URL=

AUTH_TRUST_HOST=
```

---

## Run Development Server

```bash
npm run dev
```

---

## Production Build

```bash
npm run build
```

---

## Start Production Server

```bash
npm start
```

---

# 📦 Deployment

The project is configured for deployment on a VPS using:

- Ubuntu Server
- Node.js
- PM2
- Nginx
- MongoDB Atlas
- Cloudinary

---

# 🧩 Future Improvements

Potential enhancements include:

- Reader accounts
- Bookmarks
- Comments
- Newsletter subscription
- Reading history
- Related content recommendations
- Advanced search filters
- Multi-language support

---

# 🛡 Maintenance

The project is maintained through a monthly maintenance plan covering:

- Bug fixes
- Security updates
- Dependency updates
- Database maintenance
- Server monitoring
- Website backups
- Technical support

---

# 👨‍💻 Developer

**Munna Biswas**

Full Stack Developer

📧 Email: munna.dev345@gmail.com

🔗 GitHub: https://github.com/munnabiswas99

🌐 Portfolio: https://my-portfolio-orpin-pi-51.vercel.app

---

# 📄 License

This project is a **private client project** developed exclusively for **Suman Subhan**.

Unauthorized copying, redistribution, modification, or commercial use of this project is prohibited without written permission from the project owner.

---

## ⭐ Acknowledgement

Special thanks to **Suman Subhan** for the opportunity to design and develop this platform dedicated to promoting Bangla literature and creative works.