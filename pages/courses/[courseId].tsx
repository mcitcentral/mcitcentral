import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { Container } from "@material-ui/core";

import CourseSummary from "~/components/CourseSummary";
import CourseReviewCardList from "~/components/CourseReviewCardList";
import getAllCourses from "~/services/getAllCourses";
import getSingleCourse from "~/services/getSingleCourse";
import getCourseReviews from "~/services/getCourseReviews";

interface CourseReviewsProps {
  course: Course;
  courseReviews: CourseReviewList;
}

const CourseReviews: React.FC<CourseReviewsProps> = ({ course, courseReviews }) => {
  const courseList: CourseList = { [course.id]: course };

  return (
    <>
      <Head>
        <title>
          MCIT Central - {course.id}: {course.name}
        </title>
      </Head>
      <Container maxWidth="md">
        <CourseSummary course={course} />
        <CourseReviewCardList courses={courseList} courseReviews={courseReviews} />
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const courses = await getAllCourses();
  const paths = Object.keys(courses).map((courseId) => ({ params: { courseId } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const courseId = Array.isArray(params.courseId) ? params.courseId[0] : params.courseId;
  const course = await getSingleCourse(courseId);
  const courseReviews = await getCourseReviews(courseId);
  return {
    props: { course, courseReviews },
    revalidate: 3600,
  };
};

export default CourseReviews;
