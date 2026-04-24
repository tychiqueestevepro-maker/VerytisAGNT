import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if supabase is properly initialized
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_URL.startsWith('http')) {
      return NextResponse.json({ 
        error: "Supabase URL is invalid or missing in .env.local. It should start with https://" 
      }, { status: 500 });
    }

    const { 
      nom, 
      prenom, 
      email, 
      phone, 
      role, 
      orgType: org_type, 
      impact, 
      intention, 
      message,
      language 
    } = body;

    const { data, error } = await supabase
      .from("leads")
      .insert([
        { 
          nom, 
          prenom, 
          email, 
          phone, 
          role, 
          org_type, 
          impact, 
          intention, 
          message,
          language: language || 'FR'
        }
      ]);

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
