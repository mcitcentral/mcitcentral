import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function getSingleCourse(courseId: string): Promise<Course> {
  const snapshot = await firebaseAdmin.firestore().collection("courses").doc(courseId).get();
  const course = snapshot.data() as Course;
  if (!course) throw new Error("Course not found.");
  return course;
}
