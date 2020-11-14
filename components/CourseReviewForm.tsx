import {
  Select,
  Card,
  FormControl,
  InputLabel,
  TextField,
  MenuItem,
  Box,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import EditIcon from "@material-ui/icons/Edit";

import { Rating, Difficulty, Semesters } from "~/lib/maps";

const useStyles = makeStyles({
  grid: {
    padding: 50,
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: 25,
  },
});

interface CourseReviewFormProps {
  edit?: boolean;
  courses: CourseList;
  reviewForm: useReviewForm;
  handleSubmit: () => void;
}

const CourseReviewForm = ({ courses, reviewForm, handleSubmit, edit = false }: CourseReviewFormProps) => {
  const classes = useStyles();
  const { review, errors, updateReview } = reviewForm;

  return (
    <form>
      <Card className={classes.grid}>
        <Box display="flex" flexDirection="row" alignItems="center">
          <EditIcon color="secondary" style={{ marginRight: 10 }} />
          <Typography variant="h5">{edit ? "Edit Review" : "Create Review"}</Typography>
        </Box>
        {errors.message && <Alert severity="error">{errors.message}</Alert>}
        <FormControl variant="outlined">
          <InputLabel>Course</InputLabel>
          <Select
            label="Course"
            value={review.courseId}
            onChange={(e) => updateReview({ courseId: String(e.target.value) })}
            error={errors.courseId}
          >
            {Object.entries(courses).map(([id, course]) => (
              <MenuItem key={id} value={id}>
                {id} {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel>Semester</InputLabel>
          <Select
            label="Semester"
            value={review.semester}
            onChange={(e) => updateReview({ semester: String(e.target.value) })}
            error={errors.semester}
          >
            {Semesters.map((semester) => (
              <MenuItem key={semester} value={semester}>
                {semester}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel>Difficulty</InputLabel>
          <Select
            label="Difficulty"
            value={review.difficulty}
            onChange={(e) => updateReview({ difficulty: Number(e.target.value) })}
            error={errors.difficulty}
          >
            {Object.entries(Difficulty).map(([id, label]) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Workload (hours/week)"
          type="number"
          variant="outlined"
          value={review.workload}
          onChange={(e) => updateReview({ workload: Number(e.target.value) })}
          error={errors.workload}
        />
        <FormControl variant="outlined">
          <InputLabel>Rating</InputLabel>
          <Select
            label="Rating"
            value={review.rating}
            onChange={(e) => updateReview({ rating: Number(e.target.value) })}
            error={errors.rating}
          >
            {Object.entries(Rating).map(([id, label]) => (
              <MenuItem key={id} value={id}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          multiline
          rows={10}
          label="Review"
          type="text"
          variant="outlined"
          value={review.body}
          onChange={(e) => updateReview({ body: e.target.value })}
          error={errors.body}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {edit ? "Save" : "Create"}
        </Button>
      </Card>
    </form>
  );
};

export default CourseReviewForm;
