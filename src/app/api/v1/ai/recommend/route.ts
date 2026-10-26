import { NextRequest, NextResponse } from "next/server";
import { getAiRecommendation } from "@/lib/geminiRecommender";
import { AiRecommendationRequest, ApiResponse, AiRecommendationResult } from "@/types";

export async function POST(request: NextRequest) {
  try {
    let body: AiRecommendationRequest;

    try {
      body = await request.json();
    } catch {
      const badRequestResponse: ApiResponse<null> = {
        success: false,
        data: null,
        error: {
          code: "INVALID_JSON_BODY",
          message: "Request body must be a valid JSON object.",
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      };
      return NextResponse.json(badRequestResponse, { status: 400 });
    }

    if (!body || typeof body.query !== "string" || body.query.trim().length === 0) {
      const validationErrorResponse: ApiResponse<null> = {
        success: false,
        data: null,
        error: {
          code: "VALIDATION_ERROR",
          message: "Field 'query' is required and must be a non-empty string.",
          details: { field: "query", constraint: "required" },
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      };
      return NextResponse.json(validationErrorResponse, { status: 422 });
    }

    const recommendation = await getAiRecommendation({
      query: body.query.trim(),
      budget: typeof body.budget === "number" ? body.budget : undefined,
      pax: typeof body.pax === "number" ? body.pax : undefined,
      preferences: Array.isArray(body.preferences) ? body.preferences : undefined,
      diningType: body.diningType || "delivery",
    });

    const responsePayload: ApiResponse<AiRecommendationResult> = {
      success: true,
      data: recommendation,
      error: null,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    const errorResponse: ApiResponse<null> = {
      success: false,
      data: null,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to generate AI recommendation.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      meta: {
        timestamp: new Date().toISOString(),
      },
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
