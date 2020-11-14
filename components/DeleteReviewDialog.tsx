import { Dispatch } from "react";
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

interface DeleteReviewDialogProps {
  open: boolean;
  setOpen: Dispatch<boolean>;
}

const DeleteReviewDialog = ({ open, setOpen }: DeleteReviewDialogProps) => {
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
        <Button onClick={() => {}} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteReviewDialog;
