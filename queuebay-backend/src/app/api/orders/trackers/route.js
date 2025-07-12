import { verifyIdToken } from "@/lib/firebaseAdmin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { runGPT4Text } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    // 1. Auth Token Validation
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

    // 2. Get Orders of the User
    const snapshot = await db
      .collection("orders")
      .where("buyerId", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(20)
      .get();

    if (snapshot.empty) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 3. GPT-4 Order Summary (Optional)
    const gptPrompt = `Summarize the order status from this JSON:\n${JSON.stringify(
      orders.slice(0, 5)
    )}\nRespond as: { "summary": "..." }`;

    let aiSummary = null;
    try {
      const gptResult = await runGPT4Text(gptPrompt);
      const parsed = JSON.parse(gptResult);
      aiSummary = parsed.summary || null;
    } catch (err) {
      console.warn("GPT summary failed:", err.message);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          orders,
          summary: aiSummary,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Order Tracker Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
