import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { firebaseToken, elective } = req.body as CreateElectiveRequest;
    const { uid } = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
    const userSettingsRecord = await firebaseAdmin.firestore().collection("userSettings").doc(uid).get();
    const userSettings = userSettingsRecord.data() as UserSettings;
    if (!userSettings.isAdmin) throw new Error("Authentication failed.");
    await firebaseAdmin
      .firestore()
      .collection("electiveSuggestions")
      .doc(elective.id)
      .set({ ...elective, votes: {} });
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(200).json({ success: false, message: e.message });
  }
}
