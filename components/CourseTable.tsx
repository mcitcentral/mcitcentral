import {useEffect, useState} from "react";
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
  TableSortLabel,
} from "@material-ui/core";

import useToggle from "~/hooks/useToggle";
import AddCourseDialog from "~/components/AddCourseDialog";
import { isCoreCourse, isElective, hasKeyword, hasReviews } from "~/lib/validations";

const useStyles = makeStyles({
  table: {
    backgroundColor: "white",
  },
  tableRow: {
    cursor: "pointer",
  },
  topContainer: {
    marginBottom: 25,
    display: "flex",
    alignItems: "flex-end",
  },
  tableContainer: {
    overflow: "scroll",
  },
});

interface CourseTableProps {
  courses: CourseList;
  editable?: boolean;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, editable = false }) => {
  const classes = useStyles();
  const [addCourseActive, toggleAddCourse] = useToggle();
  const [filterString, setFilterString] = useState<string>("");
  const [filterCoreCourses, setFilterCoreCourses] = useState<boolean>(true);
  const [filterElectives, setFilterElectives] = useState<boolean>(true);
  const [filterHasReviews, setFilterHasReviews] = useState<boolean>(false);
  const [sortKey, setSortKey] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<string>( "desc");


  // Wait for component to mount to run code in the browser
  useEffect(() => {
    setSortKey(window.localStorage.getItem("sortKey") || "id")
    setSortDirection(window.localStorage.getItem("sortDirection") || "desc")
  }, [])


  const filteredCourses = Object.values(courses).filter((course) => {
    if (
      hasKeyword(course, filterString) &&
      (isElective(course) || filterCoreCourses) &&
      (isCoreCourse(course) || filterElectives) &&
      (hasReviews(course) || !filterHasReviews)
    )
      return course;
  });

  const sortedCourses = filteredCourses.sort((courseA, courseB) => {
    if (["avgDifficulty", "avgRating", "avgWorkload", "reviewCount"].includes(sortKey)) {
      if (courseA[sortKey] > courseB[sortKey]) return sortDirection === "desc" ? -1 : 1;
      if (courseA[sortKey] < courseB[sortKey]) return sortDirection === "desc" ? 1 : -1;
    } else {
      if (courseA[sortKey] > courseB[sortKey]) return sortDirection === "desc" ? 1 : -1;
      if (courseA[sortKey] < courseB[sortKey]) return sortDirection === "desc" ? -1 : 1;
    }
    return 0;
  });

  const handleSort = (_sortKey: string) => {
    localStorage.setItem("sortKey", _sortKey)
    if (sortKey === _sortKey) {

      if (sortDirection === "asc"){
        localStorage.setItem("sortDirection", "desc")
        setSortDirection("desc")
      } else {
        localStorage.setItem("sortDirection", "asc")
        setSortDirection("asc")
      }

    } else {
      setSortKey(_sortKey);
    }
  };

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
                control={<Switch checked={filterElectives} onChange={(e) => setFilterElectives(e.target.checked)} />}
                label="Electives"
              />
              <FormControlLabel
                control={<Switch checked={filterHasReviews} onChange={(e) => setFilterHasReviews(e.target.checked)} />}
                label="Has Reviews"
              />
            </FormGroup>
          </Grid>
          <Grid item container xs={6} justifyContent="flex-end">
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
        <Box className={classes.tableContainer}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell style={{ minWidth: 80 }}>
                  <TableSortLabel direction={sortDirection} onClick={() => handleSort("id")}>
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell style={{ minWidth: 250 }}>
                  <TableSortLabel direction={sortDirection} onClick={() => handleSort("name")}>
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel direction={sortDirection} onClick={() => handleSort("reviewCount")}>
                    Reviews
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel direction={sortDirection} onClick={() => handleSort("avgDifficulty")}>
                    Difficulty (1-5)
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel direction={sortDirection} onClick={() => handleSort("avgWorkload")}>
                    Workload (hrs/wk)
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel direction={sortDirection} onClick={() => handleSort("avgRating")}>
                    Rating (1-5)
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCourses.map(({ id, name, reviewCount, avgDifficulty, avgWorkload, avgRating }) => {
                return (
                  <Link key={id} href={`/courses/${id}`}>
                    <TableRow hover className={classes.tableRow}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell align="center">{reviewCount}</TableCell>
                      <TableCell align="center">{Math.round(avgDifficulty * 100) / 100}</TableCell>
                      <TableCell align="center">{Math.round(avgWorkload * 100) / 100}</TableCell>
                      <TableCell align="center">{Math.round(avgRating * 100) / 100}</TableCell>
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
      </Box>
    </>
  );
};

export default CourseTable;
