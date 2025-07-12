import { verifyIdToken } from "@/lib/firebaseAdmin";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { runGPT4Text } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function GET(req) {
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

    const db = getFirestore();

    // Get user's watchlist (array of listing IDs) and alert preferences
    const userDoc = await db.collection("users").doc(uid).get();
    const userData = userDoc.data();
    const watchlistIds = userData?.watchlist || [];
    const alertSettings = userData?.alerts || [];

    // Fetch listings in watchlist
    const listingsSnap = await db
      .collection("listings")
      .where("__name__", "in", watchlistIds.slice(0, 10)) // Firestore IN supports up to 10 IDs
      .get();

    const listings = listingsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Optionally fetch alert data (based on stored criteria)
    let alerts = [];
    if (alertSettings.length > 0) {
      const alertsSnap = await db
        .collection("alerts")
        .where("userId", "==", uid)
        .orderBy("createdAt", "desc")
        .limit(10)
        .get();

      alerts = alertsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    // Optional: Generate GPT summary of alerts
    let summary = null;
    try {
      const summaryPrompt = `Summarize this watchlist and alert info:\n${JSON.stringify(
        {
          listingsCount: listings.length,
          alertsCount: alerts.length,
        }
      )}\nRespond in JSON: { "summary": "..." }`;

      const output = await runGPT4Text(summaryPrompt);
      const parsed = JSON.parse(output);
      summary = parsed.summary || null;
    } catch (e) {
      console.warn("GPT Summary failed:", e.message);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          uid,
          listings,
          alerts,
          summary,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Watchlist API Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
