import * as functions from "firebase-functions";
import firebaseAdmin from "firebase-admin";
import calculateCourseSummary from "./services/calculateCourseSummary";

firebaseAdmin.initializeApp();

exports.recalculateCourseSummary = functions.firestore.document("courseReviews/{reviewId}").onWrite(async (change) => {
  try {
    let courseReview = change.after.exists ? change.after.data() : null;
    if (!courseReview) courseReview = change.before.data();
    if (courseReview) await calculateCourseSummary(courseReview.courseId);
  } catch (e) {
    console.log(e.message);
  }
});

exports.createUserSettings = functions.auth.user().onCreate(async (user) => {
  try {
    await firebaseAdmin.firestore().collection("userSettings").doc(user.uid).set({
      createdAt: new Date().toISOString(),
      name: user.displayName,
      user: user.uid,
    });
  } catch (e) {
    console.log(e.message);
  }
});
