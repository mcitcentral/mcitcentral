import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "~/lib/firebaseAdmin";
import getAllElectiveSuggestions from "~/services/getAllElectiveSuggestions";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { firebaseToken, elective } = req.body as CreateElectiveRequest;
    await firebaseAdmin.auth().verifyIdToken(firebaseToken);
    await firebaseAdmin
      .firestore()
      .collection("electiveSuggestions")
      .doc(elective.id)
      .set({ ...elective, votes: {} });
    const electiveSuggestions = await getAllElectiveSuggestions();
    res.status(200).json({ success: true, data: electiveSuggestions });
  } catch (e) {
    res.status(200).json({ success: false, message: e.message });
  }
}
