interface UserSettings {
  user: string;
  name: string;
  isAdmin: boolean;
}

interface Course {
  id: string;
  name: string;
  reviewCount: number;
  avgDifficulty: number;
  avgWorkload: number;
  avgRating: number;
}

interface CourseList {
  [key: string]: Course;
}

interface CourseReview {
  courseId: string;
  userId: string;
  semester: string;
  workload: number;
  rating: number;
  difficulty: number;
  body: string;
  dateCreated: string; // as ISO DateTime string
}

interface CourseReviewList {
  [key: string]: CourseReview;
}

interface ElectiveSuggestion {
  id: string;
  name: string;
  link: string;
  votes: { [key: string]: boolean };
}

interface ElectiveSuggestionList {
  [key: string]: ElectiveSuggestion;
}

interface CreateCourseRequest {
  firebaseToken: string;
  course: Partial<Course>;
}

interface CreateReviewRequest {
  firebaseToken: string;
  review: Partial<CourseReview>;
}

interface EditReviewRequest {
  firebaseToken: string;
  reviewId: string;
  review: Partial<CourseReview>;
}

interface CreateElectiveRequest {
  firebaseToken: string;
  elective: Partial<ElectiveSuggestion>;
}

interface VoteElectiveRequest {
  firebaseToken: string;
  electiveId: string;
  vote: boolean;
}

interface useReviewForm {
  review: Partial<Review>;
  errors: { [key: string]: boolean };
  validateReview: () => boolean;
  updateReview: (modification: Partial<Review>) => void;
  updateErrors: (modification: { [key: string]: boolean | string }) => void;
}

interface NotificationMessage {
  message: string;
  type: "success" | "error" | "warning" | "info";
}
