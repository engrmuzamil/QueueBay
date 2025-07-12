// /pages/api/create-listing.js

import { initFirebaseAdmin } from "../../lib/firebaseAdmin";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { uploadToStorage } from "../../lib/storage";
import { generateListingFromImages } from "../../lib/openai";

initFirebaseAdmin();

export const config = {
  api: {
    bodyParser: false, // Required for Formidable
  },
};

import formidable from "formidable";

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
  let uid;
  try {
    const decoded = await getAuth().verifyIdToken(idToken);
    uid = decoded.uid;
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid Firebase token" });
  }

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid form data" });
    }

    try {
      const images = Array.isArray(files.images)
        ? files.images
        : [files.images];
      const uploadedUrls = [];

      for (let file of images) {
        const { publicUrl } = await uploadToStorage(uid, file);
        uploadedUrls.push(publicUrl);
      }

      // Call GPT-4 Vision to analyze images
      const gptResponse = await generateListingFromImages(uploadedUrls);

      const listing = {
        sellerID: uid,
        images: uploadedUrls,
        title: gptResponse.title,
        description: gptResponse.description,
        condition: gptResponse.condition,
        price: gptResponse.price,
        aiAnalysis: {
          defects: gptResponse.defects,
          authenticityScore: gptResponse.authenticityScore || 0.9,
        },
        createdAt: FieldValue.serverTimestamp(),
        status: "draft",
      };

      const db = getFirestore();
      const ref = await db.collection("listings").add(listing);

      return res.status(200).json({
        success: true,
        data: { id: ref.id, ...listing },
        debug: process.env.NODE_ENV !== "production" ? gptResponse : undefined,
      });
    } catch (err) {
      console.error("[Create Listing Error]", err);
      return res.status(500).json({ success: false, error: "Server error" });
    }
  });
}
