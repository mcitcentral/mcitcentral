import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import firebase from "~/lib/firebase";

interface UserContext {
  user: firebase.User | null;
  userSettings: UserSettings | null;
  logout: () => void;
}

export const UserContext = createContext<UserContext>({} as UserContext);

export const UserLayout = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const router = useRouter();

  const logout = () => {
    firebase.auth().signOut();
    router.push("/");
  };

  useEffect(() => {
    firebase.auth().onIdTokenChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const firebaseToken = await currentUser.getIdToken(true);
        Cookies.set("mcitcentral", firebaseToken);
      } else {
        setUser(null);
        Cookies.remove("mcitcentral");
      }
    });
  }, []);

  useEffect(() => {
    const handleUserDataUpdate = (snapshots: firebase.firestore.QuerySnapshot) => {
      if (!snapshots.empty) {
        const fetchedUserSettings = snapshots.docs[0].data() as UserSettings;
        setUserSettings(fetchedUserSettings);
      }
    };
    if (user) {
      const userSubscription = firebase
        .firestore()
        .collection("userSettings")
        .where("user", "==", user.uid)
        .onSnapshot(handleUserDataUpdate);
      return () => userSubscription();
    } else setUserSettings(null);
  }, [user]);

  return <UserContext.Provider value={{ user, userSettings, logout }}>{children}</UserContext.Provider>;
};
