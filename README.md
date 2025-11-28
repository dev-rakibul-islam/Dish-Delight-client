# 🍽️ Dish Delight - Client

A modern, responsive restaurant web application built with Next.js 16, featuring a premium UI with smooth animations and authentication. Browse delicious dishes, manage products, and enjoy a seamless dining experience.

## 📋 Project Description

**Dish Delight** is a full-stack restaurant management platform that allows users to:

- Browse and explore a catalog of delicious food items
- View detailed information about each dish including pricing, availability, and descriptions
- Create an account and authenticate securely
- Add new products to the menu (authenticated users)
- Manage existing products (authenticated users)
- Enjoy a modern, mobile-responsive interface with premium animations

Built with cutting-edge technologies including Next.js 16, React 19, Tailwind CSS 4, and Framer Motion for stunning visual effects.

## 🚀 Setup & Installation

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** or **yarn** package manager
- **Git** for version control

### Installation Steps

1. **Clone the repository:**

```bash
git clone <repository-url>
cd dishdelight-client
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and configure:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

4. **Run the development server:**

```bash
npm run dev
# or
yarn dev
```

5. **Open in browser:**
   Navigate to `http://localhost:3000` to see the application running.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Deployment

Deploy to Vercel with one command:

```bash
npm install -g vercel
vercel --prod
```

## 📍 Route Summary

### Public Routes

| Route        | Component        | Description                                                |
| ------------ | ---------------- | ---------------------------------------------------------- |
| `/`          | `Home Page`      | Landing page with hero section, features, and testimonials |
| `/about`     | `About Page`     | Information about Dish Delight restaurant                  |
| `/all-items` | `Items Explorer` | Browse all available dishes with filters                   |
| `/item/[id]` | `Item Details`   | Detailed view of individual dish with full information     |
| `/contact`   | `Contact Page`   | Contact form and business information                      |
| `/login`     | `Login Form`     | User authentication with email and password                |
| `/register`  | `Register Form`  | New user registration                                      |

### Protected Routes (Authentication Required)

| Route              | Component          | Description                              |
| ------------------ | ------------------ | ---------------------------------------- |
| `/add-product`     | `Add Product Form` | Create and add new dishes to the menu    |
| `/manage-products` | `Manage Products`  | View, edit, and delete existing products |

### API Routes

| Route                     | Method     | Description                       |
| ------------------------- | ---------- | --------------------------------- |
| `/api/auth/[...nextauth]` | `GET/POST` | NextAuth authentication endpoints |

## 🎨 Key Features

- ✨ **Premium UI/UX** - Glass-morphism effects, smooth animations, and modern design
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- 🔐 **Authentication** - Secure user authentication with NextAuth.js
- 🎬 **Smooth Animations** - Framer Motion animations for delightful interactions
- 🌓 **Modern Styling** - Tailwind CSS with gradient, blur effects, and custom components
- ⚡ **Performance** - Next.js optimization, image optimization, and fast loading
- 🍳 **Food-Focused** - Intuitive interface specifically designed for restaurant browsing
- 🎯 **User Management** - Add and manage restaurant products easily

## 📦 Tech Stack

- **Framework:** Next.js 16.0.4
- **UI Library:** React 19.2.0
- **Styling:** Tailwind CSS 4 + DaisyUI
- **Animation:** Framer Motion 12.23.24
- **Authentication:** NextAuth.js 4.24.13
- **Forms:** React Hook Form 7.66.1
- **HTTP Client:** Axios 1.13.2
- **Icons:** React Icons 5.5.0
- **Notifications:** React Hot Toast 2.6.0
- **Code Quality:** ESLint 9, Babel Plugin React Compiler

## 📁 Project Structure

```
dishdelight-client/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   ├── about/             # About page
│   │   ├── add-product/       # Add product page
│   │   ├── all-items/         # Items listing
│   │   ├── contact/           # Contact page
│   │   ├── item/[id]/         # Item details
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   ├── manage-products/   # Manage products
│   │   ├── layout.js          # Root layout
│   │   ├── page.js            # Home page
│   │   ├── loading.js         # Loading component
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── auth/              # Auth components
│   │   ├── cards/             # Card components
│   │   ├── catalog/           # Catalog components
│   │   ├── common/            # Reusable components
│   │   ├── forms/             # Form components
│   │   ├── layout/            # Layout components
│   │   ├── products/          # Product components
│   │   ├── providers/         # Context providers
│   │   └── sections/          # Page sections
│   ├── lib/                   # Utilities and helpers
│   ├── utils/                 # Utility functions
│   └── public/                # Static assets
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── next.config.mjs            # Next.js configuration
└── README.md                  # This file
```

## 🔗 API Integration

The application connects to a backend API for:

- Fetching dish information
- User authentication and authorization
- Product management (create, read, update, delete)

API endpoint is configured via `NEXT_PUBLIC_API_URL` environment variable.

## 🎯 Getting Started Tips

1. **First Time?** Start by exploring `/all-items` to browse available dishes
2. **Want to Add Products?** Create an account via `/register` then navigate to `/add-product`
3. **Explore Details?** Click on any dish card to view comprehensive details including pricing and availability
4. **Mobile Friendly?** All features work perfectly on mobile devices with responsive design

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [NextAuth.js Docs](https://next-auth.js.org/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📝 License

This project is part of the Dish Delight restaurant management platform.

## 👨‍💻 Author

**Dish Delight Development Team**

- Repository: [dev-rakibul-islam](https://github.com/dev-rakibul-islam)

---

**Happy Coding! Enjoy building amazing food experiences with Dish Delight! 🍽️✨**
