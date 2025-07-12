import { verifyIdToken } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
import { getFirestore } from "firebase-admin/firestore";
import { runGPT4Text } from "@/lib/openai";

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

    const url = new URL(req.url);
    const mode = url.searchParams.get("mode"); // simulate=loading|error|empty|normal

    const db = getFirestore();

    switch (mode) {
      case "loading":
        await new Promise((resolve) => setTimeout(resolve, 2000));
        return NextResponse.json(
          { success: true, data: "Simulated loading delay" },
          { status: 200 }
        );

      case "error":
        throw new Error("Simulated server error for shimmer testing");

      case "empty":
        return NextResponse.json({ success: true, data: [] }, { status: 200 });

      case "gpt":
        try {
          const prompt = `Simulate user frustration message and return a concise fallback JSON. Return format: { "message": "...", "retryTip": "..." }`;
          const response = await runGPT4Text(prompt);
          const parsed = JSON.parse(response);
          return NextResponse.json(
            { success: true, data: parsed },
            { status: 200 }
          );
        } catch (gptErr) {
          return NextResponse.json(
            { success: false, error: "GPT failed", debug: gptErr.message },
            { status: 500 }
          );
        }

      default:
        const userDoc = await db.collection("users").doc(uid).get();
        return NextResponse.json(
          { success: true, data: { status: "normal", user: userDoc.data() } },
          { status: 200 }
        );
    }
  } catch (err) {
    console.error("[UI State Debug Error]", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
