# Supabase Authentication
import os
from typing import Dict, Optional
from supabase import create_client, Client
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# Configurar cliente de Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("SUPABASE_URL and SUPABASE_KEY must be set in .env file")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def authenticate_user(email: str, password: str) -> Optional[Dict[str, str]]:
    """Authenticate user with email and password using Supabase Auth"""
    try:
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })

        if response.user:
            return {
                "id": response.user.id,
                "email": response.user.email,
                "username": response.user.user_metadata.get("username", email.split("@")[0])
            }
        return None
    except Exception as e:
        print(f"Authentication error: {e}")
        return None


def register_user(email: str, password: str, username: str) -> Optional[Dict[str, str]]:
    """Register a new user using Supabase Auth"""
    try:
        response = supabase.auth.sign_up({
            "email": email,
            "password": password,
            "options": {
                "data": {
                    "username": username
                }
            }
        })

        if response.user:
            return {
                "id": response.user.id,
                "email": response.user.email,
                "username": username
            }
        return None
    except Exception as e:
        print(f"Registration error: {e}")
        return None
