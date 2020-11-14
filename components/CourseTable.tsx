import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Grid,
  TextField,
  Switch,
  makeStyles,
  FormGroup,
  FormControlLabel,
  Typography,
} from "@material-ui/core";

import useToggle from "~/hooks/useToggle";
import AddCourseDialog from "~/components/AddCourseDialog";
import { isCoreCourse, hasKeyword, hasReviews } from "~/lib/validations";

const useStyles = makeStyles({
  table: {
    backgroundColor: "white",
  },
  tableRow: {
    cursor: "pointer",
  },
  topContainer: {
    marginBottom: 25,
  },
});

interface CourseTableProps {
  courses: CourseList;
  editable?: boolean;
}

const CourseTable = ({ courses, editable = false }: CourseTableProps) => {
  const classes = useStyles();
  const [addCourseActive, toggleAddCourse] = useToggle();
  const [filterString, setFilterString] = useState<string>("");
  const [filterCoreCourses, setFilterCoreCourses] = useState<boolean>(false);
  const [filterHasReviews, setFilterHasReviews] = useState<boolean>(false);

  const filteredCourses = Object.values(courses).filter((course) => {
    if (
      hasKeyword(course, filterString) &&
      (isCoreCourse(course) || !filterCoreCourses) &&
      (hasReviews(course) || !filterHasReviews)
    )
      return course;
  });

  return (
    <>
      <AddCourseDialog open={addCourseActive} toggleDialog={toggleAddCourse} />
      <Box>
        <Grid container className={classes.topContainer}>
          <Grid item xs={6}>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch checked={filterCoreCourses} onChange={(e) => setFilterCoreCourses(e.target.checked)} />
                }
                label="Core Courses"
              />
              <FormControlLabel
                control={<Switch checked={filterHasReviews} onChange={(e) => setFilterHasReviews(e.target.checked)} />}
                label="Has Reviews"
              />
            </FormGroup>
          </Grid>
          <Grid item container xs={6} justify="flex-end">
            <TextField
              value={filterString}
              onChange={(e) => setFilterString(e.target.value)}
              placeholder="Filter Courses"
            />
            {editable && (
              <Button variant="contained" color="primary" onClick={toggleAddCourse} style={{ marginLeft: 25 }}>
                + Add Course
              </Button>
            )}
          </Grid>
        </Grid>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Reviews</TableCell>
              <TableCell>Difficulty (1-5)</TableCell>
              <TableCell>Workload (hrs/wk)</TableCell>
              <TableCell>Rating (1-5)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses.map(({ id, name, reviewCount, avgDifficulty, avgWorkload, avgRating }) => {
              return (
                <Link key={id} href={`/courses/${id}`}>
                  <TableRow hover className={classes.tableRow}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{reviewCount}</TableCell>
                    <TableCell>{Math.round(avgDifficulty * 100) / 100}</TableCell>
                    <TableCell>{Math.round(avgWorkload * 100) / 100}</TableCell>
                    <TableCell>{Math.round(avgRating * 100) / 100}</TableCell>
                  </TableRow>
                </Link>
              );
            })}
            {filteredCourses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Typography>No courses found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};

export default CourseTable;
