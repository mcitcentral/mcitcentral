import { useState } from "react";

const useReviewForm = (existingReview?: CourseReview): useReviewForm => {
  const defaultReview: Partial<CourseReview> = {
    courseId: null,
    semester: null,
    workload: null,
    rating: null,
    difficulty: null,
    body: "",
  };
  const [review, setReview] = useState<Partial<CourseReview>>(existingReview || defaultReview);
  const updateReview = (modification: Partial<CourseReview>) => setReview((prev) => ({ ...prev, ...modification }));

  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const updateErrors = (modification) => setErrors((prev) => ({ ...prev, ...modification }));
  const validateReview = () => {
    let hasError = false;
    for (const key of Object.keys(review)) {
      if (!review[key]) {
        hasError = true;
        updateErrors({ [key]: true });
      } else updateErrors({ [key]: false });
    }
    return hasError;
  };

  return { review, errors, validateReview, updateReview, updateErrors };
};

export default useReviewForm;
