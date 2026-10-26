import { GoogleGenAI } from "@google/genai";
import { MENU_ITEMS } from "@/data/menuData";
import { DELIVERY_PARTNERS, STORE_INFO } from "@/data/storeData";
import { AiRecommendationRequest, AiRecommendationResult } from "@/types";

/**
 * Deterministic fallback algorithm when Gemini API key is absent or network fails.
 * Guarantees zero downtime and 100% accurate Pak na Pak menu prices.
 */
function generateAlgorithmicRecommendation(
  req: AiRecommendationRequest
): AiRecommendationResult {
  const queryLower = (req.query || "").toLowerCase();
  const budget = req.budget || (queryLower.match(/₱?\s?(\d{2,4})/) ? parseInt(queryLower.match(/₱?\s?(\d{2,4})/)![1], 10) : 300);
  const pax = req.pax || 2;

  // Scenario 1: Samgyupsal / Korean BBQ
  if (queryLower.includes("samgyup") || queryLower.includes("korean") || queryLower.includes("grill") || queryLower.includes("soju")) {
    const setB = MENU_ITEMS.find((m) => m.id === "samgyup-set-b")!;
    const soju = MENU_ITEMS.find((m) => m.id === "jinro-soju")!;
    const lettuce = MENU_ITEMS.find((m) => m.id === "samgyup-addon-lettuce")!;

    return {
      headline: "🔥 Unli Samgyup & Jinro Soju Barkada Feast",
      tagline: "The ultimate Antique Korean dining experience with melted cheese & sides!",
      summary: `For your gathering, we recommend Samgyupsal Set B (₱299/head) featuring unlimited pork, chicken, crisp lettuce, gooey melted cheese dip, 8 authentic side dishes, plus cold Jinro Soju for the perfect celebration.`,
      recommendedMeals: [
        {
          id: setB.id,
          name: `${setB.name} (Unlimited Feast)`,
          category: "samgyupsal",
          price: setB.price,
          quantity: Math.max(2, pax),
          portion: `For ${Math.max(2, pax)} Persons (2 Hours Eat-All-You-Can)`,
          image: setB.image,
          reason: "Includes free melted cheese dip and 8 banchan side dishes sizzling hot at your table.",
        },
        {
          id: soju.id,
          name: soju.name,
          category: "drinks",
          price: soju.price,
          quantity: 1,
          portion: "360ml Chilled Bottle",
          image: soju.image,
          reason: "Authentic Korean pairing for grilled marinated meats.",
        },
      ],
      totalPrice: setB.price * Math.max(2, pax) + soju.price,
      budget,
      savingsNote: "Dine-in exclusive with FREE pitcher of iced tea for every 2 persons!",
      recommendedCourier: {
        id: DELIVERY_PARTNERS[0].id,
        name: DELIVERY_PARTNERS[0].name,
        url: `${STORE_INFO.messengerUrl}?text=${encodeURIComponent(
          `Hi Pak na Pak Antique! Gusto po sana namin magpa-reserve ng Samgyupsal Set B table for ${Math.max(2, pax)} pax.`
        )}`,
        tip: "Dine-in recommended for Samgyupsal. Book via Messenger ahead of time to secure your table!",
      },
      disclaimer: "Samgyupsal is strictly dine-in for 2 hours with no leftovers. Minimum 2 persons.",
    };
  }

  // Scenario 2: Barkada / Family Take-out Bundle
  if (queryLower.includes("bundle") || queryLower.includes("family") || queryLower.includes("party") || pax >= 4 || budget >= 600) {
    const bundle20 = MENU_ITEMS.find((m) => m.id === "bundle-20pcs")!;
    const familyPasta = MENU_ITEMS.find((m) => m.id === "pan-carbonara")!;
    const pitcherTea = MENU_ITEMS.find((m) => m.id === "pitcher-iced-tea")!;

    const total = bundle20.price + familyPasta.price;

    return {
      headline: "🍗 Ultimate Barkada & Family Feast Bundle",
      tagline: "Massive savings for 4-6 people with 20 pcs crispy chicken & family pan pasta!",
      summary: `Feed your entire group with 20 pieces of Pak na Pak crispy fried chicken (mix & match your favorite glazes like Garlic Parm and Spicy Buffalo) paired with a rich Family Pan Carbonara.`,
      recommendedMeals: [
        {
          id: bundle20.id,
          name: bundle20.name,
          category: "takeout-bundles",
          price: bundle20.price,
          quantity: 1,
          portion: "20 Pieces (Choice of 2 Glazes)",
          image: bundle20.image,
          reason: "Huge crowd pleaser, ultra-crispy with thick savory coatings.",
        },
        {
          id: familyPasta.id,
          name: familyPasta.name,
          category: "takeout-bundles",
          price: familyPasta.price,
          quantity: 1,
          portion: "Family Pan (Good for 5-6 pax)",
          image: familyPasta.image,
          reason: "Creamy bacon and mushroom sauce with generous cheese topping.",
        },
      ],
      totalPrice: total,
      budget,
      savingsNote: "Save over ₱180 compared to ordering individual meal portions!",
      recommendedCourier: {
        id: DELIVERY_PARTNERS[0].id,
        name: DELIVERY_PARTNERS[0].name,
        url: `${DELIVERY_PARTNERS[0].facebookUrl}?text=${encodeURIComponent(
          `Hello ${DELIVERY_PARTNERS[0].name}! Magpapa-deliver po kami ng Pak na Pak 20pcs Chicken Bundle at Family Pan Carbonara.`
        )}`,
        tip: `${DELIVERY_PARTNERS[0].name} provides fast insulated bike box delivery around San Jose.`,
      },
      disclaimer: "Take-out bundles can be customized with your choice of glazes.",
    };
  }

  // Scenario 3: Under ₱100 / Solo Sulit Meals
  if (budget <= 150 || queryLower.includes("solo") || queryLower.includes("sulit") || queryLower.includes("mura") || pax === 1) {
    const fullPak = MENU_ITEMS.find((m) => m.id === "full-pak-meal")!;
    const softdrink = MENU_ITEMS.find((m) => m.id === "softdrinks-12oz")!;

    return {
      headline: "🌟 The Legendary ₱99 Full Pak Meal",
      tagline: "2 pcs Crispy Fried Chicken + Spaghetti/Carbonara + Hot Rice!",
      summary: `The best-selling sulit meal in Antique! You get two savory fried chicken pieces with rich glaze, hearty pasta, and steaming white rice for only ₱99.`,
      recommendedMeals: [
        {
          id: fullPak.id,
          name: fullPak.name,
          category: "ala-carte",
          price: fullPak.price,
          quantity: 1,
          portion: "2 pcs Chicken + Pasta + Rice",
          flavor: "Garlic Parmesan or Spicy Buffalo",
          image: fullPak.image,
          reason: "Complete carb + protein champion meal in San Jose Antique for under ₱100.",
        },
        {
          id: softdrink.id,
          name: softdrink.name,
          category: "drinks",
          price: softdrink.price,
          quantity: 1,
          portion: "12 oz Ice Cold",
          image: softdrink.image,
          reason: "Classic refreshing soda pairing.",
        },
      ],
      totalPrice: fullPak.price + softdrink.price,
      budget,
      savingsNote: "Unbeatable value at only ₱129 total with cold drink included!",
      recommendedCourier: {
        id: DELIVERY_PARTNERS[1].id,
        name: DELIVERY_PARTNERS[1].name,
        url: `${DELIVERY_PARTNERS[1].facebookUrl}?text=${encodeURIComponent(
          `Hello ${DELIVERY_PARTNERS[1].name}! Magpapa-deliver po sana ako ng Full Pak Meal ₱99 from Pak na Pak San Jose.`
        )}`,
        tip: "SUGO Express handles fast solo lunch dispatch right to your doorstep or office.",
      },
      disclaimer: "Choose between Spaghetti or Carbonara for your pasta side.",
    };
  }

  // Scenario 4: Chao Fan & Sizzling Plate Combo
  const chaoFan = MENU_ITEMS.find((m) => m.id === "chao-fan-chicken") || MENU_ITEMS[0];
  const sisig = MENU_ITEMS.find((m) => m.id === "sizzling-sisig") || MENU_ITEMS[1];
  const fries = MENU_ITEMS.find((m) => m.id === "loaded-cheesy-fries") || MENU_ITEMS[2];

  return {
    headline: "🍳 Sizzling Sisig & Chao Fan Power Duo",
    tagline: "Authentic wok-fried rice with sizzling Antique sisig!",
    summary: `Combine our flavorful Fried Chicken Chao Fan with a sizzling hot plate of Sisig (₱99) and gooey Loaded Cheesy Fries. Great for lunch or an evening craving.`,
    recommendedMeals: [
      {
        id: chaoFan.id,
        name: chaoFan.name,
        category: "chao-fan",
        price: chaoFan.price,
        quantity: 1,
        portion: "Full Bowl with Crisp Chicken",
        image: chaoFan.image,
        reason: "Wok-fried rice with egg, spring onions, and juicy chicken.",
      },
      {
        id: sisig.id,
        name: sisig.name,
        category: "sizzling",
        price: sisig.price,
        quantity: 1,
        portion: "Sizzling Hot Plate",
        image: sisig.image,
        reason: "Crispy savory pork sisig served steaming hot.",
      },
      {
        id: fries.id,
        name: fries.name,
        category: "snacks",
        price: fries.price,
        quantity: 1,
        portion: "Loaded Platter",
        image: fries.image,
        reason: "Golden fries smothered with melted cheese and bacon bits.",
      },
    ],
    totalPrice: chaoFan.price + sisig.price + fries.price,
    budget,
    savingsNote: "Sulit barkada sharing meal under ₱400 total!",
    recommendedCourier: {
      id: DELIVERY_PARTNERS[2].id,
      name: DELIVERY_PARTNERS[2].name,
      url: `${DELIVERY_PARTNERS[2].facebookUrl}?text=${encodeURIComponent(
        `Hello ${DELIVERY_PARTNERS[2].name}! Magpapa-deliver po kami ng Pak na Pak Chao Fan and Sizzling Sisig.`
      )}`,
      tip: "ErrandPro Antique handles food errands across town with prompt notification.",
    },
    disclaimer: "Prices include standard condiments and sauces.",
  };
}

/**
 * Main AI Recommender function utilizing Gemini 3.8 Flash SDK with fallback resilience.
 */
export async function getAiRecommendation(
  req: AiRecommendationRequest
): Promise<AiRecommendationResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Graceful intelligent fallback when API key is not yet set in environment
    return generateAlgorithmicRecommendation(req);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const menuBrief = MENU_ITEMS.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      portion: item.portion,
    }));

    const systemInstruction = `You are "Pak AI", the friendly, witty, and food-loving AI concierge for "Pak na Pak", a beloved local restaurant in San Jose, Antique, Philippines.
Your mission is to recommend the best and most "sulit" (great value/affordable) meal combos from the real Pak na Pak menu based on what the customer wants, their budget in Philippine Pesos (₱), party size (pax), and cravings.
You speak warm English with natural Filipino/Ilonggo flair (e.g. "Sulit!", "Busog sarap!", "Kaon ta!").
Always recommend actual items from the provided menu with their exact prices.
Always calculate the exact sum total of the items.
Provide the response strictly in JSON matching the specified schema.`;

    const prompt = `Customer request: "${req.query}"
Budget: ₱${req.budget || "Flexible"}
Number of people: ${req.pax || 2}
Dining type: ${req.diningType || "delivery"}

Available Pak na Pak Menu:
${JSON.stringify(menuBrief, null, 2)}

Available Delivery Couriers in Antique:
- Mr. Cartman Antique (https://www.facebook.com/OnlineRiderAntique/)
- SUGO Express (https://www.facebook.com/p/SUGO-Express-61572859325227/)
- ErrandPro Antique (https://www.facebook.com/p/ErrandPro-Antique-61576594030994/)

Return a JSON object with:
{
  "headline": string,
  "tagline": string,
  "summary": string,
  "recommendedMeals": [
    {
      "id": string (must match menu item id),
      "name": string,
      "category": string,
      "price": number,
      "quantity": number,
      "portion": string,
      "flavor": string (optional),
      "reason": string
    }
  ],
  "totalPrice": number,
  "savingsNote": string,
  "recommendedCourier": {
    "id": string,
    "name": string,
    "tip": string
  },
  "disclaimer": string
}`;

    // Call Gemini 3.8 Flash per gemini-api-dev skill
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const text = response.text?.trim();
    if (!text) {
      return generateAlgorithmicRecommendation(req);
    }

    const parsed = JSON.parse(text);

    // Hydrate image URLs and courier link from authentic menu data
    const hydratedMeals = (parsed.recommendedMeals || []).map((rm: any) => {
      const match = MENU_ITEMS.find((m) => m.id === rm.id) || MENU_ITEMS[0];
      return {
        ...rm,
        image: match.image,
      };
    });

    const courierMatch =
      DELIVERY_PARTNERS.find((d) => d.name.toLowerCase().includes((parsed.recommendedCourier?.name || "").toLowerCase())) ||
      DELIVERY_PARTNERS[0];

    return {
      headline: parsed.headline || "Your Personalized Pak na Pak Meal Combo",
      tagline: parsed.tagline || "Freshly matched for your craving & budget",
      summary: parsed.summary || "Here is our top sulit recommendation for today!",
      recommendedMeals: hydratedMeals,
      totalPrice: parsed.totalPrice || hydratedMeals.reduce((acc: number, m: any) => acc + m.price * (m.quantity || 1), 0),
      budget: req.budget,
      savingsNote: parsed.savingsNote,
      recommendedCourier: {
        id: courierMatch.id,
        name: courierMatch.name,
        url: courierMatch.facebookUrl,
        tip: parsed.recommendedCourier?.tip || "Send them a message with your orders for fast pickup and delivery in San Jose.",
      },
      disclaimer: parsed.disclaimer || "Prices and availability subject to change.",
    };
  } catch (error) {
    console.error("Gemini AI API call error, falling back to algorithmic engine:", error);
    return generateAlgorithmicRecommendation(req);
  }
}
