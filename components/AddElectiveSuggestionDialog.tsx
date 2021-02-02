import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";
import ClassIcon from "@material-ui/icons/Class";
import apiClient from "~/lib/apiClient";
import firebaseAuth from "~/lib/firebaseAuth";

const useStyles = makeStyles({
  formContainer: {
    minWidth: 400,
    display: "grid",
    gridRowGap: 10,
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

interface AddElectiveSuggestionDialogProps {
  open: boolean;
  toggleDialog: () => void;
}
const AddElectiveSuggestionDialog: React.FC<AddElectiveSuggestionDialogProps> = ({ open, toggleDialog }) => {
  const classes = useStyles();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const handleSubmit = async () => {
    const firebaseToken = await firebaseAuth.getToken();
    await apiClient.createElective(firebaseToken, { id, name, link });
    toggleDialog();
  };

  return (
    <Dialog open={open}>
      <DialogTitle disableTypography className={classes.titleContainer}>
        <ClassIcon style={{ marginRight: 5 }} />
        <Typography variant="h6">Add Elective Suggestion</Typography>
      </DialogTitle>
      <DialogContent>
        <div className={classes.formContainer}>
          <TextField label="Course ID" variant="outlined" value={id} onChange={(e) => setId(e.target.value)} />
          <TextField label="Course Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          <TextField label="Course Link" variant="outlined" value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add Elective
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddElectiveSuggestionDialog;
