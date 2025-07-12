import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { NextResponse } from "next/server";
import { verifyIdToken } from "@/lib/firebaseAdmin";
import { runGPT4Text } from "@/lib/openai"; // You’ll implement GPT prompt here

// Firestore query builder based on GPT response
async function fetchListings(queryIntent) {
  const db = getFirestore();
  let ref = db.collection("listings").where("status", "==", "listed");

  if (queryIntent?.maxPrice) {
    ref = ref.where("price", "<=", queryIntent.maxPrice);
  }
  if (queryIntent?.category) {
    ref = ref.where("category", "==", queryIntent.category);
  }

  const snap = await ref.limit(20).get();
  const listings = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return listings;
}

// API route logic
export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Missing auth token" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decoded = await verifyIdToken(idToken);
    if (!decoded?.uid) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { query } = body;

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { success: false, error: "Query required" },
        { status: 400 }
      );
    }

    // Run GPT-4 text analysis
    const gptPrompt = `You're a product search AI for an online marketplace.
User query: "${query}".
Return a JSON like: { "category": "...", "maxPrice": ..., "keywords": [...] }
Only return valid JSON.`;

    const gptRes = await runGPT4Text(gptPrompt);

    let parsedIntent;
    try {
      parsedIntent = JSON.parse(gptRes);
    } catch (err) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid GPT-4 response",
          debug: gptRes,
        },
        { status: 500 }
      );
    }

    const listings = await fetchListings(parsedIntent);

    return NextResponse.json(
      { success: true, data: { listings, parsedIntent } },
      { status: 200 }
    );
  } catch (err) {
    console.error("Discover Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
