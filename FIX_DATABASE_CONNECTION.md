# 🔧 Fix Database Connection

## ⚠️ Current Problem

Your `.env` file has:
```
DATABASE_URL="postgresql://...@localhost:5432/ai_note_taker"
```

But you're using **Neon cloud database**, not a local PostgreSQL server!

---

## ✅ Solution: Update Your .env File

### Step 1: Get Your Neon Connection String

1. Go to: https://console.neon.tech/
2. Log in to your account
3. Select your project
4. Find **"Connection String"** or **"Connection Details"**
5. Copy the **PostgreSQL connection string**

### Step 2: Update Your .env File

Open your `.env` file and **replace** the DATABASE_URL line with your Neon connection string.

**Example format:**
```env
DATABASE_URL="postgresql://username:password@ep-proud-haze-adxijfjm-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require"
OPENAI_API_KEY=sk-your-actual-key-here
OPENAI_MODEL=gpt-4o-mini
OPENAI_MAX_TOKENS=2000
```

### Step 3: Sync Database

After updating `.env`, run:

```bash
npx prisma db push
npx prisma generate
```

---

## 🔍 How to Know Your Neon Server

From earlier error logs, your Neon server is:
```
ep-proud-haze-adxijfjm-pooler.c-2.us-east-1.aws.neon.tech
```

Your connection string should include this hostname!

---

## 🧪 Test Your Setup

After fixing the DATABASE_URL, test:

### 1. Test Database Connection
```bash
npx prisma db push
```
✅ Should say "Your database is now in sync"

### 2. Test OpenAI Connection
Visit: http://localhost:3000/ai-demo

Try the "Generate Sample Note" button (doesn't need database)

---

## 🆘 Alternative: Create New Neon Database

If you can't find your connection string:

1. Go to https://neon.tech/
2. Create a new FREE project
3. Copy the connection string they give you
4. Paste it in your `.env` file

---

## 📋 Checklist

- [ ] Open `.env` file
- [ ] Replace DATABASE_URL with Neon connection string
- [ ] Keep OPENAI_API_KEY as is
- [ ] Save file
- [ ] Run `npx prisma db push`
- [ ] Run `npx prisma generate`
- [ ] Run `npm run dev`
- [ ] Test at http://localhost:3000

---

**Need help?** Show me the error message after you update the DATABASE_URL and I'll help debug!

