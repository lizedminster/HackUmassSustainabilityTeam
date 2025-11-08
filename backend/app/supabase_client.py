# app/supabase_client.py
import os
from dotenv import load_dotenv
from supabase import create_client

# Load .env variables from the project root
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
