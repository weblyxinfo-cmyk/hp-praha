import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      select: {
        id: true,
        nameCs: true,
        nameEn: true,
        textCs: true,
        textEn: true,
        detailCs: true,
        detailEn: true,
        stars: true,
      },
    });
    return NextResponse.json(testimonials);
  } catch {
    return NextResponse.json([]);
  }
}
