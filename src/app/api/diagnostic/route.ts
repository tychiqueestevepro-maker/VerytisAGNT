import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log the received data (pour debug)
    console.log("=== NOUVELLE DEMANDE DE DÉMO REÇUE ===");
    console.log(JSON.stringify(body, null, 2));
    
    // Insertion dans Supabase
    const { error } = await supabase
      .from('demo_requests')
      .insert([
        {
          prenom: body.prenom,
          nom: body.nom,
          email: body.email,
          phone: body.phone,
          org_type: body.orgType,
          role: body.role,
          impact: body.impact,
          intention: body.intention,
          message: body.message,
          raw_data: body // Optionnel: garder tout l'objet au cas où
        }
      ]);

    if (error) {
      console.error("Erreur Supabase:", error);
      throw error;
    }

    return NextResponse.json({ success: true, message: "Demande enregistrée avec succès." });
  } catch (error) {
    console.error("Erreur API diagnostic:", error);
    return NextResponse.json({ success: false, error: "Erreur lors de l'enregistrement." }, { status: 500 });
  }
}
