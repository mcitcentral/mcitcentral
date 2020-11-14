import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function getSingleCourseReview(reviewId: string): Promise<CourseReview> {
  const snapshot = await firebaseAdmin.firestore().collection("courseReviews").doc(reviewId).get();
  const courseReview = snapshot.data() as CourseReview;
  if (!courseReview) throw new Error("Course Review does not exist.");
  return courseReview;
}
