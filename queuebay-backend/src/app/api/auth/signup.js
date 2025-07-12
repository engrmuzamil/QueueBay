// pages/api/auth/signup.js

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
    const decodedToken = await getAuth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const {
      name,
      email,
      role = "buyer",
      address = {},
      preferences = {},
    } = req.body;

    if (!name || !email || !role) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: name, email, or role",
      });
    }

    const db = getFirestore();
    const userRef = db.collection("users").doc(uid);

    // Check if user already exists
    const doc = await userRef.get();
    if (doc.exists) {
      return res.status(200).json({
        success: true,
        data: { uid, message: "User already registered." },
      });
    }

    const userData = {
      uid,
      name,
      email,
      role, // buyer | seller | admin
      preferences,
      address,
      balance: 0,
      createdAt: FieldValue.serverTimestamp(),
      lastLogin: FieldValue.serverTimestamp(),
    };

    await userRef.set(userData);

    return res.status(201).json({
      success: true,
      data: {
        uid,
        role,
        email,
        name,
        message: "Signup successful and user profile created",
      },
    });
  } catch (error) {
    console.error("[SignupScreen] Firebase Auth Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error during signup",
      debug: process.env.NODE_ENV !== "production" ? error.message : undefined,
    });
  }
}
