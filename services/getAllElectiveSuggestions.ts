import firebaseAdmin from "~/lib/firebaseAdmin";

export default async function getAllElectiveSuggestions(): Promise<ElectiveSuggestionList> {
  const electiveSuggestions: ElectiveSuggestionList = {};
  const snapshot = await firebaseAdmin.firestore().collection("electiveSuggestions").get();
  snapshot.forEach((electiveSuggestion: firebaseAdmin.firestore.QueryDocumentSnapshot<ElectiveSuggestion>) => {
    electiveSuggestions[electiveSuggestion.id] = electiveSuggestion.data();
  });
  return electiveSuggestions;
}
