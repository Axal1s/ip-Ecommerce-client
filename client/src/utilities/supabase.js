import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://uaqplzcxlmzigawetwsk.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcXBsemN4bG16aWdhd2V0d3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNDQyNzQsImV4cCI6MjAyODgyMDI3NH0.f7r5CuKRc60WFA4IRBtmt3HJRdz5lzj8A7QwwlbqRgI"
);

export default supabase;
