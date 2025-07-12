import { verifyIdToken } from "@/lib/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";
import { runGPT4Text } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = await verifyIdToken(token);
    const uid = decoded.uid;

    const db = getFirestore();

    // 1. Fetch wishlist item references for this user
    const wishlistRef = db.collection("users").doc(uid).collection("wishlist");
    const wishlistSnap = await wishlistRef.get();

    const listingIds = wishlistSnap.docs.map((doc) => doc.id);
    if (listingIds.length === 0) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    // 2. Fetch listings in parallel
    const listingsRef = db.collection("listings");
    const listingsData = [];

    for (let listingId of listingIds) {
      const doc = await listingsRef.doc(listingId).get();
      if (doc.exists) {
        listingsData.push({ id: doc.id, ...doc.data() });
      }
    }

    // 3. Optionally run GPT-4 to generate wishlist summary
    let gptSummary = null;
    try {
      const prompt = `Given the following wishlist items, summarize what the buyer is likely interested in (as a short insight).

${JSON.stringify(listingsData.map((l) => l.title || "Unknown item"))}

Return JSON: { "summary": "..." }`;

      const result = await runGPT4Text(prompt);
      const parsed = JSON.parse(result);
      gptSummary = parsed.summary || null;
    } catch (err) {
      console.warn("GPT summary failed:", err.message);
    }

    return NextResponse.json({
      success: true,
      data: {
        listings: listingsData,
        gptSummary,
      },
    });
  } catch (err) {
    console.error("Wishlist GET error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid token" },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1];
    const decoded = await verifyIdToken(token);
    const uid = decoded.uid;

    const body = await req.json();
    const { listingId } = body;

    if (!listingId) {
      return NextResponse.json(
        { success: false, error: "Missing listingId" },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const wishlistItemRef = db
      .collection("users")
      .doc(uid)
      .collection("wishlist")
      .doc(listingId);
    await wishlistItemRef.set({ addedAt: new Date() });

    return NextResponse.json(
      { success: true, data: { listingId } },
      { status: 200 }
    );
  } catch (err) {
    console.error("Wishlist POST error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
