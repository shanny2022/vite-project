import { createClient } from '@supabase/supabase-js';

const URL = 'https://eruprkcmlknxsfzarydi.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVydXBya2NtbGtueHNmemFyeWRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMTY5MDksImV4cCI6MjA5MTY5MjkwOX0.93wzfP9WdrHwWctX6mnJbSoLnjoHkcOBdBnsLA55o9M';

export const supabase = createClient(URL, API_KEY);
