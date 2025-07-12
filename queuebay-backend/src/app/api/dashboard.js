import { initFirebaseAdmin } from "../../lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { summarizeDashboardWithGPT } from "../../lib/openai";

initFirebaseAdmin();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, error: "Missing or invalid token" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    const uid = decoded.uid;

    const db = getFirestore();

    // Fetch user profile
    const userSnap = await db.collection("users").doc(uid).get();
    const user = userSnap.exists ? userSnap.data() : null;

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Fetch recent listings
    const listingsSnap = await db
      .collection("listings")
      .where("sellerID", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    const listings = listingsSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch recent negotiations (buyer or seller)
    const negSnap = await db
      .collectionGroup("negotiations")
      .where("participants", "array-contains", uid)
      .orderBy("lastUpdated", "desc")
      .limit(5)
      .get();
    const negotiations = negSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch recent orders
    const ordersSnap = await db
      .collection("orders")
      .where("userID", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();
    const orders = ordersSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Optional: GPT-4 summary
    let summary = null;
    try {
      summary = await summarizeDashboardWithGPT({
        listings,
        negotiations,
        orders,
      });
    } catch (e) {
      console.warn("[GPT4 Summary Failed]", e.message);
    }

    return res.status(200).json({
      success: true,
      data: {
        profile: user,
        listings,
        negotiations,
        orders,
        summary,
      },
    });
  } catch (error) {
    console.error("[Dashboard API]", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      debug: process.env.NODE_ENV !== "production" ? error.message : undefined,
    });
  }
}
