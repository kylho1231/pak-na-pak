import { NextRequest, NextResponse } from "next/server";
import { ApiResponse, AnalyticsDashboardData } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const data: AnalyticsDashboardData = {
      kpis: [
        {
          id: "daily-rev",
          label: "Estimated Daily Revenue",
          value: "₱14,850",
          change: "+18.4%",
          isPositive: true,
          period: "vs. yesterday",
        },
        {
          id: "total-orders",
          label: "Dispatched Orders",
          value: "86",
          change: "+12.1%",
          isPositive: true,
          period: "deliveries & dine-in",
        },
        {
          id: "avg-ticket",
          label: "Average Order Value",
          value: "₱172.60",
          change: "+5.2%",
          isPositive: true,
          period: "per customer ticket",
        },
        {
          id: "top-courier",
          label: "Top Courier Partner",
          value: "Mr. Cartman",
          change: "46% share",
          isPositive: true,
          period: "San Jose deliveries",
        },
      ],
      categoryMetrics: [
        {
          category: "Fried Chicken Meals",
          percentage: 36,
          revenue: 5346,
          orderCount: 42,
          colorHex: "#FFC700",
        },
        {
          category: "Samgyupsal Grill",
          percentage: 28,
          revenue: 4158,
          orderCount: 14,
          colorHex: "#EA580C",
        },
        {
          category: "Chao Fan & Rice Bowls",
          percentage: 17,
          revenue: 2524,
          orderCount: 22,
          colorHex: "#EAB308",
        },
        {
          category: "Sizzling Plates",
          percentage: 11,
          revenue: 1633,
          orderCount: 16,
          colorHex: "#DC2626",
        },
        {
          category: "Snacks, Drinks & Soju",
          percentage: 8,
          revenue: 1189,
          orderCount: 18,
          colorHex: "#16A34A",
        },
      ],
      hourlyTraffic: [
        { hour: "10 AM", orders: 4, peak: false },
        { hour: "11 AM", orders: 12, peak: true },
        { hour: "12 PM", orders: 18, peak: true },
        { hour: "1 PM", orders: 14, peak: true },
        { hour: "2 PM", orders: 6, peak: false },
        { hour: "3 PM", orders: 5, peak: false },
        { hour: "4 PM", orders: 7, peak: false },
        { hour: "5 PM", orders: 13, peak: false },
        { hour: "6 PM", orders: 19, peak: true },
        { hour: "7 PM", orders: 21, peak: true },
        { hour: "8 PM", orders: 11, peak: false },
      ],
      courierDispatches: [
        {
          name: "Mr. Cartman Antique",
          sharePercentage: 46,
          totalTrips: 38,
          avgDeliveryMinutes: 24,
          status: "active",
        },
        {
          name: "SUGO Express",
          sharePercentage: 33,
          totalTrips: 27,
          avgDeliveryMinutes: 22,
          status: "active",
        },
        {
          name: "ErrandPro Antique",
          sharePercentage: 21,
          totalTrips: 17,
          avgDeliveryMinutes: 26,
          status: "busy",
        },
      ],
      recentSimulatedOrders: [
        {
          id: "ORD-8491",
          customer: "Maria S. (EBJ Gym)",
          items: "2x Full Pak Meal (Carbonara) + 1.5L Coke",
          total: 318,
          courier: "Mr. Cartman Antique",
          timeAgo: "4 mins ago",
          status: "Dispatched",
        },
        {
          id: "ORD-8490",
          customer: "Kenneth B. (San Angel)",
          items: "1x 10pcs Chicken Bundle + Loaded Fries",
          total: 418,
          courier: "SUGO Express",
          timeAgo: "12 mins ago",
          status: "Preparing",
        },
        {
          id: "ORD-8489",
          customer: "Dine-In Table 4",
          items: "Samgyupsal Set B (3 pax) + 2 Jinro Soju",
          total: 1195,
          courier: "Dine-In Antique",
          timeAgo: "22 mins ago",
          status: "Delivered",
        },
        {
          id: "ORD-8488",
          customer: "Atty. Reyes (Capitol Area)",
          items: "3x Porkchop Chao Fan + Cucumber Pitcher",
          total: 486,
          courier: "ErrandPro Antique",
          timeAgo: "35 mins ago",
          status: "Delivered",
        },
      ],
    };

    const responsePayload: ApiResponse<AnalyticsDashboardData> = {
      success: true,
      data,
      error: null,
      meta: {
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
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: {
          code: "INTERNAL_ERROR",
          message: "Unable to compile analytics metrics",
        },
      },
      { status: 500 }
    );
  }
}
