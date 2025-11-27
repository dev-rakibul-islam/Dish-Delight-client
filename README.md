### Next.js Task

Build a simple application using Next.js (App Router). The app should have public and protected pages with authentication using NextAuth.js.
You can choose any idea to implement the task, e.g., event management, course management, eCommerce, blog, etc or any of your custom ideas.
Focus on polished UI, responsiveness, and layout consistency. Functionality can be minimal but must include the protected page and login.

### Project Name: Dish Delight

### Project Description

Dish Delight is a simple food item management application built with Next.js and NextAuth.js. It allows users to view a list of food items, see detailed information about each item, and manage their own food items through protected pages. The application features a polished UI, responsive design, and consistent layouts to ensure a seamless user experience across devices.

# add item data structure for food items:

    EXAMPLE FOOD ITEM DATA STRUCTURE:
    {
        "_id": "642c155b2c4774f05c36eeaa",(unique identifier-MONGODB generated It)
        "name": "Haddock",
        "recipe": "Chargrilled fresh tuna steak (served medium rare) on classic Niçoise salad with French beans.",
        "image": "https://cristianonew.ukrdevs.com/wp-content/uploads/2016/08/product-1-370x247.jpg",
        "category": "salad",
        "price": 14.7
    },

# Note: This is a sample data structure representing food items in the Dish Delight application. Each item includes an ID, name, recipe, image URL, category, and price. i will insert it manually to a database or a JSON file to simulate API responses later. You crate collection or JSON file as per your need.

### Google OAuth Credentials

- Client ID: YOUR_GOOGLE_CLIENT_ID
- Client Secret: YOUR_GOOGLE_CLIENT_SECRET

These values should be wired up via `.env` (see `.env.example`).
The app falls back to email/password if Google creds are not supplied,
but once you set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` the
NextAuth Google flow becomes available.

### Requirements

1. Landing Page (Must include 7 sections):
   ## Home Page
   - Navbar – logo, 4+ routes(Home, About, All Services, Contact), login/register, sticky, responsive
   * After login, show a dropdown with:
     - Logged-in user info (replacing login/register)
     - Add Product
     - Manage Products
     * Hero – headline, subtitle, primary CTA, optional background
     * 4 Relevant Sections – choose based on theme (e.g., features, items, testimonials, banner)
       - Cards/layout must be uniform with hover/focus states
       - Clear hierarchy, spacing, and responsive design
     * Footer – links, optional social icons, copyright, consistent spacing
2. Login/Register Page
   - Social login (Google) and credentials form
   - Redirect to home (/) after login
3. All Item List Page:
   - Page title + short description
   - Search bar and optional category filter (UI only)
   - Grid of minimum 6 cards
   - Each card includes:
     - Image or icon
     - Title
     - Short description (1–2 lines, ellipsis)
     - Price/meta
     - Details button
4. Item Details Page
   - Large image/banner
   - Product title
   - Full description
   - Meta info (price/date/priority)
   - Back button
5. Protected Page: Add Product
   - Only accessible when logged in; redirect others to /login
   - Form fields:
     - Title
     - Short description
     - Full description
     - Price/date/priority/relevant field
     - Optional image URL
   - Buttons: Submit (add)
   - On success: show toast or confirmation message
6. Protected Page: Manage Products
   - List all products in a table/grid
   - Each row/card with actions: View, Edit, Delete
   - Layout should be clean, readable, and responsive
7. Overall UI Guidelines
   - Layout & Responsiveness – consistent spacing, clean layouts, adaptive for mobile/tablet/desktop.
   - Typography & Colors – clear hierarchy, readable fonts, consistent color palette.
   - Cards, Lists & Forms – uniform cards with hover/focus, responsive grids, clean forms with inline validation and optional loading states.
   - Interactions & Consistency – hover/focus for interactive elements, visual consistency across pages, optional micro-animations.

### Technologies

    - Next.js (App Router ) for the frontend application
    - NextAuth.js for authentication
    - Backend: simple Express.js server

### Backend Endpoints

    -mongoDB uri: const uri = "mongodb+srv://dishdelight:G56YMPYiCZnILVSE@cluster0.dojua2g.mongodb.net/?appName=Cluster0";
