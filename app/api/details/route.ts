import { NextResponse } from "next/server";
import { getRegistrations } from "@/lib/db";

type Registration = {
  fullName: string;
  primaryContact: string;
  whatsappNumber: string;
  familyMembers: number;
  medicalConditions?: string;
  createdAt: string;
};

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password !== "display promotion") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const registrations = await getRegistrations();

    // Convert to CSV
    const headers = [
      "Full Name",
      "Primary Contact",
      "WhatsApp Number",
      "Family Members",
      "Medical Conditions",
      "Created At",
    ];
    const csvRows = [
      headers.join(","),
      ...registrations.map((row) =>
        [
          `"${row.fullName}"`,
          `"${row.primaryContact}"`,
          `"${row.whatsappNumber}"`,
          `"${row.familyMembers || 1}"`,
          `"${row.medicalConditions || ""}"`,
          `"${new Date(row.createdAt).toISOString()}"`,
        ].join(",")
      ),
    ];
    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=registrations.csv",
      },
    });
  } catch (error) {
    console.error("Error generating CSV:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}