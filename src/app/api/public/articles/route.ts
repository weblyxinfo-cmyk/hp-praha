import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.searchParams.get("locale") || "cs";
    const articles = await prisma.article.findMany({
      where: { published: true, locale },
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        slug: true,
        locale: true,
        category: true,
        title: true,
        description: true,
        image: true,
        featured: true,
        publishedAt: true,
      },
    });
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json([]);
  }
}
