import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "~/lib/firebaseAdmin";
import findDuplicateReview from "~/services/findDuplicateReview";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { firebaseToken, review } = req.body as CreateReviewRequest;
    const { uid } = await firebaseAdmin.auth().verifyIdToken(firebaseToken);

    const duplicateReview = await findDuplicateReview(uid, review.courseId);
    if (duplicateReview) throw new Error("You've already created a review for this class.");

    const newReview = { ...review, userId: uid, dateCreated: new Date().toISOString() };
    await firebaseAdmin.firestore().collection("courseReviews").add(newReview);

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(200).json({ success: false, message: e.message });
  }
}
