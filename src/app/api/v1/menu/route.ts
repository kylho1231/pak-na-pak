import { NextRequest, NextResponse } from "next/server";
import { MENU_ITEMS } from "@/data/menuData";
import { MENU_CATEGORIES } from "@/data/storeData";
import { ApiResponse, MenuItem } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q")?.toLowerCase().trim();
    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : null;
    const featured = searchParams.get("featured");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));

    let filtered: MenuItem[] = [...MENU_ITEMS];

    // Category filter
    if (category && category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    // Search query filter
    if (query) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.badge?.toLowerCase().includes(query)
      );
    }

    // Max price filter
    if (maxPrice !== null && !isNaN(maxPrice)) {
      filtered = filtered.filter((item) => item.price <= maxPrice);
    }

    // Featured filter
    if (featured === "true") {
      filtered = filtered.filter((item) => item.isFeatured || item.isBestSeller);
    }

    const total = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginatedItems = filtered.slice(startIndex, startIndex + limit);

    const responsePayload: ApiResponse<{
      items: MenuItem[];
      total: number;
      categories: typeof MENU_CATEGORIES;
    }> = {
      success: true,
      data: {
        items: paginatedItems,
        total,
        categories: MENU_CATEGORIES,
      },
      error: null,
      meta: {
        page,
        limit,
        total,
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(responsePayload, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to retrieve menu catalog",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
