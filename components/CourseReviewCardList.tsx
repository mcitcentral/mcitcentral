import { makeStyles } from "@material-ui/core";
import CourseReviewCard from "~/components/CourseReviewCard";

interface CourseReviewCardListProps {
  courses: CourseList;
  courseReviews: CourseReviewList;
  editable?: boolean;
}

const useStyles = makeStyles({
  grid: {
    marginTop: 25,
    display: "grid",
    gridTemplateColumns: "1fr",
    gridRowGap: 25,
  },
});

const CourseReviewCardList = ({ courses, courseReviews, editable = false }: CourseReviewCardListProps) => {
  const classes = useStyles();
  return (
    <div className={classes.grid}>
      {Object.entries(courseReviews).map(([id, courseReview]) => {
        const course = courses[courseReview.courseId];
        return (
          <CourseReviewCard
            key={id}
            course={course}
            courseReview={courseReview}
            courseReviewId={id}
            editable={editable}
          />
        );
      })}
    </div>
  );
};

export default CourseReviewCardList;
