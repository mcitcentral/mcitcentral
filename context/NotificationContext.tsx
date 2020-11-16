import { useState, createContext, Dispatch } from "react";
import Alert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

interface NotificationContext {
  setNotification: Dispatch<NotificationMessage | null>;
}

export const NotificationContext = createContext<NotificationContext>({} as NotificationContext);

export const NotificationLayout: React.FC = ({ children }) => {
  const [notification, setNotification] = useState<NotificationMessage | null>(null);
  const handleClose = () => setNotification(null);
  return (
    <NotificationContext.Provider value={{ setNotification }}>
      <Snackbar open={!!notification} autoHideDuration={2500} onClose={handleClose}>
        {notification && (
          <Alert onClose={handleClose} severity={notification.type}>
            {notification.message}
          </Alert>
        )}
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
};
