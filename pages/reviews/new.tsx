import { useState, useEffect, useContext } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Container } from "@material-ui/core";

import apiClient from "~/lib/apiClient";
import firebaseAuth from "~/lib/firebaseAuth";
import getAllCourses from "~/services/getAllCourses";
import useReviewForm from "~/hooks/useReviewForm";
import CourseReviewForm from "~/components/CourseReviewForm";
import verifyCookie from "~/services/verifyCookie";
import { NotificationContext } from "~/context/NotificationContext";

interface CreateReviewProps {
  courses: CourseList;
}

const CreateReview: React.FC<CreateReviewProps> = ({ courses }) => {
  const reviewForm = useReviewForm();
  const { setNotification } = useContext(NotificationContext);
  const { review, validateReview, updateErrors } = reviewForm;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (isSubmitted) validateReview();
  }, [review]);

  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (validateReview()) return;
    const firebaseToken = await firebaseAuth.getToken();
    const res = await apiClient.createReview(firebaseToken, review);
    if (res.success) {
      setNotification({ type: "success", message: "Your review has been created." });
      router.push("/user/reviews");
    } else updateErrors({ message: res.message });
  };

  return (
    <Container maxWidth="md">
      <CourseReviewForm courses={courses} reviewForm={reviewForm} handleSubmit={handleSubmit} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    // @ts-ignore
    const cookie = req.cookies.mcitcentral;
    await verifyCookie(cookie);
    const courses = await getAllCourses();
    return { props: { courses } };
  } catch (e) {
    return { props: {}, redirect: { destination: "/" } };
  }
};

export default CreateReview;
