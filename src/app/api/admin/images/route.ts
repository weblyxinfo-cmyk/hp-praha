import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const images = await prisma.siteImage.findMany();
  return NextResponse.json(images);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slot, url, alt } = await req.json();
  const image = await prisma.siteImage.upsert({
    where: { slot },
    update: { url, alt },
    create: { slot, url, alt },
  });
  return NextResponse.json(image);
}
