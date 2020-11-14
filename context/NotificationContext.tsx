import { useState, createContext } from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

interface NotificationContext {
  createNotification: (notification: Notification) => void;
}

export const NotificationContext = createContext<NotificationContext>({} as NotificationContext);

const NotificationLayout = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const createNotification = (notification: Notification) => {};

  const handleClose = () => setNotification(null);

  return (
    <NotificationContext.Provider value={{ createNotification }}>
      <Snackbar open={!!notification} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={notification.type}>
          {notification.message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationLayout;
