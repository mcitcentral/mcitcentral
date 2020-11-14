import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function getUserReviews(firebaseToken: string): Promise<CourseReviewList> {
  const courseReviews: CourseReviewList = {};
  const { uid } = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
  const snapshot = await firebaseAdmin.firestore().collection("courseReviews").where("userId", "==", uid).get();
  snapshot.forEach((courseReview: firebaseAdmin.firestore.QueryDocumentSnapshot<CourseReview>) => {
    courseReviews[courseReview.id] = courseReview.data();
  });
  return courseReviews;
}
