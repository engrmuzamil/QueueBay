// lib/firebaseStorage.js

import { getStorage } from "firebase-admin/storage";
import { readFile } from "fs/promises";

export async function uploadToFirebaseStorage(filepath, destinationPath) {
  const bucket = getStorage().bucket();
  await bucket.upload(filepath, {
    destination: destinationPath,
    public: true,
    metadata: {
      cacheControl: "public,max-age=31536000",
    },
  });
}

export async function getPublicURL(filePath) {
  const bucket = getStorage().bucket();
  const file = bucket.file(filePath);
  const [metadata] = await file.getMetadata();
  return (
    metadata.mediaLink ||
    `https://storage.googleapis.com/${bucket.name}/${filePath}`
  );
}
