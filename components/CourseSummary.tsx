import { Grid, Typography, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface CourseSummaryProps {
  course: Course;
}

const useStyles = makeStyles({
  gridItem: {
    padding: 16,
    borderColor: "#E5E5E5",
  },
});

const CourseSummary = ({ course }: CourseSummaryProps) => {
  const styles = useStyles();
  const sections = [
    { label: "Reviews", key: "reviewCount" },
    { label: "Avg. Difficulty", key: "avgDifficulty" },
    { label: "Avg. Workload", key: "avgWorkload" },
    { label: "Avg. Rating", key: "avgRating" },
  ];
  return (
    <Paper>
      <Grid container>
        {sections.map(({ label, key }) => (
          <Grid item key={key} xs={3}>
            <Box borderRight={1} className={styles.gridItem}>
              <Typography variant="body2" align="center" color="textSecondary">
                {label}
              </Typography>
              <Typography variant="subtitle2" align="center">
                {typeof course[key] === "number" ? Math.round(course[key] * 100) / 100 : course[key]}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default CourseSummary;
