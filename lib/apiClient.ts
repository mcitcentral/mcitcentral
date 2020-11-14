import axios from "axios";

const apiClient = {
  createReview: async (firebaseToken: string, review: Partial<CourseReview>) => {
    try {
      const res = await axios.post("/api/reviews/create", { firebaseToken, review });
      return res.data;
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  },
  editReview: async (firebaseToken: string, reviewId: string, review: Partial<CourseReview>) => {
    try {
      const res = await axios.post("/api/reviews/edit", { firebaseToken, reviewId, review });
      return res.data;
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  },
  deleteReview: async (firebaseToken: string, reviewId: string) => {
    try {
      const res = await axios.post("/api/reviews/delete", { firebaseToken, reviewId });
      return res.data;
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  },
  createCourse: async (firebaseToken: string, course: Partial<Course>) => {
    try {
      const res = await axios.post("/api/courses/create", { firebaseToken, course });
      return res.data;
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  },
};

export default apiClient;
