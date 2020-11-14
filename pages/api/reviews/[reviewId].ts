import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { firebaseToken, review } = req.body as EditReviewRequest;
    const { uid } = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
    const newReview = { ...review, userId: uid, dateCreated: new Date().toISOString() };
    await firebaseAdmin.firestore().collection("courseReviews").add(newReview);
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(200).json({ success: false, message: e.message });
  }
}
