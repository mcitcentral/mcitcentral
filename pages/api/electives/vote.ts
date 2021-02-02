import { NextApiRequest, NextApiResponse } from "next";
import firebaseAdmin from "~/lib/firebaseAdmin";
import getAllElectiveSuggestions from "~/services/getAllElectiveSuggestions";

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    const { firebaseToken, electiveId, vote } = req.body as VoteElectiveRequest;
    const { uid } = await firebaseAdmin.auth().verifyIdToken(firebaseToken);
    await firebaseAdmin
      .firestore()
      .collection("electiveSuggestions")
      .doc(electiveId)
      .set(
        {
          votes: {
            [uid]: vote,
          },
        },
        { merge: true }
      );
    const electiveSuggestions = await getAllElectiveSuggestions();
    res.status(200).json({ success: true, data: electiveSuggestions });
  } catch (e) {
    res.status(200).json({ success: false, message: e.message });
  }
}
