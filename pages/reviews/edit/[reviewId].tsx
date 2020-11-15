import { Container } from "@material-ui/core";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

import CourseReviewForm from "~/components/CourseReviewForm";
import { NotificationContext } from "~/context/NotificationContext";
import useReviewForm from "~/hooks/useReviewForm";
import apiClient from "~/lib/apiClient";
import firebaseAuth from "~/lib/firebaseAuth";
import getAllCourses from "~/services/getAllCourses";
import getSingleCourseReview from "~/services/getSingleCourseReview";
import verifyCookie from "~/services/verifyCookie";

const EditReview = ({ courses, courseReview, reviewId }) => {
  const reviewForm = useReviewForm(courseReview);
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
    const res = await apiClient.editReview(firebaseToken, reviewId, review);
    if (res.success) {
      setNotification({ type: "success", message: "Your review has been edited." });
      router.push("/user/reviews");
    } else updateErrors({ message: res.message });
  };

  return (
    <Container maxWidth="md">
      <CourseReviewForm edit courses={courses} reviewForm={reviewForm} handleSubmit={handleSubmit} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  try {
    // @ts-ignore
    const cookie = req.cookies.mcitcentral;
    const reviewId = Array.isArray(params.reviewId) ? params.reviewId[0] : params.reviewId;
    const { uid } = await verifyCookie(cookie);
    const courseReview = await getSingleCourseReview(reviewId);
    if (courseReview.userId !== uid) throw new Error("You don't have the permission to edit this review.");
    const courses = await getAllCourses();
    return {
      props: { courses, courseReview, reviewId },
    };
  } catch (e) {
    return { props: {}, redirect: { destination: "/" } };
  }
};

export default EditReview;
