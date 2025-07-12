// pages/api/auth/login.js

import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { initFirebaseAdmin } from "../../../lib/firebaseAdmin";

initFirebaseAdmin();

export default async function handler(req, res) {
  if (req.method !== "POST") {
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
    // Verify the token
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Parse the client-provided payload (e.g., role, name)
    const { name, email, role = "buyer", address = {} } = req.body;

    if (!email || !name || !role) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    const db = getFirestore();
    const userRef = db.collection("users").doc(uid);

    // Upsert user record
    await userRef.set(
      {
        email,
        name,
        role,
        address,
        lastLogin: FieldValue.serverTimestamp(),
        createdAt: FieldValue.serverTimestamp(), // only applies on creation
      },
      { merge: true }
    );

    return res.status(200).json({
      success: true,
      data: {
        uid,
        role,
        email,
        name,
        message: "User authenticated and profile saved",
      },
    });
  } catch (error) {
    console.error("[LoginScreen] Auth Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error during authentication",
      debug: process.env.NODE_ENV !== "production" ? error.message : undefined,
    });
  }
}
