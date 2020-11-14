import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function getCourseReviews(courseId: string): Promise<CourseReviewList> {
  const courseReviews: CourseReviewList = {};
  const snapshot = await firebaseAdmin.firestore().collection("courseReviews").where("courseId", "==", courseId).get();
  snapshot.forEach((courseReview: firebaseAdmin.firestore.QueryDocumentSnapshot<CourseReview>) => {
    courseReviews[courseReview.id] = courseReview.data();
  });
  return courseReviews;
}
