export const isCoreCourse = (course: Course): boolean => {
  const CORE_COURSES = ["CIT-591", "CIT-592", "CIT-593", "CIT-594", "CIT-595", "CIT-596"];
  if (CORE_COURSES.includes(course.id)) return true;
  return false;
};

export const isElective = (course: Course): boolean => {
  return !isCoreCourse(course);
};

export const hasKeyword = (course: Course, keyword: string): boolean => {
  if (course.id.toLowerCase().includes(keyword.toLowerCase())) return true;
  if (course.name.toLowerCase().includes(keyword.toLowerCase())) return true;
  return false;
};

export const hasReviews = (course: Course): boolean => {
  return course.reviewCount > 0;
};
