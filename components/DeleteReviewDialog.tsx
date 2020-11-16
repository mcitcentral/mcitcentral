import { useContext, Dispatch } from "react";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
  DialogContent,
  DialogContentText,
  Typography,
} from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useRouter } from "next/router";

import firebaseAuth from "~/lib/firebaseAuth";
import apiClient from "~/lib/apiClient";
import { NotificationContext } from "~/context/NotificationContext";

interface DeleteReviewDialogProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
  courseReviewId: string;
}

const DeleteReviewDialog: React.FC<DeleteReviewDialogProps> = ({ open, courseReviewId, setOpen }) => {
  const { setNotification } = useContext(NotificationContext);
  const router = useRouter();

  const handleSubmit = async () => {
    const firebaseToken = await firebaseAuth.getToken();
    const response = await apiClient.deleteReview(firebaseToken, courseReviewId);
    if (response.success) {
      setNotification({ type: "success", message: "Your review has been deleted." });
      setOpen(false);
      router.push("/user/reviews");
    } else setNotification({ type: "error", message: "There was an error deleting your review." });
  };

  return (
    <Dialog open={open}>
      <DialogTitle disableTypography style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <DeleteForeverIcon color="secondary" style={{ marginRight: 5 }} />
        <Typography variant="h6">Delete Review</Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to delete this review?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteReviewDialog;
