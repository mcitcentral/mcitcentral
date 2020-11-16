import firebase from "~/lib/firebase";
import "firebase/auth";

const firebaseAuth = {
  handleGoogleLogin: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ hd: "seas.upenn.edu" });
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const token = res.credential;
        if (res.additionalUserInfo.isNewUser) {
          firebase.analytics().logEvent("sign_up", { email: res.user.email });
        } else {
          firebase.analytics().logEvent("login", { email: res.user.email });
        }
      });
  },
  handleLogout: async () => {
    firebase.auth().signOut();
  },
  getToken: async (): Promise<string> => {
    const token = await firebase.auth().currentUser.getIdToken();
    return token;
  },
};

export default firebaseAuth;
