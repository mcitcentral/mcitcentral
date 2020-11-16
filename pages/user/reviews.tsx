import { GetServerSideProps } from "next";
import { Container, Typography } from "@material-ui/core";

import CourseReviewCardList from "~/components/CourseReviewCardList";
import getAllCourses from "~/services/getAllCourses";
import getUserReviews from "~/services/getUserReviews";
import verifyCookie from "~/services/verifyCookie";

interface UserReviewProps {
  courses: CourseList;
  courseReviews: CourseReviewList;
}

const UserReviews: React.FC<UserReviewProps> = ({ courses, courseReviews }) => {
  if (Object.keys(courseReviews).length < 1) {
    return <Typography>You don't have any reviews.</Typography>;
  }
  return (
    <Container maxWidth="md">
      <Typography variant="h5">My Reviews</Typography>
      <CourseReviewCardList editable courses={courses} courseReviews={courseReviews} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    // @ts-ignore
    const cookie = req.cookies.mcitcentral;
    await verifyCookie(cookie);
    const courses = await getAllCourses();
    const courseReviews = await getUserReviews(cookie);
    return { props: { courses, courseReviews, success: true } };
  } catch (e) {
    return { props: {}, redirect: { destination: "/" } };
  }
};

export default UserReviews;
