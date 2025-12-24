# Backend Deployment Guide

## Environment Setup

### Python Version
- **Python 3.11.9** (recommended for maximum compatibility)

### Local Development

1. **Create virtual environment:**
   ```powershell
   py -m venv venv
   ```

2. **Activate environment:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

3. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

4. **Run server:**
   ```powershell
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

## Supabase Configuration

### 1. Create Supabase Project
- Go to [supabase.com](https://supabase.com)
- Create a new project
- Get your project URL and API keys

### 2. Setup Environment Variables
Create a `.env` file in the backend directory:
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
ALLOWED_ORIGINS=http://localhost:5173,https://your-vercel-app.vercel.app
ENVIRONMENT=production
```

### 3. Database Setup
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

## Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Configure:
   - Build Command: `pip install -r requirements.txt`
   - Output Directory: `.`
   - Install Command: `pip install -r requirements.txt`

### Option 2: Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Option 3: Render
1. Create new Web Service
2. Connect repository
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## Environment Variables

Required for production:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_SERVICE_KEY`
- `ALLOWED_ORIGINS`
- `ENVIRONMENT`

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/chat` - Send chat message
- `GET /api/providers` - Get available AI providers
- `GET /api/models/{provider}` - Get models for provider

## Security Notes

- Never commit `.env` file
- Use environment variables for all secrets
- Enable CORS only for trusted origins
- Use HTTPS in production
