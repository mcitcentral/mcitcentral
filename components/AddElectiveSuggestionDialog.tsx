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
  handleAddElective: (id: string, name: string, link: string) => Promise<void>;
}
const AddElectiveSuggestionDialog: React.FC<AddElectiveSuggestionDialogProps> = ({
  open,
  toggleDialog,
  handleAddElective,
}) => {
  const classes = useStyles();
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [link, setLink] = useState<string>("");

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
        <Button onClick={() => handleAddElective(id, name, link)} color="primary">
          Add Elective
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddElectiveSuggestionDialog;
