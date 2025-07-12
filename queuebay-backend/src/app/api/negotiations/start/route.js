import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { verifyIdToken } from "@/lib/firebaseAdmin";
import { runGPT4Text } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Authentication
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

    // 2. Input Payload
    const {
      listingId,
      offerPrice,
      buyerName,
      sellerId,
      listingTitle,
      aiAssist = true,
    } = await req.json();
    if (!listingId || !offerPrice || !buyerName || !sellerId || !listingTitle) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getFirestore();

    // 3. Firestore Path: /negotiations/{listingId}/threads/{buyerId}
    const threadRef = db
      .collection("negotiations")
      .doc(listingId)
      .collection("threads")
      .doc(uid); // buyerId == uid

    const threadSnap = await threadRef.get();
    const newEntry = {
      by: "buyer",
      price: offerPrice,
      timestamp: FieldValue.serverTimestamp(),
    };

    let negotiationHistory = [newEntry];
    let autoReply = null;

    // 4. If thread exists, append
    if (threadSnap.exists) {
      await threadRef.update({
        history: FieldValue.arrayUnion(newEntry),
        updatedAt: FieldValue.serverTimestamp(),
      });
    } else {
      await threadRef.set({
        buyerId: uid,
        sellerId,
        listingId,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
        history: [newEntry],
      });
    }

    // 5. Optional AI Counteroffer
    if (aiAssist) {
      const prompt = `You're negotiating as a seller in a C2C marketplace.\nListing: "${listingTitle}"\nBuyer offered: $${offerPrice}\nRespond with a JSON like: { "counter": 500, "message": "Best I can do is $500" }`;

      const gptRaw = await runGPT4Text(prompt);
      try {
        const parsed = JSON.parse(gptRaw);
        autoReply = {
          by: "seller-ai",
          price: parsed.counter,
          message: parsed.message,
          timestamp: FieldValue.serverTimestamp(),
        };
        await threadRef.update({
          history: FieldValue.arrayUnion(autoReply),
          updatedAt: FieldValue.serverTimestamp(),
        });
      } catch (e) {
        console.warn("GPT-4 output not parseable:", gptRaw);
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          listingId,
          buyerId: uid,
          threadRef: threadRef.path,
          aiReply: autoReply,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("NegotiationRoom Error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
