import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL="https://nzenfcbhrcfheebsdzev.supabase.co"
const SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56ZW5mY2JocmNmaGVlYnNkemV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NzM3MTAsImV4cCI6MjA4MjQ0OTcxMH0.KEpOjnEWqhzvmVv_BtKYsxnv_DhIEXylju9QVMTM8DI"

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabaseClient as supabase };