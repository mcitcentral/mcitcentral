import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function getAllCourses(): Promise<CourseList> {
  const courses: CourseList = {};
  const snapshot = await firebaseAdmin.firestore().collection("courses").get();
  snapshot.forEach((course: firebaseAdmin.firestore.QueryDocumentSnapshot<Course>) => {
    courses[course.id] = course.data();
  });
  return courses;
}
