# A1 Chairs — Website

Full-stack MERN (MongoDB, Express, React, Node.js) website for **A1 Chairs**, a chair manufacturing and repairing business in Vasai East, Palghar, Maharashtra, India.

## Business Details

- **Business:** A1 Chairs
- **Tagline:** Manufacturing & Repairing Of All types Of Chairs & Furniture
- **Contact:** Jahir Ali | **Phone:** 9956960045
- **Address:** Gala No. 6, S.R. No. 54/1, R.K. Compound, Opp. Bhajanlal Studio, Near - Kolhi, Kaman, Vasai East, Palghar - 401 208

## Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS, Axios, Lucide icons
- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Images:** Cloudinary (admin uploads)
- **Auth:** JWT + bcrypt (admin panel only)
- **Email:** Nodemailer via Brevo SMTP (enquiry notifications)

## Project Structure

```
A1-Chairs/
├── client/          # React (Vite) frontend
│   ├── src/
│   │   ├── components/    # Navbar, Footer, FloatingButtons, ProductCard, etc.
│   │   ├── context/       # AuthContext (admin token)
│   │   ├── pages/         # Public pages
│   │   │   └── admin/     # Admin pages (login, dashboard, CRUD)
│   │   └── utils/         # Axios instance, constants
│   └── vite.config.js     # dev proxy: /api -> localhost:5001
└── server/          # Node/Express backend
    ├── config/       # DB, Cloudinary, Nodemailer setup
    ├── models/       # Mongoose schemas
    ├── middleware/   # JWT auth, error handler
    ├── routes/       # Public + Admin API routes
    └── scripts/      # seedAdmin.js (create default admin)
```

## Getting Started

### 1. Backend (`server/`)

```bash
cd server
npm install
cp .env.example .env   # then fill in real values
npm run seed           # creates default admin (admin / admin123)
npm run dev            # starts on http://localhost:5001
```

### 2. Frontend (`client/`)

```bash
cd client
npm install
npm run dev            # starts on http://localhost:3001
```

Open `http://localhost:3001`. Admin panel is at `http://localhost:3001/admin`.

## Environment Variables (`server/.env`)

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing admin JWT tokens |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `PORT` | Server port (default 5000) |
| `BREVO_SMTP_HOST` | `smtp-relay.brevo.com` |
| `BREVO_SMTP_PORT` | `587` |
| `BREVO_SMTP_USER` | Brevo account login email |
| `BREVO_SMTP_KEY` | Brevo SMTP key |
| `NOTIFY_EMAIL` | Business owner email that receives enquiry notifications |

## API Routes

**Public**

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/products` | List products (`?category=&search=&minPrice=&maxPrice=`) |
| GET | `/api/products/:id` | Product detail |
| GET | `/api/categories` | List categories |
| GET | `/api/gallery` | List gallery images |
| POST | `/api/enquiries` | Submit enquiry (+ Brevo email notification) |

**Admin (JWT protected)**

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/admin/login` | Login, returns JWT |
| POST | `/api/admin/products` | Create product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product |
| POST | `/api/admin/categories` | Create category |
| DELETE | `/api/admin/categories/:id` | Delete category |
| POST | `/api/admin/gallery` | Upload gallery image |
| DELETE | `/api/admin/gallery/:id` | Delete gallery image |
| GET | `/api/admin/enquiries` | List enquiries |
| PUT | `/api/admin/enquiries/:id` | Update enquiry status |
| GET | `/api/admin/dashboard-stats` | Dashboard stats |

## Notes

- Enquiry submissions succeed even if the email fails; the error is logged server-side only.
- The seed script creates a default admin (`admin` / `admin123`) — **change the password after first login**.
- Vite dev server proxies `/api` to `localhost:5001`, so no CORS config is needed in development.