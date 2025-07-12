import { verifyIdToken } from "@/lib/firebaseAdmin";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
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

    // 1. Get user profile data
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const user = userDoc.data();

    // 2. Count user listings/orders/messages (optional performance-enhancing)
    const [listingsSnap, ordersSnap, msgsSnap] = await Promise.all([
      db.collection("listings").where("ownerId", "==", uid).get(),
      db.collection("orders").where("buyerId", "==", uid).get(),
      db
        .collection("messages")
        .where("receiverId", "==", uid)
        .where("read", "==", false)
        .get(),
    ]);

    const counts = {
      listings: listingsSnap.size,
      orders: ordersSnap.size,
      unreadMessages: msgsSnap.size,
    };

    // 3. Optional GPT summary (e.g., "You have 3 new messages and 2 pending orders.")
    let aiSummary = null;
    try {
      const prompt = `Summarize this user's state as a quick dashboard alert:\n\n${JSON.stringify(
        counts
      )}\nRespond like: { "summary": "..." }`;
      const gptOutput = await runGPT4Text(prompt);
      const parsed = JSON.parse(gptOutput);
      aiSummary = parsed.summary || null;
    } catch (err) {
      console.warn("GPT Summary failed:", err.message);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          uid,
          displayName: user.displayName || "",
          profilePicture: user.photoURL || null,
          role: user.role || "user",
          counts,
          summary: aiSummary,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("SidebarNav API Error:", err.message);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
