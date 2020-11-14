import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "~/lib/firebaseAdmin";
import getSingleCourseReview from "~/services/getSingleCourseReview";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { firebaseToken, reviewId } = req.body as EditReviewRequest;
    const { uid } = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
    const courseReview = await getSingleCourseReview(reviewId);
    if (courseReview.userId !== uid) throw new Error("You don't have permission to delete this review.");
    await firebaseAdmin.firestore().collection("courseReviews").doc(reviewId).delete();
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(200).json({ success: false, message: e.message });
  }
}
