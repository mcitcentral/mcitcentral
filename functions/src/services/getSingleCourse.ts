import firebaseAdmin from "firebase-admin";

export default async function getSingleCourse(courseId: string): Promise<Course | null> {
  const snapshot = await firebaseAdmin.firestore().collection("courses").doc(courseId).get();
  const course = snapshot.data() as Course;
  return course || null;
}
