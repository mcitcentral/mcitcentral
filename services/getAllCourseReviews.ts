import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function getAllCourseReviews(): Promise<CourseReviewList> {
  const courseReviews: CourseReviewList = {};
  const snapshot = await firebaseAdmin.firestore().collection("courseReviews").get();
  snapshot.forEach((courseReview: firebaseAdmin.firestore.QueryDocumentSnapshot<CourseReview>) => {
    courseReviews[courseReview.id] = courseReview.data();
  });
  return courseReviews;
}
