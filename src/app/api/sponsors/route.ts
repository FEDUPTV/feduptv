import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../lib/supabase-admin";
import { isPortalAuthenticated, unauthorized } from "../../../lib/portalAuth";

function toNumber(value: unknown) {
  if (value === "" || value === undefined || value === null) return 0;
  const parsed = Number(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

export async function GET() {
  if (!(await isPortalAuthenticated())) return unauthorized();

  const { data, error } = await supabaseAdmin
    .from("sponsors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ sponsors: [], error: error.message }, { status: 500 });
  }

  return NextResponse.json({ sponsors: data });
}

export async function POST(request: Request) {
  if (!(await isPortalAuthenticated())) return unauthorized();

  const body = await request.json();
  const amount = toNumber(body.amount || body.revenue);
  const participation = amount * 0.2;

  const { data, error } = await supabaseAdmin
    .from("sponsors")
    .insert([
      {
        company: body.company,
        contact_name: body.contact_name,
        email: body.email,
        phone: body.phone,
        package: body.package,
        revenue: amount,
        amount,
        participation_amount: participation,
        paid: body.paid || false,
        invoice_date: body.invoice_date || null,
        renewal_date: body.renewal_date || null,
        status: body.status || "Lead",
        website_listing: body.website_listing,
        notes: body.notes,
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, sponsor: data });
}
