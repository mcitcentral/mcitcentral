import firebaseAdmin from "~/lib/firebaseAdmin";

const verifyCookie = async (cookie: string): Promise<firebaseAdmin.auth.DecodedIdToken> => {
  if (!cookie) throw new Error("No Cookie!");
  const token = await firebaseAdmin.auth().verifyIdToken(cookie);
  if (!token) throw new Error("Authentication failed");
  return token;
};

export default verifyCookie;
