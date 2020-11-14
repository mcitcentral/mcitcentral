import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { firebaseToken, course } = req.body as CreateCourseRequest;
    const { uid } = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
    const userSettingsRecord = await firebaseAdmin.firestore().collection("userSettings").doc(uid).get();
    const userSettings = userSettingsRecord.data() as UserSettings;
    if (!userSettings.isAdmin) throw new Error("Authentication failed.");
    await firebaseAdmin
      .firestore()
      .collection("courses")
      .doc(course.id)
      .set({ ...course, reviewCount: 0, avgDifficulty: 0, avgWorkload: 0, avgRating: 0 });
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(200).json({ success: false, message: e.message });
  }
}
