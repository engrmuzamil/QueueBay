Here is the **final `README.md`** for your **QueueBay** backend project — complete, professional, and deployment-ready:

---

```markdown
# 🛍️ QueueBay — AI-Powered C2C Marketplace (Backend)

QueueBay is a modern, AI-first consumer-to-consumer (C2C) marketplace built using **Next.js**, **Firebase**, and **GPT-4** (Text + Vision). It empowers users to list products, negotiate prices, track orders, and generate content using AI — all seamlessly from a mobile-first interface.

---

## 🚀 Tech Stack

- **Framework**: Next.js (App Router)
- **Backend Services**: Firebase Admin SDK (Firestore, Auth, Cloud Storage)
- **Authentication**: Firebase Authentication (ID token)
- **AI Engine**: OpenAI GPT-4 (Text + Vision APIs via `fetch`)
- **Storage**: Firebase Cloud Storage
- **Deployment**: Vercel + Firebase

---

## 📁 Folder Structure
```

queuebay-backend/
├── public/ # Static assets
├── src/
│ ├── app/ # Next.js App Router structure
│ │ ├── api/ # All backend API endpoints
│ │ │ ├── profile/
│ │ │ │ └── setup.js
│ │ │ ├── listings/
│ │ │ │ └── create.js
│ │ │ ├── negotiations/
│ │ │ │ └── start.js
│ │ │ ├── orders/
│ │ │ │ └── track.js
│ │ │ ├── dashboard.js
│ │ │ ├── wishlist.js
│ │ │ ├── watchlist.js
│ │ │ ├── performance.js
│ │ │ └── verify-token.js
│ ├── lib/ # Reusable logic and integrations
│ │ ├── firebaseAdmin.js # Firebase Admin SDK setup
│ │ ├── openai.js # GPT-4 API wrapper
│ │ └── utils/
│ │ ├── auth.js # Token verification helper
│ │ ├── firestore.js # Read/write Firestore
│ │ └── gpt.js # GPT prompt builders
├── .env.local # Environment variables (not committed)
├── .gitignore
├── next.config.js
├── package.json
└── README.md

````

---

## 🧪 Local Setup

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/queuebay-backend.git
cd queuebay-backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create `.env.local` with the following:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
NODE_ENV=development
```

⚠️ Ensure `FIREBASE_PRIVATE_KEY` includes escaped newlines (`\n`) and is enclosed in double quotes.

---

## ▶️ Start Dev Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🔐 Authentication

All protected API routes require an **ID token** (Firebase Authentication) via:

```http
Authorization: Bearer <your-id-token>
```

If invalid or missing, returns: `401 Unauthorized`.

---

## 📦 API Structure & Examples

| Endpoint                  | Method | Description                             |
| ------------------------- | ------ | --------------------------------------- |
| `/api/profile/setup`      | POST   | Save user profile to `users` collection |
| `/api/listings/create`    | POST   | Upload image → GPT-4 → Save listing     |
| `/api/negotiations/start` | POST   | Start or update negotiation thread      |
| `/api/orders/track`       | POST   | Update order status + upload photo      |
| `/api/dashboard`          | GET    | Aggregate user listings and sales       |
| `/api/performance`        | GET    | Seller analytics (orders, ratings)      |
| `/api/wishlist`           | GET    | Fetch buyer wishlist                    |
| `/api/watchlist`          | GET    | Fetch alerts/watchlist                  |
| `/api/verify-token`       | POST   | Debug token validity                    |

_All API responses follow:_

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

---

## 🤖 GPT-4 Integration

**Image-based Listing Extraction (Vision API)**

Example Prompt:

> "Extract product details in JSON. Return `title`, `description`, `condition`, `estimated_price`, `defects`."

Response:

```json
{
  "title": "iPhone 13 Pro",
  "description": "Apple device, excellent condition",
  "condition": "Like new",
  "estimated_price": "900",
  "defects": "None"
}
```

**Negotiation Summaries (Text API)**

Used to:

- Summarize buyer/seller chats
- Generate polite counters
- Respond to lowball offers

---

## 🧠 AI-Driven Screens

| Screen Name       | GPT Usage                           |
| ----------------- | ----------------------------------- |
| Create Listing    | GPT-4 Vision - product extraction   |
| Start Negotiation | GPT-4 Text - offer generation       |
| Order Tracker     | GPT-4 Text - status summaries       |
| Seller Dashboard  | GPT-4 Text - analytics explanations |
| Alerts/Watchlist  | GPT-4 Text - notify similar items   |

---

## 🔐 Firebase Setup

1. Enable in Firebase Console:

   - Firebase Auth
   - Firestore
   - Storage

2. Create a service account (Admin SDK)
3. Add the credentials to `.env.local`

---

## ☁️ Deploy to Production

### Vercel (Frontend + API)

- Add `.env.production` to Vercel dashboard
- Connect to your GitHub repo
- Set build command: `npm run build`
- Output directory: `.next`

### Firebase

- Use Firebase Hosting or Functions (optional)
- Firebase is used only for storage, auth, and Firestore

---

## ✅ Best Practices

- All backend calls go through secure Firebase Admin verification
- Firestore documents use server timestamps and proper references
- GPT-4 prompts are short, JSON-return-only
- Modular utilities for reuse and testing

---

## 🧭 Roadmap

- ✅ Create Listings with GPT-4 Vision
- ✅ Realtime Negotiation Support
- ✅ QR-based COD Delivery Confirmation

---

## 📝 License

MIT License — Open to use, contribute, and adapt.

---

## 👨‍💻 Author

Built with ❤️ by [Muzamil Khan](https://github.com/engrmuzamil), [Areeb Ahmad](https://github.com/engrmuzamil) and [Waleed Daud](https://github.com/engrmuzamil)
