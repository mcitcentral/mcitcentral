import firebaseAdmin from "firebase-admin";
import getSingleCourse from "../services/getSingleCourse";

export default async function calculateCourseSummary(courseId: string): Promise<Course> {
  let reviewCount = 0;
  let sumRating = 0;
  let sumWorkload = 0;
  let sumDifficulty = 0;

  const course = await getSingleCourse(courseId);
  if (!course) throw new Error("Could not find course");

  const snapshot = await firebaseAdmin.firestore().collection("courseReviews").where("courseId", "==", courseId).get();
  snapshot.forEach((courseReview: firebaseAdmin.firestore.QueryDocumentSnapshot) => {
    const review = courseReview.data() as CourseReview;
    reviewCount += 1;
    sumRating += review.rating;
    sumWorkload += review.workload;
    sumDifficulty += review.difficulty;
  });
  if (!reviewCount) throw new Error("No reviews found");

  const updatedCourse = {
    ...course,
    reviewCount,
    avgRating: sumRating / reviewCount,
    avgWorkload: sumWorkload / reviewCount,
    avgDifficulty: sumDifficulty / reviewCount,
  };
  await firebaseAdmin.firestore().collection("courses").doc(courseId).set(updatedCourse);
  return updatedCourse;
}
