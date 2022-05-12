import React, { useContext } from "react";
import { GetStaticProps } from "next";
import { Container } from "@material-ui/core";

import getAllCourses from "~/services/getAllCourses";
import CourseTable from "~/components/CourseTable";
import { UserContext } from "~/context/UserContext";

interface IndexProps {
  courses: CourseList;
}

const Index: React.FC<IndexProps> = ({ courses }) => {
  const { userSettings } = useContext(UserContext);
  return (
    <Container maxWidth="lg">
      <CourseTable editable={userSettings?.isAdmin} courses={courses} />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const courses = await getAllCourses();
  return {
    props: { courses },
    revalidate: 3600,
  };
};

export default Index;
