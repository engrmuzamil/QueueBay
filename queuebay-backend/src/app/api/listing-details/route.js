import { getFirestore } from "firebase-admin/firestore";
import { verifyIdToken } from "@/lib/firebaseAdmin";
import { runGPT4Text } from "@/lib/openai"; // If needed for description refinement
import { NextResponse } from "next/server";

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
    const uid = decoded?.uid;
    if (!uid) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { listingId, withSummary } = await req.json();
    if (!listingId) {
      return NextResponse.json(
        { success: false, error: "Missing listingId" },
        { status: 400 }
      );
    }

    const db = getFirestore();
    const docRef = db.collection("listings").doc(listingId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      return NextResponse.json(
        { success: false, error: "Listing not found" },
        { status: 404 }
      );
    }

    const listing = docSnap.data();
    const responseData = {
      id: docSnap.id,
      ...listing,
    };

    // Optional GPT-4 summary (e.g., “Buyer-friendly summary”)
    if (withSummary === true && listing.description && listing.title) {
      const prompt = `You're a product expert AI assistant. Based on the title and description below, return a short, engaging, buyer-friendly summary of the product:\n\nTitle: ${listing.title}\n\nDescription: ${listing.description}\n\nReturn only a JSON like: { "summary": "..." }`;
      const gptResult = await runGPT4Text(prompt);
      try {
        const parsed = JSON.parse(gptResult);
        if (parsed?.summary) {
          responseData.summary = parsed.summary;
        }
        if (process.env.NODE_ENV !== "production") {
          responseData._debug = { gptOutput: gptResult };
        }
      } catch (err) {
        console.warn("GPT output not parseable", gptResult);
      }
    }

    return NextResponse.json(
      { success: true, data: responseData },
      { status: 200 }
    );
  } catch (err) {
    console.error("Listing Details Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
