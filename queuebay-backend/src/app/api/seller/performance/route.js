import { verifyIdToken } from "@/lib/firebaseAdmin";
import { runGPT4Text } from "@/lib/openai";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Missing Authorization header" },
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

    // Fetch seller listings
    const listingsSnap = await db
      .collection("listings")
      .where("sellerId", "==", uid)
      .get();
    const listings = listingsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch orders where the seller is involved
    const ordersSnap = await db
      .collection("orders")
      .where("sellerId", "==", uid)
      .get();
    const orders = ordersSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Calculate stats
    const totalListings = listings.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + (order.total || 0),
      0
    );
    const averageRating =
      listings.reduce((acc, l) => acc + (l.rating || 0), 0) /
      (totalListings || 1);

    // GPT-4 summary
    let gptSummary = null;
    try {
      const prompt = `Generate a JSON summary of this seller's performance in less than 50 words. Include total listings, total orders, revenue, and rating.

{
  "listings": ${totalListings},
  "orders": ${totalOrders},
  "revenue": ${totalRevenue},
  "rating": ${averageRating.toFixed(2)}
}

Return JSON: { "summary": "..." }`;

      const gptResponse = await runGPT4Text(prompt);
      const parsed = JSON.parse(gptResponse);
      gptSummary = parsed.summary || null;
    } catch (err) {
      console.warn("GPT summary failed:", err.message);
    }

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalListings,
          totalOrders,
          totalRevenue,
          averageRating: parseFloat(averageRating.toFixed(2)),
        },
        gptSummary,
      },
    });
  } catch (err) {
    console.error("Seller Dashboard API Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
