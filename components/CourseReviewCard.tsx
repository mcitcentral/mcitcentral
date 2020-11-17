import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import ClassIcon from "@material-ui/icons/Class";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useRouter } from "next/router";

import { Rating, Difficulty } from "~/lib/maps";
import DeleteReviewDialog from "~/components/DeleteReviewDialog";

interface CourseReviewCardProps {
  course: Course;
  courseReview: CourseReview;
  courseReviewId: string;
  editable?: boolean;
}

const useStyles = makeStyles((theme) => ({
  card: {
    padding: 16,
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gridRowGap: 10,
    },
  },
  semester: {
    marginRight: "auto",
    [theme.breakpoints.down("xs")]: {
      marginRight: 0,
    },
  },
  chipDarkGreen: {
    color: "#1b5e20",
    borderColor: "#1b5e20",
  },
  chipGreen: {
    color: "#66bb6a",
    borderColor: "#66bb6a",
  },
  chipYellow: {
    color: "#ffcc80",
    borderColor: "#ffcc80",
  },
  chipRed: {
    color: "#fb8c00",
    borderColor: "#fb8c00",
  },
  chipDarkRed: {
    color: "#d32f2f",
    borderColor: "#d32f2f",
  },
  avatar: {
    backgroundColor: blue[900],
  },
}));

const CourseReviewCard: React.FC<CourseReviewCardProps> = ({
  course,
  courseReview,
  courseReviewId,
  editable = false,
}) => {
  const classes = useStyles();
  const [isMenuActive, setMenuActive] = useState<boolean>(false);
  const [isDeleteActive, setDeleteActive] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
    setMenuActive(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuActive(false);
  };

  const getChipStyle = (value: number, type: string) => {
    if (type === "difficulty") {
      if (value === 1) return classes.chipDarkGreen;
      if (value === 2) return classes.chipGreen;
      if (value === 3) return classes.chipYellow;
      if (value === 4) return classes.chipRed;
      if (value === 5) return classes.chipDarkRed;
    }
    if (type === "rating") {
      if (value === 1) return classes.chipDarkRed;
      if (value === 2) return classes.chipRed;
      if (value === 3) return classes.chipYellow;
      if (value === 4) return classes.chipGreen;
      if (value === 5) return classes.chipDarkGreen;
    }
    return null;
  };
  return (
    <>
      <DeleteReviewDialog open={isDeleteActive} setOpen={setDeleteActive} courseReviewId={courseReviewId} />
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              <ClassIcon />
            </Avatar>
          }
          title={`${course.id}: ${course.name}`}
          titleTypographyProps={{ variant: "body2", color: "primary" }}
          subheader={new Date(courseReview.dateCreated).toLocaleString()}
          subheaderTypographyProps={{ variant: "body2", color: "textSecondary" }}
          action={
            editable ? (
              <>
                <IconButton onClick={handleOpenMenu}>
                  <MoreVertIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} keepMounted open={isMenuActive} onClose={handleCloseMenu}>
                  <MenuItem onClick={() => router.push(`/reviews/edit/${courseReviewId}`)}>Edit</MenuItem>
                  <MenuItem onClick={() => setDeleteActive(true)}>Delete</MenuItem>
                </Menu>
              </>
            ) : null
          }
        />
        <CardContent>
          <Typography>{courseReview.body}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Chip label={courseReview.semester} variant="outlined" className={classes.semester} />
          <Chip
            label={Difficulty[courseReview.difficulty]}
            variant="outlined"
            className={getChipStyle(courseReview.difficulty, "difficulty")}
          />
          <Chip
            label={Rating[courseReview.rating]}
            variant="outlined"
            className={getChipStyle(courseReview.rating, "rating")}
          />
          <Chip label={`${courseReview.workload} hrs/wk`} variant="outlined" />
        </CardActions>
      </Card>
    </>
  );
};

export default CourseReviewCard;
