import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lmxlntgymiulgmuttqnl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxteGxudGd5bWl1bGdtdXR0cW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgxNDM2MzgsImV4cCI6MjA5MzcxOTYzOH0.cF1QLqUEpxy_YOKsZAZDp0kpiXBr63PF_7uiA3E5ELI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);