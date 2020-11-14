import firebaseAdmin from "~/lib/firebaseAdmin";

const findDuplicateReview = async (uid: string, courseId: string): Promise<CourseReview | null> => {
  const snapshot = await firebaseAdmin
    .firestore()
    .collection("courseReviews")
    .where("userId", "==", uid)
    .where("courseId", "==", courseId)
    .get();
  if (snapshot.empty) return null;
  return snapshot.docs[0].data() as CourseReview;
};

export default findDuplicateReview;
