import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import BugReportIcon from "@material-ui/icons/BugReport";

import { UserContext } from "~/context/UserContext";

const useStyles = makeStyles({
  button: {
    position: "fixed",
    bottom: 25,
    right: 25,
  },
});

const ActionMenu = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const classes = useStyles();
  const router = useRouter();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <SpeedDial
      className={classes.button}
      ariaLabel="Action Menu"
      icon={<AddIcon />}
      open={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      {user && (
        <SpeedDialAction icon={<EditIcon />} tooltipTitle="Create Review" onClick={() => router.push("/reviews/new")} />
      )}
      <SpeedDialAction icon={<BugReportIcon />} tooltipTitle="Report Bug" />
    </SpeedDial>
  );
};

export default ActionMenu;
