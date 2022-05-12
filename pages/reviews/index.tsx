import { Container } from "@material-ui/core";
import { GetStaticProps } from "next";

import CourseReviewCardList from "~/components/CourseReviewCardList";
import getAllCourses from "~/services/getAllCourses";
import getAllCourseReviews from "~/services/getAllCourseReviews";

interface AllReviewsProps {
  courses: CourseList;
  courseReviews: CourseReviewList;
}

const AllReviews: React.FC<AllReviewsProps> = ({ courses, courseReviews }) => {
  return (
    <Container maxWidth="md">
      <CourseReviewCardList courses={courses} courseReviews={courseReviews} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const courses = await getAllCourses();
  const courseReviews = await getAllCourseReviews();
  return {
    props: { courses, courseReviews },
    revalidate: 3600,
  };
};

export default AllReviews;
