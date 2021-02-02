import axios from "axios";

interface SuccessResponse<T = void> {
  success: boolean;
  message?: string;
  data?: T;
}

const apiClient = {
  createReview: async (firebaseToken: string, review: Partial<CourseReview>): Promise<SuccessResponse> => {
    try {
      const res = await axios.post("/api/reviews/create", { firebaseToken, review });
      return res.data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  editReview: async (
    firebaseToken: string,
    reviewId: string,
    review: Partial<CourseReview>
  ): Promise<SuccessResponse> => {
    try {
      const res = await axios.post("/api/reviews/edit", { firebaseToken, reviewId, review });
      return res.data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteReview: async (firebaseToken: string, reviewId: string): Promise<SuccessResponse> => {
    try {
      const res = await axios.post("/api/reviews/delete", { firebaseToken, reviewId });
      return res.data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  createCourse: async (firebaseToken: string, course: Partial<Course>): Promise<SuccessResponse> => {
    try {
      const res = await axios.post("/api/courses/create", { firebaseToken, course });
      return res.data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  createElective: async (firebaseToken: string, elective: Partial<ElectiveSuggestion>): Promise<SuccessResponse> => {
    try {
      const res = await axios.post("/api/electives/create", { firebaseToken, elective });
      return res.data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  voteElective: async (
    firebaseToken: string,
    electiveId: string,
    vote: boolean
  ): Promise<SuccessResponse<ElectiveSuggestionList>> => {
    try {
      const res = await axios.post("/api/electives/vote", { firebaseToken, electiveId, vote });
      return res.data;
    } catch (e) {
      throw new Error(e.message);
    }
  },
};

export default apiClient;
