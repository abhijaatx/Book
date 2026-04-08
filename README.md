# Kahaani Books 📖✨
**Premium Handcrafted Personalized Gifting for India**

Kahaani Books is a high-performance, storytelling-driven e-commerce platform built for the modern Indian gifting market. Specializing in bespoke anniversary books, wedding albums, and baby milestone keepsakes, it combines a luxury aesthetic with a robust multi-step personalization workflow.

## 🚀 Built With
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4
- **Animations**: Framer Motion (Fluid Wizard Transitions)
- **State Management**: Zustand (Persistent Shopping Cart)
- **Icons**: Lucide React
- **Database**: Prisma ORM with PostgreSQL
- **Payments**: Razorpay Integration (Ready)

## ✨ Key Features
- **Premium Storefront**: A storytelling-first UI with blush, plum, and ivory tones.
- **Personalization Wizard**: A 5-step custom book creator (Names, Photos, Stories, Messages).
- **Indian Market Ready**: 
  - **Checkout**: Single-page checkout with Indian address formats and pincode support.
  - **Payments**: Razorpay order and signature verification APIs.
  - **Shipping**: Localized for 19,000+ Indian pincodes.
- **Admin Dashboard**: A secure back-office for managing orders, viewing custom messages, and downloading user-uploaded assets for production.

## 📦 Getting Started

### 1. Prerequisites
- Node.js 18+
- PostgreSQL Database
- Razorpay Account (for keys)

### 2. Installation
```bash
# Install dependencies
npm install

# Setup Database
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 3. Environment Variables
Create a `.env` file in the root based on `.env.example`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/kahaani_books"

RAZORPAY_KEY_ID="rzp_test_..."
RAZORPAY_KEY_SECRET="..."

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="replace-with-a-long-random-secret"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your store.

## 📂 Project Structure
- `src/app/personalize/[slug]`: The core Personalization Wizard logic.
- `src/app/checkout`: Indian-localized checkout flow.
- `src/app/admin`: Order management and asset retrieval dashboard.
- `src/store`: Cart persistence using Zustand.
- `prisma/`: Database schema and seeding scripts.

## 🎨 Creative Direction
The design is inspired by high-end romantic storytelling (LoveStoryBook) and premium functional assortments (OddGiraffe). It utilizes **Playfair Display** for a luxury editorial feel and **Inter** for crisp usability.

---
*Handcrafted with ❤️ in New Delhi, India.*
