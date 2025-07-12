// pages/api/user/profile-setup.js

import { initFirebaseAdmin } from "../../../lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import {
  uploadToFirebaseStorage,
  getPublicURL,
} from "../../../lib/firebaseStorage";
import { analyzeImageWithGPT4Vision } from "../../../lib/openai";

initFirebaseAdmin();

export const config = {
  api: {
    bodyParser: false,
  },
};

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

    const form = new formidable.IncomingForm();
    form.uploadDir = "./tmp";
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        return res
          .status(500)
          .json({ success: false, error: "Form parsing failed" });
      }

      const { name, bio = "", role = "buyer" } = fields;
      if (!name) {
        return res.status(400).json({ success: false, error: "Missing name" });
      }

      const avatar = files?.avatar;
      let avatarURL = null;
      let gptOutput = null;

      if (avatar && avatar.filepath) {
        const storagePath = `users/${uid}/avatar_${Date.now()}.jpg`;
        await uploadToFirebaseStorage(avatar.filepath, storagePath);
        avatarURL = await getPublicURL(storagePath);

        // Optional: Analyze image via GPT-4 Vision
        try {
          gptOutput = await analyzeImageWithGPT4Vision(
            avatarURL,
            "Describe the image briefly"
          );
        } catch (e) {
          console.warn("GPT-4 Vision failed:", e.message);
        }

        // Delete temp file
        fs.unlinkSync(avatar.filepath);
      }

      const db = getFirestore();
      const userRef = db.collection("users").doc(uid);

      const profile = {
        name,
        bio,
        role,
        avatar: avatarURL,
        profileInsights: gptOutput?.description || null,
        updatedAt: FieldValue.serverTimestamp(),
      };

      await userRef.set(profile, { merge: true });

      return res.status(200).json({
        success: true,
        data: { uid, avatarURL, gptOutput },
      });
    });
  } catch (error) {
    console.error("[ProfileSetup] Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      debug: process.env.NODE_ENV !== "production" ? error.message : undefined,
    });
  }
}
