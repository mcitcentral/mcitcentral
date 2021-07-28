export const Difficulty = {
  1: "Very Easy",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Very Hard",
};

export const Rating = {
  1: "Strongly Disliked",
  2: "Disliked",
  3: "Neutral",
  4: "Liked",
  5: "Strongly Liked",
};

// Determine season based on a date
export function getSemester(date: Date): string {
  const year_str = String(date.getFullYear());
  const month = date.getMonth();
  if (month < 6) {
    return "Spring " + year_str;
  } else if (month < 9) {
    return "Summer " + year_str;
  } else {
    return "Fall " + year_str;
  }
}

// Generate an array of Semesters using getSeason and a start_date and end_date
export function getSemesters(start_date: Date, end_date: Date): string[] {
  
  start_date = new Date(start_date.getFullYear(), start_date.getMonth(), 1);
  end_date = new Date(end_date.getFullYear(), end_date.getMonth(), 1);
  
  const semesters = new Set<string>();
  let current_date = start_date;
  
  while (current_date <= end_date) {
    semesters.add(getSemester(current_date));
    current_date = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 1);
  }
  return Array.from(semesters);
}

export const Semesters = getSemesters(new Date(2019, 0, 1), new Date());
